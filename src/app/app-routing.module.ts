import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashbordComponent } from './dashbord/dashbord.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {path : '' ,  redirectTo: '/dashbord', pathMatch: 'full'},
  {path : 'dashbord', component :DashbordComponent},
  // {path : 'order', component :OrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
