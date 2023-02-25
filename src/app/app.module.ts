import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {environment} from '../environments/environment';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StartPageComponent} from './components/start-page/start-page.component';
import {SitePageComponent} from './components/site-page/site-page.component';
import {UserPageComponent} from './components/user-page/user-page.component';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {RegisterPageComponent} from './components/register-page/register-page.component';
import {FriendsPageComponent} from './components/friends-page/friends-page.component';
import {FriendsnewsPageComponent} from './components/friendsnews-page/friendsnews-page.component';
import {AddfriendsPageComponent} from './components/addfriends-page/addfriends-page.component';
import {PagesGuard} from './pages.guard';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


const appRoutes: Routes = [
  {path: '', component: LoginPageComponent, canActivate: [PagesGuard]},
  {path: 'startpage', component: StartPageComponent},
  {path: 'sitepage', component: SitePageComponent, canActivate: [PagesGuard]},
  {path: 'sitepage/:id', component: UserPageComponent, canActivate: [PagesGuard]},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'sitepage/:id/friends', component: FriendsPageComponent, canActivate: [PagesGuard]},
  {path: 'sitepage/:id/friendsnews', component: FriendsnewsPageComponent, canActivate: [PagesGuard]},
  {path: 'sitepage/:id/addfriends', component: AddfriendsPageComponent, canActivate: [PagesGuard]}
];


@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    SitePageComponent,
    UserPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    FriendsPageComponent,
    FriendsnewsPageComponent,
    AddfriendsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    NgbModule,
  ],
  providers: [PagesGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
