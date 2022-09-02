import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CrudComponent } from './crud.component';
import { AddUserComponent } from './add-user/add-user.component'
import { SettingsUserComponent } from './settings-user/settings-user.component';

@NgModule({
	imports: [RouterModule.forChild([
		{
			path: '', component: CrudComponent, children: [
				{ path: '', redirectTo: 'addUser', pathMatch: 'full' },
				{ path: 'addUser', component: AddUserComponent },
				{ path: 'settings', component: SettingsUserComponent }
			]
		}

	])],
	exports: [RouterModule]
})
export class CrudRoutingModule { }
