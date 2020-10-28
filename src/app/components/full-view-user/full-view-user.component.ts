import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { GithubAPIService, GithubRepos, GithubUser } from '../../services/github-api.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { mergeMap, scan, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-full-view-user',
  templateUrl: './full-view-user.component.html',
  styleUrls: ['./full-view-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullViewUserComponent {
  @Input() user: GithubUser;

  repositories: GithubRepos[] = [];
  upload = false;

  pageSubject = new BehaviorSubject(1);

  repositories$: Observable<GithubRepos[]> = this.pageSubject.pipe(
    mergeMap((page) => {
      this.upload = true;
      return this.api.getGithubRepositoriesList(this.user.login, page);
    }),
    tap(() => this.upload = false),
    scan((acc, data) => acc.concat(...data), []),
  );

  constructor(
    private api: GithubAPIService,
  ) {
  }

  uploadMoreRepos(): void {
    this.pageSubject.next(this.pageSubject.getValue() + 1);
  }
}
