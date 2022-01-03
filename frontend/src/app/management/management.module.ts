import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { CreateComponent } from './create/create.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditorComponent } from './editor/editor.component';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostEditComponent } from './components/post/post.component';
import { AppModule } from '../app.module';
import { DashHeaderComponent } from './components/header/header.component';
import { PublishComponent } from './publish/publish.component';


@NgModule({
  declarations: [
    ManagementComponent,
    CreateComponent,
    EditorComponent,
    DashboardComponent,
    PostEditComponent,
    DashHeaderComponent,
    PublishComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    CKEditorModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
  ]
})
export class ManagementModule { }
