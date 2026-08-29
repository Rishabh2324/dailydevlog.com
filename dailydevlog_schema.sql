-- ============================================================
-- DailyDevLog — Streak Tracking Schema
-- Run this in Supabase SQL Editor (or psql) before starting
-- the implementation prompt.
-- ============================================================

-- Enum for contribution types (extensible: add new types later with ALTER TYPE)
create type contribution_type as enum (
  'github_commit',
  'leetcode_solve',
  'dsa_post',
  'blog_post',
  'code_upload'
);

-- ============================================================
-- users
-- Single row for now (you), designed to scale to many users.
-- ============================================================
create table users (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  display_name text,
  github_username text,
  leetcode_username text,
  avatar_url text,
  created_at timestamptz not null default now()
);

-- ============================================================
-- contributions
-- One row per contribution event. Streaks are computed from this.
-- ============================================================
create table contributions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  type contribution_type not null,
  date date not null,               -- the day the contribution counts for
  title text,                       -- e.g. post title, problem name, commit summary
  source_url text,                  -- e.g. github commit link, leetcode problem link, blog post slug
  metadata jsonb default '{}'::jsonb, -- type-specific extra data (difficulty, repo, language, etc.)
  created_at timestamptz not null default now()
);

-- Prevent duplicate auto-synced rows for the same user/type/date
-- (e.g. re-running the GitHub sync job shouldn't create dupes for the same day)
-- Manual posts (dsa_post/blog_post/code_upload) can have multiple per day,
-- so this partial unique index only applies to the two auto-synced types.
create unique index uniq_auto_contribution_per_day
  on contributions (user_id, type, date)
  where type in ('github_commit', 'leetcode_solve');

-- Indexes to make streak queries fast
create index idx_contributions_user_date on contributions (user_id, date desc);
create index idx_contributions_user_type on contributions (user_id, type);

-- ============================================================
-- Helper view: distinct active days per user
-- (the core of the unified streak — one row per day with any activity)
-- ============================================================
create or replace view active_days as
select distinct user_id, date
from contributions
order by user_id, date desc;

-- ============================================================
-- Helper view: per-type contribution counts (for breakdown stats)
-- ============================================================
create or replace view contribution_counts_by_type as
select
  user_id,
  type,
  count(*) as total_count,
  min(date) as first_date,
  max(date) as last_date
from contributions
group by user_id, type;

-- ============================================================
-- Function: current streak for a user
-- Returns the number of consecutive days (ending today or yesterday)
-- with at least one contribution.
-- ============================================================
create or replace function get_current_streak(p_user_id uuid)
returns int
language plpgsql
as $$
declare
  streak int := 0;
  check_date date := current_date;
  has_activity boolean;
begin
  -- Allow the streak to still count if today has no activity yet,
  -- as long as yesterday does (streak isn't "broken" until a full day passes)
  select exists(select 1 from active_days where user_id = p_user_id and date = check_date)
    into has_activity;

  if not has_activity then
    check_date := check_date - 1;
  end if;

  loop
    select exists(select 1 from active_days where user_id = p_user_id and date = check_date)
      into has_activity;

    exit when not has_activity;

    streak := streak + 1;
    check_date := check_date - 1;
  end loop;

  return streak;
end;
$$;

-- ============================================================
-- Function: longest streak for a user
-- ============================================================
create or replace function get_longest_streak(p_user_id uuid)
returns int
language plpgsql
as $$
declare
  longest int := 0;
  current_run int := 0;
  prev_date date := null;
  rec record;
begin
  for rec in
    select date from active_days where user_id = p_user_id order by date asc
  loop
    if prev_date is null or rec.date = prev_date + 1 then
      current_run := current_run + 1;
    else
      current_run := 1;
    end if;

    if current_run > longest then
      longest := current_run;
    end if;

    prev_date := rec.date;
  end loop;

  return longest;
end;
$$;

-- ============================================================
-- Seed: create your single user row
-- Replace values before running.
-- ============================================================
insert into users (username, display_name, github_username, leetcode_username)
values ('your_username', 'Your Name', 'your_github_handle', 'your_leetcode_handle');

-- ============================================================
-- Example queries you'll use in the app
-- ============================================================
-- Current streak:
--   select get_current_streak('<user_id>');
--
-- Longest streak:
--   select get_longest_streak('<user_id>');
--
-- Heatmap data (all active days + counts per day, for calendar rendering):
--   select date, count(*) as contributions
--   from contributions
--   where user_id = '<user_id>'
--   group by date
--   order by date;
--
-- Breakdown by type:
--   select * from contribution_counts_by_type where user_id = '<user_id>';
