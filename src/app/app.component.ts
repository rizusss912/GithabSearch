import { Component } from '@angular/core';
import { GithubAPIService } from './services/github-api.service';
import { GithubUsersList } from './services/github-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  message: string;
  usersList: GithubUsersList;
  startPreloader: boolean;
  page: number;
  inputStr: string;
  constructor(private api: GithubAPIService){
    this.startPreloader = false;
    this.message = '';
  }

  newRequest(str, page): void{
      this.startPreloader = true;
      this.page = page;
      this.inputStr = str;
      this.api.newGithubUsersList(str, page).subscribe((data: GithubUsersList) => {
        this.usersList = data;
        this.message = this.usersList.total_count + ' user' + ((this.usersList.total_count !== 1) ? 's ' : ' ') +  'found';
        this.startPreloader = false;
      });
  }
  newPage(event): void{
    this.newRequest(this.inputStr, event);
  }
}
