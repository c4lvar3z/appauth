import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProtectedModule } from './protected/protected.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { ValidarTokenGuard } from './guards/validar-token.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => AuthRoutingModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./protected/protected.module').then( m => ProtectedModule),
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    //useHash: true
    useHash: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
