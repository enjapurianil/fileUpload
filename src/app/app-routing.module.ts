import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileuploaddemoComponent } from './fileuploaddemo/fileuploaddemo.component';

const routes: Routes = [
  { path: '', redirectTo: 'fileupload', pathMatch: 'full' },
  { path: 'fileupload', component: FileuploaddemoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
