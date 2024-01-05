import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../service/SharedService';
import { Constant } from '../shared/constant/Constant';
import { OverdueInvoiceSetting } from './tableSettings/OverdueInvoiceSetting';
import { InvoiceDetailSetting } from './tableSettings/InvoiceDetailSetting';
import { PendingOrderSetting } from './tableSettings/PendingOrderSetting';
import { SalesReportSetting } from './tableSettings/SalesReportSeting';
import { BillOrderSetting } from './tableSettings/BillOrderSetting';
import { OutstandingSetting } from './tableSettings/OutstandingSetting';
import { NonVisitedDealerSetting } from './tableSettings/NonVisitedDealerSetting';
import { NetworkExpansionSetting } from './tableSettings/NetworkExpansionSetting';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  opened : boolean = false;
  syncInProgress : boolean = false;
  isDisabled : boolean = false;
  isSyncShow : boolean = true;
  syncDisabled : boolean = false;
  settings = {
    mode: 'external',
    hideSubHeader: false,
    actions: {
      position: 'right',
      add: false,
      edit : false,
      delete : true
    },
    pager :{
      //display : false,
      perPage : 10
    },
    columns: {
      dealerCode: {
        title: 'Dealer Code'
      }
    },
    delete: {
      deleteButtonContent: '<button>View</button>',
      mode: 'external'
    }
  };

  overdueInvoiceSetting = OverdueInvoiceSetting.setting;
  invoiceDetailSetting = InvoiceDetailSetting.setting;
  pendingOrderSetting = PendingOrderSetting.setting;
  salesReportSetting = SalesReportSetting.setting;
  billOrderSetting = BillOrderSetting.setting;
  outstandingSetting = OutstandingSetting.setting;
  nonVisitedDealerSetting = NonVisitedDealerSetting.setting;
  networkExpansionSetting = NetworkExpansionSetting.setting;

  performanceLoader : boolean = false;
  outstandingLoader : boolean = false;
  visitStatusLoader : boolean = false;
  pendingOrdersLoader : boolean = false;
  nonVisitDealerLoader : boolean = false;
  networkExpansionLoader : boolean = false;

  performanceNoRecord : boolean = false;
  outstandingNoRecord : boolean = false;
  visitStatusNoRecord : boolean = false;
  pendingOrderNoRecord : boolean = false;
  nonVisitNoRecord : boolean = false;
  networkExpansionNoRecord : boolean = false;

  empId = "";
  isSyncOutstanding = "No";
  performanceSelectedTerritoryCode = "";
  outstandingSelectedTerritoryCode = "";
  visitStatusSelectedTerritoryCode = "";
  pendingOrdersSelectedTerritoryCode = "";
  nonVisitedSelectedTerritoryCode = "";
  networkExpansionSelectedTerritoryCode = "";
  territoryCodeList = [];
  dealerCodeList = [];
  overdueInvoiceList = [];
  invoiceDetailList = [];
  pendingOrderList = [];
  nonVisitedDealerList = [];
  networkExpansionList = [];
  visitStatusList = [];
  salesReportList = [];
  billOrderList = [];
  oustandingList = [];
  performance = [];
  period : string = "YTD";
  toastrFadeoutTime : number = 0;
  constructor(private route: ActivatedRoute,
    private sharedService : SharedService,
    private toastr: ToastrService,
    private datePipe : DatePipe) { 
      this.toastrFadeoutTime = Constant.TOSTER_FADEOUT_TIME;
      this.route.queryParams.subscribe(params => {
          this.empId = params['empId'];
      });
  }

  ngOnInit() {
    // this.getTerritoryCodeByEmpId();
  }

  openModal(){
    $("#editModal").modal({
      backdrop : 'static',
      keyboard : false
    });
  }

  public getTerritoryCodeByEmpId(){
    if(this.empId == "" || this.empId == undefined){
      this.toastr.info("Invalid URL.","Alert !",{timeOut : this.toastrFadeoutTime});
      return;
    }
    let jsonData = {
      empId : this.empId
    }
    this.sharedService.getTerritoryCodeByEmpId(jsonData)
    .subscribe(
      (response) => {
        //console.log(JSON.stringify(response));
        this.territoryCodeList = response.wrappedList[0].terricodeList;
        if(this.territoryCodeList.length == 1){
          for(let i=0;i<this.territoryCodeList.length;i++){
            this.performanceSelectedTerritoryCode = this.territoryCodeList[i].paramCode;
            this.outstandingSelectedTerritoryCode = this.territoryCodeList[i].paramCode;
            this.visitStatusSelectedTerritoryCode = this.territoryCodeList[i].paramCode;
            this.pendingOrdersSelectedTerritoryCode = this.territoryCodeList[i].paramCode;
            this.nonVisitedSelectedTerritoryCode = this.territoryCodeList[i].paramCode;
            this.networkExpansionSelectedTerritoryCode = this.territoryCodeList[i].paramCode;
          }
          // this.getPerformanceByEmpId();
          // this.getOutstandingByEmpId();
          // this.getVisitStatusByEmpId();
          // this.getPendingOrderByEmpId();
          // this.getNonVisitedDealerListByEmpId();
          // this.getNetworkExpansionByEmpId();
        }
        else{
          this.toastr.info("Please select any territory code for get result in all KPI.","Alert !",{timeOut : this.toastrFadeoutTime,positionClass : "toast-top-center"});
        }
      },
      (error) => {
        this.toastr.warning(Constant.returnServerErrorMessage("getTerritoryCodeByEmpId"),"Alert !");
      }
    )
  }
  
  public getPerformanceByEmpId(){
    this.performanceNoRecord = false;
    this.performanceLoader = true;
    this.performance = [];
    let jsonData = {
      empId : this.empId,
      period : this.period,
      territoryCode : this.performanceSelectedTerritoryCode
    }
    this.sharedService.getPerformanceByEmpId(jsonData)
    .subscribe(
      (response) => {
        //console.log(JSON.stringify(response));
        this.performanceLoader = false;
        if(response.responseCode === Constant.SUCCESSFUL_RESPONSE){
          this.performance = response.wrappedList[0].performance; 
        }
        else{
          this.performanceNoRecord = true;
        }
         
      },
      (error) => {
        this.toastr.warning(Constant.returnServerErrorMessage("getPerformanceByEmpId"),"Alert !");
      }
    )
  }

  public getOutstandingByEmpId(){
    if(this.empId == "" || this.empId == undefined){
      this.toastr.info("Invalid URL.","Alert !",{timeOut : this.toastrFadeoutTime});
      this.isSyncOutstanding = "No";
      this.isDisabled = false;
      this.isSyncShow = true;
      return;
    }
    this.outstandingNoRecord = false;
    this.outstandingLoader = true;
    this.oustandingList = [];
    let jsonData = {
      empId : this.empId,
      isSyncOutstanding : this.isSyncOutstanding,
      territoryCode : this.outstandingSelectedTerritoryCode
    }
    this.sharedService.getOutstandingByEmpId(jsonData)
    .subscribe(
      (response) => {
        //console.log(JSON.stringify(response));
        this.isSyncOutstanding = "No";
        // this.syncInProgress = false;
        this.isDisabled = false;
        //this.isSyncShow = true;
        this.outstandingLoader = false;
        if(response.responseCode === Constant.SUCCESSFUL_RESPONSE){
          this.oustandingList = response.wrappedList[0].oustanding;
        }
        else{
          this.outstandingNoRecord = true;
        }
      },
      (error) => {
        this.toastr.warning(Constant.returnServerErrorMessage("getOutstandingByEmpId"),"Alert !");
      }
    )
  }
  public getVisitStatusByEmpId(){
    this.visitStatusNoRecord = false;
    this.visitStatusLoader = true;
    this.visitStatusList = [];
    let jsonData = {
      empId : this.empId,
      territoryCode : this.visitStatusSelectedTerritoryCode
    }
    this.sharedService.getVisitStatusByEmpId(jsonData)
    .subscribe(
      (response) => {
        //console.log(JSON.stringify(response));
        this.visitStatusLoader = false;
        if(response.responseCode === Constant.SUCCESSFUL_RESPONSE){
          this.visitStatusList = response.wrappedList[0].visitStatusList;
        }
        else{
          this.visitStatusNoRecord = true;
        }
        
      },
      (error) => {
        this.toastr.warning(Constant.returnServerErrorMessage("getVisitStatusByEmpId"),"Alert !");
      }
    )
  }
  public getPendingOrderByEmpId(){
    this.pendingOrderNoRecord = false;
    this.pendingOrdersLoader = true;
    this.pendingOrderList = [];
    let jsonData = {
      empId : this.empId,
      territoryCode : this.pendingOrdersSelectedTerritoryCode
    }
    this.sharedService.getPendingOrderByEmpId(jsonData)
    .subscribe(
      (response) => {
        //console.log(JSON.stringify(response));
        this.pendingOrdersLoader = false;
        if(response.responseCode === Constant.SUCCESSFUL_RESPONSE){
          this.pendingOrderList = response.wrappedList[0].pendingOrderStatusList;
        }
        else{
          this.pendingOrderNoRecord = true;
        }
        
      },
      (error) => {
        this.toastr.warning(Constant.returnServerErrorMessage("getPendingOrderByEmpId"),"Alert !");
      }
    )
  }
  public getNonVisitedDealerListByEmpId(){
    this.nonVisitNoRecord = false;
    this.nonVisitDealerLoader = true;
    this.nonVisitedDealerList = [];
    let jsonData = {
      empId : this.empId,
      territoryCode : this.nonVisitedSelectedTerritoryCode
    }
    this.sharedService.getNonVisitedDealerListByEmpId(jsonData)
    .subscribe(
      (response) => {
        //console.log(JSON.stringify(response));
        this.nonVisitDealerLoader = false;
        if(response.responseCode === Constant.SUCCESSFUL_RESPONSE){
          this.nonVisitedDealerList = response.wrappedList[0].nonVisitedDealerList;
        }
        else{
          this.nonVisitNoRecord = true;
        }
        
      },
      (error) => {
        this.toastr.warning(Constant.returnServerErrorMessage("getNonVisitedDealerListByEmpId"),"Alert !");
      }
    )
  }
  public getNetworkExpansionByEmpId(){
    this.networkExpansionNoRecord = false;
    this.networkExpansionLoader = true;
    this.networkExpansionList = [];
    let jsonData = {
      empId : this.empId,
      territoryCode : this.networkExpansionSelectedTerritoryCode
    }
    this.sharedService.getNetworkExpansionByEmpId(jsonData)
    .subscribe(
      (response) => {
        //console.log(JSON.stringify(response));
        this.networkExpansionLoader = false;
        if(response.responseCode === Constant.SUCCESSFUL_RESPONSE){
          this.networkExpansionList = response.wrappedList[0].networkExpansionList;
        }
        else{
          this.networkExpansionNoRecord = true;
        }
        
      },
      (error) => {
        this.toastr.warning(Constant.returnServerErrorMessage("getNetworkExpansionByEmpId"),"Alert !");
      }
    )
  }

  syncOutstanding(){
   
    this.outstandingSelectedTerritoryCode = "";
    // this.syncInProgress = true;
    this.isDisabled = true;
    this.isSyncShow = false;
    this.isSyncOutstanding = "Yes";
    this.getOutstandingByEmpId();

    // this.oustandingList = [];
    // let jsonData = {
    //   empId : this.empId,
    //   isSyncOutstanding : this.isSyncOutstanding,
    //   territoryCode : this.outstandingSelectedTerritoryCode
    // }
    // this.sharedService.getOutstandingByEmpId(jsonData)
    // .subscribe(
    //   (response) => {
    //     //console.log(JSON.stringify(response));
    //     this.isSyncOutstanding = "No";
    //     this.syncInProgress = false;
    //     this.isDisabled = false;
    //     this.isSyncShow = true;
    //     if(response.responseCode === Constant.SUCCESSFUL_RESPONSE){
    //       this.outstandingNoRecord = false;
    //       this.oustandingList = response.wrappedList[0].oustanding;
    //     }
    //     else{
    //       this.outstandingNoRecord = true;
    //     }
    //   },
    //   (error) => {
    //     this.toastr.warning(Constant.returnServerErrorMessage("getOutstandingByEmpId"),"Alert !");
    //   }
    // )
  }
}
