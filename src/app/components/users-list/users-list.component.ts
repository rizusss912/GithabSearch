import { Component, AfterViewInit, Input, OnInit, ElementRef, ViewChild,Output,EventEmitter } from '@angular/core';
import { GithubUsersList } from '../../services/github-api.service';
import { CommonModule } from '@angular/common'; 
import { BrowserModule } from '@angular/platform-browser';
import { GithubUser } from '../../services/github-api.service';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements AfterViewInit, OnInit{

  @Input() usersList: GithubUsersList;
  @Input() page: number;
  @Output() newPage: EventEmitter<string> = new EventEmitter;

  itemsInLine: number;
  fullViewUser: GithubUser;
  lastPage: number;
  constructor() { 
  }
  ngOnInit(): void {
    this.lastPage = Math.min(Math.ceil(this.usersList.total_count / 30), 34);
  }
  ngAfterViewInit(): void {
    setTimeout(() => this.onResize());
  }
  getTable(){
    return this.usersList.items.map((_, i, a) => a.slice(i * this.itemsInLine, i * this.itemsInLine + this.itemsInLine)).filter((el) => el.length);
  }
  onResize(): void{
    this.itemsInLine = Math.floor(this.usersTable.nativeElement.offsetWidth / 250);
  }

  newFullView(user): void{
    this.fullViewUser = user;
  }
  getLineFullUser(): number{
    if(this.usersList.items.indexOf(this.fullViewUser)==-1) this.fullViewUser == undefined;
    return Math.floor(this.usersList.items.indexOf(this.fullViewUser) / this.itemsInLine);
  }

  @ViewChild('usersTable') usersTable: ElementRef;

}
