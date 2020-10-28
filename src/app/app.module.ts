import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SearchHeaderComponent } from './components/search-header/search-header.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { GithubAPIService } from './services/github-api.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserComponent } from './components/user/user.component';
import { FullViewUserComponent } from './components/full-view-user/full-view-user.component';
import { PreloaderGlobeComponent } from './components/preloader-globe/preloader-globe.component';
import { UsersListFooterComponent } from './components/users-list-footer/users-list-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchHeaderComponent,
    UsersListComponent,
    UserComponent,
    FullViewUserComponent,
    PreloaderGlobeComponent,
    UsersListFooterComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    GithubAPIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
