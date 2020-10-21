import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-preloader-globe',
  templateUrl: './preloader-globe.component.html',
  styleUrls: ['./preloader-globe.component.css']
})
export class PreloaderGlobeComponent implements OnInit {

  @Input() size: number;
  constructor() { }

  ngOnInit(): void {
  }
}
