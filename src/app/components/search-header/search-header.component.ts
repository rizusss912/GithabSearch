import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.css']
})
export class SearchHeaderComponent implements OnInit {
  
  @Input() message: string;
  @Output() newRequest: EventEmitter<string> = new EventEmitter;

  inputStr: string;
  constructor() { }

  ngOnInit(): void {
    this.inputStr = '';
  }

  newInput(value): void{
    this.message = (this.inputStr !== '') ? 'Loading ...' : '';
    if(!!value && value !== '')
      setTimeout(() => {
        if(value === this.inputStr)
          this.newRequest.emit(value);
      }, 1000);
  }
}