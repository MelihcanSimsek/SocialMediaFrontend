import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { RegisterScreenComponent } from './screens/register-screen/register-screen.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { HeaderComponent } from './components/constants/header/header.component';
import { SidebarComponent } from './components/constants/sidebar/sidebar.component';
import {MatIconModule} from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { HomePostComponent } from './components/home/home-post/home-post.component';
import { PostScreenComponent } from './screens/post-screen/post-screen.component';
import { PostComponent } from './components/post/post/post.component';
import { DashboardScreenComponent } from './screens/dashboard-screen/dashboard-screen.component';
import { ReportComponent } from './components/dashboard/report/report.component';
import {MatMenuModule} from '@angular/material/menu';
import { ProfileScreenComponent } from './screens/profile-screen/profile-screen.component';
import { ProfileHeaderComponent } from './components/profile/profile-header/profile-header.component';
import { ProfileFooterComponent } from './components/profile/profile-footer/profile-footer.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    RegisterScreenComponent,
    LoginComponent,
    RegisterComponent,
    HomeScreenComponent,
    HeaderComponent,
    SidebarComponent,
    HomePostComponent,
    PostScreenComponent,
    PostComponent,
    DashboardScreenComponent,
    ReportComponent,
    ProfileScreenComponent,
    ProfileHeaderComponent,
    ProfileFooterComponent,
 

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    }),
    
  ],
  providers: [
    {provide:JWT_OPTIONS,useValue:JWT_OPTIONS},
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
