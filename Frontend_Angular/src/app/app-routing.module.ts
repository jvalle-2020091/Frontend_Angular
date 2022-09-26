import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { LoginComponent } from './demo/components/auth/login/login.component';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { NeedPasswordComponent } from './demo/components/need-password/need-password.component';
import { UserGuard } from './guards/user.guard'
import { AccessComponent } from './demo/components/auth/access/access.component'
@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          component: LoginComponent,
        },
        {
          path: 'auth',
          component: AccessComponent,
        },
        {
          path: 'layout',
          component: AppLayoutComponent,
          canActivate: [UserGuard],
          children: [
            { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
  
            { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
        ],
        },

        {
          path: 'auth',
          loadChildren: () =>
            import('./demo/components/auth/auth.module').then(
              (m) => m.AuthModule
            ),
        },
        { path: 'pages/notfound', component: NotfoundComponent },
     { path: 'needChangePassword/:idUser', component: NeedPasswordComponent },

        { path: '**', redirectTo: 'pages/notfound' },
      ],
      {
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
        onSameUrlNavigation: 'reload',
      }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
