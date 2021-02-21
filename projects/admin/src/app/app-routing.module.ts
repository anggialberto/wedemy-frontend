import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard/containers';

const routes: Routes = [
  {
    path: 'dashboard',
    pathMatch: 'full',
    component: DashboardPageComponent
  },
  {
    path: '',
    loadChildren: () => import('./module/master/master.module').then(m => m.MasterModule)
  },
  {
    path: '',
    loadChildren: () => import('./module/master/pengaturan/pengaturan.module').then(m => m.PengaturanModule)
  },
  // {
  //   path: '404',
  //   component: NotFoundComponent
  // },
  // {
  //   path: '**',
  //   redirectTo: '404'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  // imports: [
  //   RouterModule.forRoot(routes, {
  //     // useHash: true,
  //     preloadingStrategy: PreloadAllModules,
  //     relativeLinkResolution: 'legacy'
  //   })
  // ],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

