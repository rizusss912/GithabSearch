import { Component, AfterViewInit, Input, OnInit, ElementRef, ViewChild, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { GithubUsersList } from '../../services/github-api.service';
import { GithubUser } from '../../services/github-api.service';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements AfterViewInit, OnInit{
  constructor(
    private cdr: ChangeDetectorRef,
  ) {
  }

  @Input() usersList: GithubUsersList;
  @Input() page: number;
  @Output() newPage: EventEmitter<string> = new EventEmitter();

  itemsInLine: number;
  fullViewUser: GithubUser;
  lastPage: number;

  @ViewChild('usersTable') usersTable: ElementRef;
  ngOnInit(): void {
    this.lastPage = Math.min(Math.ceil(this.usersList.total_count / 30), 34);
  }
  ngAfterViewInit(): void {
    setTimeout(() => this.onResize());
  }
  getTable(): GithubUser[][]{
    return this.usersList.items.map((_, i, a) => a.slice(
      i * this.itemsInLine, i * this.itemsInLine + this.itemsInLine
      )).filter((el) => el.length);
  }
  onResize(): void{
    this.itemsInLine = Math.floor(this.usersTable.nativeElement.offsetWidth / 250);
  }

  newFullView(user): void{
    console.log('hi', user);
    this.fullViewUser = user;
    this.cdr.markForCheck();
  }

  getLineFullUser(): number{
    if (!this.usersList.items.includes(this.fullViewUser)) {
      return -1;
    }
    return Math.floor(this.usersList.items.indexOf(this.fullViewUser) / this.itemsInLine);
  }
}
