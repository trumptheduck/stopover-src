import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { ViewpostComponent } from './viewpost/viewpost.component';

const routes: Routes = [
  {
    path: 'home',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'blog',
        component: BlogComponent
      },
      {
        path: 'viewpost',
        component: ViewpostComponent
      },
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./management/management.module').then((m) => m.ManagementModule),
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }