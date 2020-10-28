import { Component, Input } from '@angular/core';
import { GithubUser } from '../../services/github-api.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  @Input() user: GithubUser;
  constructor() { }

}
