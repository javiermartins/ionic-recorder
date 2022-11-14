import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MicrophonePage } from './microphone.page';

const routes: Routes = [
  {
    path: '',
    component: MicrophonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MicrophonePageRoutingModule {}
