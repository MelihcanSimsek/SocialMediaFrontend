import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { RegisterScreenComponent } from './screens/register-screen/register-screen.component';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { PostScreenComponent } from './screens/post-screen/post-screen.component';

const routes: Routes = [
  {path:"login",component:LoginScreenComponent},
  {path:"signup",component:RegisterScreenComponent},
  {path:"home",component:HomeScreenComponent},
  {path:"posts/:postid",component:PostScreenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
