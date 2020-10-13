import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-github-search',
  templateUrl: './github-search.component.html',
  styleUrls: ['./github-search.component.css']
})
export class GithubSearchComponent implements OnInit {
  inputStr: string;
  responseMap: any;
  response: any;
  fullViewItem: any;
  numberOfItemsInRow: number;
  fullViewRepository: any;
  searchMessage: string;
  page: number;
  isLoadingRep: boolean;
  isLoadingPage: boolean;
  constructor(private http: HttpClient, private el:ElementRef){
    this.responseMap = new Map();
    this.isLoadingRep = false;
    this.isLoadingPage = false;
    this.page = 1;
    this.searchMessage = "";

  }
  changeInput(value){
    this.searchMessage = "Loading ...";
    setTimeout(() => {this.goSearch(value)}, 1000);
    this.page = 1;
  }

  goSearch(value){
    if(value === this.inputStr && this.inputStr != ""){
      if(!!!this.responseMap.get('https://api.github.com/search/users?q=' + this.inputStr + "&&page=" + this.page)){
        this.isLoadingPage = true;
        this.http.get('https://api.github.com/search/users?q=' + this.inputStr + "&&page=" + this.page).subscribe((response) => {
          this.response = response;
          this.responseMap.set('https://api.github.com/search/users?q=' + this.inputStr + "&&page=" + this.page, response);
          this.onResize();
          if (this.response.total_count != 1){
            this.searchMessage = "found " + this.response.total_count + " users";
          } else{
            this.searchMessage = "found " + this.response.total_count + " user";
          }
          this.isLoadingPage = false;
        });
      }else{
        this.response = this.responseMap.get('https://api.github.com/search/users?q=' + this.inputStr + "&&page=" + this.page);
        if (this.response.total_count != 1){
          this.searchMessage = "found " + this.response.total_count + " users";
        } else{
          this.searchMessage = "found " + this.response.total_count + " user";
        }
      }
    } else if (this.inputStr == "") {
        this.searchMessage = "";
          this.page = 1;
          this.response = undefined;
    }
  }
  onResize(){
    this.numberOfItemsInRow = Math.floor(this.mainSearchDiv.nativeElement.offsetWidth / 250);
  }
  getCrutchList(){
      return this.response.items.map((_, i, a) => a.slice(i * this.numberOfItemsInRow, i * this.numberOfItemsInRow + this.numberOfItemsInRow)).filter((el) => el.length);
  }

  goFullView(item){
    this.fullViewItem = item;
      if(!!!this.responseMap.get(this.fullViewItem.repos_url)){
        this.isLoadingRep = true;
        this.http.get(this.fullViewItem.repos_url).subscribe((fullViewRepository) => {
          this.fullViewRepository = fullViewRepository;
          this.responseMap.set(this.fullViewItem.repos_url, fullViewRepository);
          this.isLoadingRep = false;
        });
      }else {
        this.fullViewRepository = this.responseMap.get(this.fullViewItem.repos_url);
      }
  }
  getLineFullView(){
    return Math.floor(this.response.items.indexOf(this.fullViewItem) / this.numberOfItemsInRow);
  }
  getLastPage(){
    return Math.ceil(this.response.total_count / 30);
  }
  newPage(page){
    this.page = page;
    this.goSearch(this.inputStr);
  }
  ngOnInit(): void {
  }
  @ViewChild('mainSearchDiv') mainSearchDiv: ElementRef;
}
