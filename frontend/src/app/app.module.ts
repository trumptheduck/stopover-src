import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { PostLargeComponent } from './components/post-large/post-large.component';
import { PostNormalComponent } from './components/post-normal/post-normal.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { PostComponent } from './components/post/post.component';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { ViewpostComponent } from './viewpost/viewpost.component';
import { PostMiniComponent } from './components/post-mini/post-mini.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { SafeHtmlPipe } from './core/pipes/safe-html.pipe';
import { FormsModule } from '@angular/forms';

export function playerFactory() {
  return player;
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    FooterComponent,
    HeaderComponent,
    PostLargeComponent,
    PostNormalComponent,
    PostComponent,
    AboutComponent,
    BlogComponent,
    ViewpostComponent,
    PostMiniComponent,
    LoginComponent,
    SignupComponent,
    SafeHtmlPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LottieModule.forRoot({ player: playerFactory }),
    NoopAnimationsModule,
    MatIconModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [HeaderComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
