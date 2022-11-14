import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'microphone',
    pathMatch: 'full'
  },
  {
    path: 'microphone',
    loadChildren: () => import('./pages/microphone/microphone.module').then( m => m.MicrophonePageModule)
  },
  {
    path: 'audio',
    loadChildren: () => import('./pages/audio/audio.module').then( m => m.AudioPageModule)
  },
  {
    path: '**',
    redirectTo: 'microphone'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
