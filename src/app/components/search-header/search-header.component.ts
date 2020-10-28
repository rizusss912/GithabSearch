import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounce, debounceTime, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.css']
})
export class SearchHeaderComponent {
  subj$ = new BehaviorSubject<string>(undefined);

  @Input() message: string;
  @Output() newRequest: Observable<string> = this.subj$.pipe(
    tap(() => this.message = 'Loading ...'),
    debounceTime(1000),
    tap(() => this.message = null),
  );

  set inputStr(v: string) {
    this.subj$.next(v);
  }

  get inputStr(): string {
    return this.subj$.getValue();
  }
}
