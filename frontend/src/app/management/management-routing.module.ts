import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditorComponent } from './editor/editor.component';
import { ManagementComponent } from './management.component';
import { PublishComponent } from './publish/publish.component';

const routes: Routes = [
  {
    path: "",
    component: ManagementComponent,
    children: [
      {
        path: "",
        component: DashboardComponent
      },
      {
        path: "editor",
        component: EditorComponent
      },
      {
        path: "publish",
        component: PublishComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
