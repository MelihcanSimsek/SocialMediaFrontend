import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { RegisterScreenComponent } from './screens/register-screen/register-screen.component';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { PostScreenComponent } from './screens/post-screen/post-screen.component';
import { DashboardScreenComponent } from './screens/dashboard-screen/dashboard-screen.component';
import { ProfileScreenComponent } from './screens/profile-screen/profile-screen.component';
import { FriendsScreenComponent } from './screens/friends-screen/friends-screen.component';
import { MessagesScreenComponent } from './screens/messages-screen/messages-screen.component';
import { SearchScreenComponent } from './screens/search-screen/search-screen.component';
import { SettingsScreenComponent } from './screens/settings-screen/settings-screen.component';

const routes: Routes = [
  {path:"login",component:LoginScreenComponent},
  {path:"signup",component:RegisterScreenComponent},
  {path:"home",component:HomeScreenComponent},
  {path:"posts/:postid",component:PostScreenComponent},
  {path:"profile/:profileid",component:ProfileScreenComponent},
  {path:"dashboard",component:DashboardScreenComponent},
  {path:"friends",component:FriendsScreenComponent},
  {path:"messages",component:MessagesScreenComponent},
  {path:"search",component:SearchScreenComponent},
  {path:"settings",component:SettingsScreenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
