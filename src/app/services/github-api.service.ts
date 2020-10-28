import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/internal/operators';

export interface GithubUser{
    avatar_url: string;
    events_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    gravatar_id: string;
    html_url: string;
    id: number;
    login: string;
    node_id: string;
    organizations_url: string;
    received_events_url: string;
    repos_url: string;
    score: number;
    site_admin: boolean;
    starred_url: string;
    subscriptions_url: string;
    type: string;
    url: string;
}

export interface GithubUsersList{
  total_count: number;
  incomplete_results: boolean;
  items: Array<GithubUser>;
}

export interface GithubRepos{
  archive_url: string;
  archived: boolean;
  assignees_url: string;
  blobs_url: string;
  branches_url: string;
  clone_url: string;
  collaborators_url: string;
  comments_url: string;
  commits_url: string;
  compare_url: string;
  contents_url: string;
  contributors_url: string;
  created_at: string;
  default_branch: string;
  deployments_url: string;
  description: string;
  disabled: boolean;
  downloads_url: string;
  events_url: string;
  fork: boolean;
  forks: number;
  forks_count: number;
  forks_url: string;
  full_name: string;
  git_commits_url: string;
  git_refs_url: string;
  git_tags_url: string;
  git_url: string;
  has_downloads: boolean;
  has_issues: boolean;
  has_pages: boolean;
  has_projects: boolean;
  has_wiki: boolean;
  homepage: string;
  hooks_url: string;
  html_url: string;
  id: number;
  issue_comment_url: string;
  issue_events_url: string;
  issues_url: string;
  keys_url: string;
  labels_url: string;
  language: string;
  languages_url: string;
  merges_url: string;
  milestones_url: string;
  mirror_url: string;
  name: string;
  node_id: string;
  notifications_url: string;
  open_issues: number;
  open_issues_count: number;
  owner: GithubUser;
  private: boolean;
  pulls_url: string;
  pushed_at: string;
  releases_url: string;
  size: number;
  ssh_url: string;
  stargazers_count: number;
  stargazers_url: string;
  statuses_url: string;
  subscribers_url: string;
  subscription_url: string;
  svn_url: string;
  tags_url: string;
  teams_url: string;
  trees_url: string;
  updated_at: string;
  url: string;
  watchers: number;
  watchers_count: number;
}

@Injectable({
  providedIn: 'root'
})
export class GithubAPIService {
  private cache;

  constructor(private http: HttpClient) {
    this.cache = new Map<string, Observable<any>>();
  }

  httpRequest(url): Observable<any>{
    if (!this.cache.has(url)) {
    this.cache.set(
      url,
      this.http.get<any>(url).pipe(
        shareReplay(1)
      )
    );
    }
    return this.cache.get(url);
  }
  newGithubUsersList(str, page): Observable<GithubUsersList>{
    const url = 'https://api.github.com/search/users?q=' + str + '&&page=' + page;
    return this.httpRequest(url);
  }

  getGithubRepositoriesList(name, page): Observable<GithubRepos[]>{
    const url = 'https://api.github.com/users/' + name + '/repos?page=' + page;
    return this.httpRequest(url);
  }
}

