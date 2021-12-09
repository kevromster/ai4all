import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CamerasComponent }       from './cameras/cameras.component';
import { CameraDetailComponent }  from './camera-detail/camera-detail.component';
import { CameraAddComponent }     from './camera-add/camera-add.component';
import { BeginWorkComponent }     from './begin-work/begin-work.component';

const routes: Routes = [
  { path: '', component: BeginWorkComponent, pathMatch: 'full' },
  { path: 'cameras/:tgChatId', component: CamerasComponent },
  { path: 'detail/:id', component: CameraDetailComponent },
  { path: 'add/:tgChatId', component: CameraAddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
