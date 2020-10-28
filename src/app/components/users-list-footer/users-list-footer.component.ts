import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-users-list-footer',
  templateUrl: './users-list-footer.component.html',
  styleUrls: ['./users-list-footer.component.css']
})
export class UsersListFooterComponent implements OnInit {

  @Input() page: number;
  @Input() lastPage: number;
  @Output() newPage: EventEmitter<number> = new EventEmitter;
  constructor(){
  }

  ngOnInit(): void {
  }
}
