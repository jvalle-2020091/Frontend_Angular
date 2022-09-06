import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'crud', loadChildren: () => import('./crud/crud.module').then(m => m.CrudModule) },
        { path: 'roles', loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule) },

       
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
