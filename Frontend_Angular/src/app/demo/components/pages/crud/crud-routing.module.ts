import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CrudComponent } from './crud.component';
import { AddUserComponent } from './add-user/add-user.component'

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CrudComponent },


	])],
	exports: [RouterModule]
})
export class CrudRoutingModule { }
