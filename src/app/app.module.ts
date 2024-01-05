import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { Ng2SmartTableModule } from 'ngx-smart-table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { SharedService } from './service/SharedService';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MatSidenavModule,MatTabsModule,MatProgressSpinnerModule,MatAutocompleteModule,
  MatExpansionModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatButtonModule,
  MatListModule,MatDividerModule,MatCardModule,MatSnackBarModule,MatDialogModule,
  MatProgressBarModule} from '@angular/material';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { OrderComponent, DeleteConfirmDialog } from './order/order.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { OrderBookingService } from './service/OrderbookingService';
import { OnlyNumber } from './shared/validations/OnlyNumber';
import { OrderSummaryComponent, DeleteDialog } from './order-summary/order-summary.component';
import { LengthValidater } from './shared/validations/LengthValidater';

@NgModule({
  declarations: [
    AppComponent,
    DashbordComponent,
    OrderComponent,
    OnlyNumber,
    LengthValidater,
    DeleteConfirmDialog,
    OrderSummaryComponent,
    DeleteDialog
  ],
  entryComponents: [DeleteConfirmDialog,DeleteDialog],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    Ng2SmartTableModule,
    MatSidenavModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressBarModule,
    ToastrModule.forRoot(),
    TabsModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [SharedService,DatePipe,OrderBookingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
