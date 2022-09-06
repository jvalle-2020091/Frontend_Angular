import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesComponent } from './roles.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
		{
			path: '', component: RolesComponent, children: [
			]
		}

	])],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
