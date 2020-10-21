import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GithubAPIService } from '../../services/github-api.service';
import { GithubRepos } from '../../services/github-api.service';
@Component({
  selector: 'app-full-view-user',
  templateUrl: './full-view-user.component.html',
  styleUrls: ['./full-view-user.component.css']
})
export class FullViewUserComponent implements OnInit {

  @Input() user;
  repositories: GithubRepos[];
  upload:boolean;
  constructor(private api: GithubAPIService) {
  }
  
  ngOnInit(): void {
    this.upload = true;
    this.api.getGithubRepositoriesList(this.user.login, 1).subscribe((data) => {
      this.repositories = data;
      this.upload = false;
    })
  }

  uploadMoreRepos(){
    this.upload = true;
    this.api.getGithubRepositoriesList(this.user.login, Math.floor(this.repositories.length / 30)+1).subscribe((data) => {
      this.repositories.push.apply(this.repositories, data);
      this.upload = false;
    });
  }
}