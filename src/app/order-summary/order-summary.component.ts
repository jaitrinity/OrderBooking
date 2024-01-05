import { Component, OnInit, Inject } from '@angular/core';
import { CommonFunction } from '../shared/constant/CommonFunction';
import { Constant } from '../shared/constant/Constant';
import { MatSnackBar, MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { OrderBookingService } from '../service/OrderbookingService';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../service/SharedService';
import { OrderSummaryTableSetting } from '../dashbord/tableSettings/OrderSummaryTableSetting';
import { AddedItemsTableSettings } from '../dashbord/tableSettings/AddedItemsTableSettings';
import { NewAddItemsTableSetting } from '../dashbord/tableSettings/NewAddItemsTableSetting';
export interface DialogData {
  transactionId: string
}

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  isShowProgressBar = true;
  orderSummaryLoader = false;
  summaryDetails = true;
  viewAddedItems = false;
  newAddItems = false;
  isDoAnyChange = false;
  orderSummaryTableSettings = OrderSummaryTableSetting.setting;
  AddedItemsTableSettings = AddedItemsTableSettings.setting;
  NewAddItemsTableSettings = NewAddItemsTableSetting.setting;
  fromDate = "";
  toDate = "";
  territoryCodeList = [];
  selectedTerritoryCodeList = [];
  dealerCodeList = [];
  selectedDealerCodeList = [];
  resultList = [];
  singleSelectdropdownSettings = {};
  empId = "";
  constructor(private route: ActivatedRoute,
    private sharedService : SharedService,
    private orBooService : OrderBookingService,
    private toastr: ToastrService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) { 
      this.route.queryParams.subscribe(params => {
        this.empId = params['empId'];
      });
    }

  ngOnInit() {
    this.singleSelectdropdownSettings = {
      singleSelection: true,
      idField: 'paramCode',
      textField: 'paramDesc',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      closeDropDownOnSelection : true
    };
    this.getTerritoryCodeByEmpId();
  }

  onSelectOrDeselectMaterialCode(item: any){
    this.actionDoneOnMatCode = "Yes";
    this.searchBy = "MATERIAL_CODE";
    this.getProductDetails();
  }
  onSelectOrDeselectMaterialDesc(item: any){
    this.actionDoneOnMatDesc = "Yes";
    this.searchBy = "MATERIAL_DESC";
    this.getProductDetails();
  }
  onSelectOrDeselectCateglogNumber(item: any){
    this.actionDoneOnCatNum = "Yes";
    this.searchBy = "CATELOG_NUMBER";
    this.getProductDetails();
  }

  onSelectOrDeselectTerritoryCode(item: any){
    this.getDealerByTerritoryCode();
  }
  onSelectOrDeselectDealer(item: any){}

  openSnackBar(message: string) {
    this._snackBar.open(message, "Alert !", {
      duration: 2000,
    });
  }

  public getTerritoryCodeByEmpId(){
    if(this.empId == "" || this.empId == undefined){
      this.openSnackBar("Invalid URL.");
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
          this.selectedTerritoryCodeList = this.territoryCodeList;
          // this.getDealerByTerritoryCode();
        }
        this.isShowProgressBar = false;
      },
      (error) => {
        this.toastr.warning(Constant.returnServerErrorMessage("getTerritoryCodeByEmpId"),"Alert !");
      }
    )
  }

  getDealerByTerritoryCode(){
    if(this.selectedTerritoryCodeList.length == 0){
      return ;
    }

    let terrId = CommonFunction.createCommaSeprate(this.selectedTerritoryCodeList);
    let jsonData = {
      "territoryCode" : terrId
    }
    this.orBooService.getDealerByTerritoryCode(jsonData)
    .subscribe(
      (response) => {
        this.dealerCodeList = response.wrappedList;
        this.isShowProgressBar = false;
      },
      (error) => {
        this.toastr.warning(Constant.returnServerErrorMessage("getDealerByTerritoryCode"),"Alert !");
      }
    )
  }

  getOrderSummary(){
    
    let terrId = CommonFunction.createCommaSeprate(this.selectedTerritoryCodeList);
    let dealerCode = CommonFunction.createCommaSeprate(this.selectedDealerCodeList);

    let jsonData = {
      empId : this.empId,
      fromDate : this.fromDate,
      toDate : this.toDate,
      territoryCode : terrId,
      dealerCode : dealerCode
    }
    this.resultList = [];
    this.orderSummaryLoader = true;
    this.orBooService.getAnyPostRequestData('getOrderSummary',jsonData)
    .subscribe(
      (response) => {
        this.resultList = response.wrappedList;
        this.orderSummaryLoader = false;
      },
      (error) => {
        this.toastr.warning(Constant.returnServerErrorMessage("getOrderSummary"),"Alert !");
      }
    )
  }

  onCustomAction(event) {
    switch ( event.action) {
      case 'viewTransactionRecord':
        this.viewTransactionDetails(event);
        break;
     case 'deleteTransactionRecord':
        this.deleteTransaction(event);
        break;
     case 'editItemRecord':
        this.editItem(event);
        break;
     case 'deleteItemRecord':
        this.deleteItem(event);
        break;
     case 'deleteNewItemRecord':
        this.deleteNewItem(event);
        break;
    }
  }

  viewTransactionId = "";
  viewDivisionName = "";
  viewOrganizationId = "";
  transactionViewType = "";
  viewDocumentType = "";
  viewDistChannel = "";
  viewDealerCode = "";
  viewPlant = "";
  viewPaymentTerm = "";
  viewTerritoryCode = "";
  alreadyExistItemList = [];
  viewTransactionDetails(event){
    localStorage.clear();
    this.summaryDetails = false;
    this.viewAddedItems = true;
    this.viewTransactionId = event.data.transactionId;
    this.viewDivisionName = event.data.divisionName;
    this.viewOrganizationId = event.data.organizationId;
    this.viewDocumentType = event.data.documentType;
    this.viewDistChannel = event.data.distChannel;
    this.viewDealerCode = event.data.dealerCode;
    this.viewPlant = event.data.plant;
    this.viewPaymentTerm = event.data.paymentTerm;
    this.viewTerritoryCode = event.data.territoryCode;
    this.transactionViewType = event.data.type;
    for(let i=0;i<this.resultList.length;i++){
      let loopTrId = this.resultList[i].transactionId;
      if(loopTrId == this.viewTransactionId){
        this.alreadyExistItemList = this.resultList[i].orderItemsList;
        return;
      }
    } 
  }

  dialogRef : MatDialogRef<DeleteDialog>;
  deleteTransaction(event){
    let type = event.data.type;
    if(type!="" && type == "S"){
      this.openSnackBar("this item already place you can't delete it. ");
      return ;
    }
    let transactionId = event.data.transactionId;

    this.dialogRef = this.dialog.open(DeleteDialog, {
      disableClose: false,
      data :{
        transactionId : transactionId
      }
    });

    this.dialogRef.afterClosed().subscribe(result => {
      // console.log(result)
      if(result) {
         let jsonData = {
          transactionId : transactionId
        }
        this.orBooService.getAnyPostRequestData('deleteTransactionAndDetails',jsonData)
        .subscribe(
          (response) => {
            if(response.responseCode == Constant.SUCCESSFUL_RESPONSE){
              this.openSnackBar("transaction successfully delete ");
              this.getOrderSummary();
            }
            else{
              this.openSnackBar("something wrong ");
            }
          },
          (error) => {
            this.toastr.warning(Constant.returnServerErrorMessage("deleteTransaction"),"Alert !");
          }
        )
      }
      this.dialogRef = null;

    });
  }

  editQuantity = "";
  editItems : boolean = false;
  editId = "";
  editItem(event){
    if(this.transactionViewType == "S"){
      this.openSnackBar("this item already place you can't edit it. ");
      return ;
    }
    this.viewAddedItems = false;
    this.editId  = event.data.id;
    for(let i=0;i<this.alreadyExistItemList.length;i++){
      let loopId = this.alreadyExistItemList[i].id;
      if(loopId == this.editId){
        this.editQuantity = this.alreadyExistItemList[i].quantity;
        this.editItems = true;
        return ;
      }
    }
  }

  newExistItemList = [];
  saveEditItems(){
    this.editItems = false;
    this.viewAddedItems = true;
    this.newExistItemList = [];

    for(let i=0;i<this.alreadyExistItemList.length;i++){
      let newObj = this.alreadyExistItemList[i];
      let loopId = newObj.id;
      if(loopId == this.editId){
        let editJson = {
          id : newObj.id,
          materialDesc : newObj.materialDesc,
          materialCode : newObj.materialCode,
          catelogNumber : newObj.catelogNumber,
          divisionCode : newObj.divisionCode,
          quantity : this.editQuantity
        }
        this.newExistItemList.push(editJson);
      }
      else{
        this.newExistItemList.push(newObj);
      }
    }

    this.alreadyExistItemList = this.newExistItemList;
  }

  deleteItem(event){
    let id = event.data.id;
    let isExistInLocalStorage = localStorage.getItem("Delete_Item_"+id);
    if(isExistInLocalStorage == null){
      this.openSnackBar("To confirm to delete, please press button again ");
      localStorage.setItem("Delete_Item_"+id,id);
      return ;
    }
    
    
    if(this.transactionViewType == "S"){
      this.openSnackBar("this item already place you can't delete it. ");
      return false;
    }

    let jsonData = {
      transactionId : this.viewTransactionId,
      transactionDetId : id
    }
    
    this.orBooService.getAnyPostRequestData('deleteTransactionAndDetails',jsonData)
    .subscribe(
      (response) => {
        if(response.responseCode == Constant.SUCCESSFUL_RESPONSE){
          this.openSnackBar("transaction successfully delete ");
          this.getOrderSummary();
          let localAlreadyList = [];
          for(let i=0;i<this.alreadyExistItemList.length;i++){
            let loopId = this.alreadyExistItemList[i].id;
            if(loopId != id){
              localAlreadyList.push(this.alreadyExistItemList[i]);
            }
          }
          this.alreadyExistItemList = localAlreadyList;
        }
        else{
          this.openSnackBar("something wrong ");
        }
      },
      (error) => {
        this.toastr.warning(Constant.returnServerErrorMessage("deleteTransaction"),"Alert !");
      }
    )
  }
  deleteNewItem(event){
    let id = event.data.id;
    let isExistInLocalStorage = localStorage.getItem("Delete_New_Item_"+id);
    if(isExistInLocalStorage == null){
      this.openSnackBar("To confirm to delete, please press button again ");
      localStorage.setItem("Delete_New_Item_"+id,id);
      return ;
    }
    
    
    let tempNewItems = [];
    for(let i=0;i<this.newAddItemsList.length;i++){
      let listObj = this.newAddItemsList[i];
      let loopId = listObj.id;
      let tempNewLength = tempNewItems.length
      if(loopId != id){
        let newObj = {
          id : tempNewLength+1,
          materialDesc : listObj.materialDesc,
          materialCode : listObj.materialCode,
          catelogNumber : listObj.catelogNumber,
          divisionCode : listObj.divisionCode,
          quantity : listObj.quantity
        }
        tempNewItems.push(newObj);
      }
    }
    this.newAddItemsList = tempNewItems;
  }

  addNewItems(){
    if(this.transactionViewType == "S"){
      this.openSnackBar("this order already place you can't add more items.");
      return false;
    }
    this.newAddItems = true;
    this.viewAddedItems = false;
    this.newAddItemsList = [];
    this.materialDescList = [];
    this.selectedMaterialDescList = [];
    this.materialCodeList = [];
    this.selectedMaterialCodeList = [];
    this.catelogNumberList = [];
    this.selectedCatelogNumberList = [];
    this.quantity = "";
    this.documentTypeList = [];
    this.selectedDocumentTypeList = [];
    this.plantList = [];
    this.selectedPlantList = [];
    this.paymentTermList = [];
    this.selectedPaymentTermList = [];
    this.getProductDetails()
  }

  materialCodeList = [];
  selectedMaterialCodeList = [];
  materialDescList = [];
  selectedMaterialDescList = [];
  catelogNumberList = [];
  selectedCatelogNumberList = [];
  divisionCodeList = [];
  selectedDivisionCodeList = [];
  searchBy = "";
  actionDoneOnMatCode = "No";
  actionDoneOnMatDesc = "No";
  actionDoneOnCatNum = "No";
  quantity = "";

  public getProductDetails(){

    let matCode = CommonFunction.createCommaSeprate(this.selectedMaterialCodeList);
    let matDesc = CommonFunction.createCommaSeprate(this.selectedMaterialDescList);
    let catNum = CommonFunction.createCommaSeprate(this.selectedCatelogNumberList);
    if(matCode == "" && matDesc == "" && catNum == ""){
      this.searchBy = "";
    }
    if(matCode == ""){
      this.actionDoneOnMatCode = "No";
    }
    if(matDesc == ""){
      this.actionDoneOnMatDesc = "No";
    }
    if(catNum == ""){
      this.actionDoneOnCatNum = "No";
    }
    let jsonData = {
      salesOrg : this.viewOrganizationId,
      distributionChannel : this.viewDistChannel,
      divisionCode : this.viewDivisionName,
      plantCode : this.viewPlant,
      matCode : matCode,
      matDesc : matDesc,
      catNum : catNum,
      actionDoneOnMatCode : this.actionDoneOnMatCode,
      actionDoneOnMatDesc : this.actionDoneOnMatDesc,
      actionDoneOnCatNum : this.actionDoneOnCatNum,
      searchBy : this.searchBy
    }
    this.orBooService.getProductDetails(jsonData)
    .subscribe(
      (response) => {
        // console.log(JSON.stringify(response));
        if(this.searchBy == ""){
          //this.materialCodeList = response.wrappedList[0].materialCodeList;
          this.materialDescList = response.wrappedList[0].materialDescList;
          //this.catelogNumberListList = response.wrappedList[0].catelogNumberListList;
        }
        else if(this.searchBy == Constant.MATERIAL_CODE){
          if(this.actionDoneOnMatDesc == "No"){
            this.materialDescList = response.wrappedList[0].materialDescList;
          }
          if(this.actionDoneOnCatNum == "No"){
            this.catelogNumberList = response.wrappedList[0].catelogNumberListList;
          }  
        }
        else if(this.searchBy == Constant.MATERIAL_DESC){
          // if(this.actionDoneOnMatCode == "No"){
          //   this.materialCodeList = response.wrappedList[0].materialCodeList;
          // }
          if(this.actionDoneOnCatNum == "No"){
            this.catelogNumberList = response.wrappedList[0].catelogNumberListList;
          }
        }
        else if(this.searchBy == Constant.CATELOG_NUMBER){
          // if(this.actionDoneOnMatDesc == "No"){
          //   this.materialDescList = response.wrappedList[0].materialDescList;
          // }
          if(this.actionDoneOnMatCode == "No"){
            this.materialCodeList = response.wrappedList[0].materialCodeList;
          }
        }

        // if(this.actionDoneOnMatCode == "Yes" && 
        //     this.actionDoneOnMatDesc == "Yes" && 
        //       this.actionDoneOnCatNum == "Yes"){
        //         this.divisionCodeList = response.wrappedList[0].divisionCodeList;
        //         if(this.divisionCodeList.length == 1){
        //           this.selectedDivisionCodeList = this.divisionCodeList;
        //         }
        // }
      },
      (error) => {
        this.toastr.warning(Constant.returnServerErrorMessage("getProductDetails"),"Alert !");
      }
    )
  }

  validateAddItems() : any{
   
   if(this.selectedMaterialDescList.length == 0){
      this.openSnackBar("please select material desc ");
      return false;
    }
    // else if(this.selectedCatelogNumberList.length == 0){
    //   this.openSnackBar("please select catelog number ");
    //   return false;
    // }
    // else if(this.selectedDivisionCodeList.length == 0){
    //   this.openSnackBar("please select division code ");
    //   return false;
    // }
    else if(this.quantity.trim() == ""){
      this.openSnackBar("please enter quantity ");
      return false;
    }
    return true;
  }

  documentTypeList = [];
  selectedDocumentTypeList = [];
  plantList = [];
  selectedPlantList = [];
  paymentTermList = [];
  selectedPaymentTermList = [];
  docPlantPay = false;
  newAddItemsList = [];
  allAddItems = [];

  addItems(){
    if(!this.validateAddItems()){
      return ;
    }

    this.documentTypeList = [];
    this.selectedDocumentTypeList = [];
    this.paymentTermList = [];
    this.selectedPaymentTermList = [];
    this.plantList = [];
    this.selectedPlantList = [];

    this.docPlantPay = false;
   
    // let v5 = CommonFunction.createCommaSeprateByParamDesc(this.selectedMaterialCodeList);
    // let v6 = CommonFunction.createCommaSeprateByParamDesc(this.selectedMaterialDescList);
    // let v7 = CommonFunction.createCommaSeprateByParamDesc(this.selectedCatelogNumberList);
    // let v8 = CommonFunction.createCommaSeprateByParamDesc(this.selectedDivisionCodeList);

    let comb = CommonFunction.createCommaSeprateByParamDesc(this.selectedMaterialDescList);
    let v6 = comb.split(" ~ ")[0];
    let v7 = comb.split(" ~ ")[1];
    let v5 = comb.split(" ~ ")[2];

    this.allAddItems = this.newAddItemsList;
    let newAddedItemLength = this.allAddItems.length + 1;

    let addItemJson = {
      id : newAddedItemLength,
      materialCode : v5.trim(),
      materialDesc : v6.trim(),
      catelogNumber : v7.trim(),
      // divisionCode : v8.trim(),
      quantity : this.quantity
    }

    this.allAddItems.push(addItemJson);
    this.newAddItemsList = [];
    setTimeout(() => {
      this.newAddItemsList = this.allAddItems;
      // console.log(JSON.stringify(this.newAddItemsList))
    }, 1);
    this.makeDefaultField();
    
  }

  makeDefaultField(){
    // this.isDisabled = true;

    this.selectedMaterialDescList = [];

    // this.catelogNumberList = [];
    // this.selectedCatelogNumberList = [];

    // this.materialCodeList = [];
    // this.selectedMaterialCodeList = [];
  
    // this.divisionCodeList = [];
    // this.selectedDivisionCodeList = [];

    this.quantity = "";
  }

  actionOnItem : number = 0;
  loader : boolean = false;
  getOtherFieldData(){
    if(this.newAddItemsList.length == 0){
      this.openSnackBar("please add one new item first.");
      return ;
    }
    this.actionOnItem = this.newAddItemsList.length;
    this.loader = true;
    let divisionCode = "";
    for(let i=0;i<this.newAddItemsList.length;i++){
      let dc = this.newAddItemsList[i].divisionCode;
      divisionCode += dc;
      if(i != this.newAddItemsList.length-1){
        divisionCode += ",";
      }
    }
    let jsonData = {
      salesOrg : this.viewOrganizationId,
      divisionCode : divisionCode
    }
    // console.log(JSON.stringify(jsonData));
    this.orBooService.getOtherFieldData(jsonData)
    .subscribe(
      (response) => {
        this.documentTypeList = response.wrappedList[0].documentTypeList;
        this.plantList = response.wrappedList[0].plantList;
        this.paymentTermList = response.wrappedList[0].paymentTermList;
        this.loader = false;
        this.docPlantPay = true;
      },
      (error) => {
        this.toastr.warning(Constant.returnServerErrorMessage("getOtherFieldData"),"Alert !");
      }
    )
  }

  inProgress : boolean = false;

  submitItems(submitType,methodType){
    // if(methodType == 'add' && this.selectedDocumentTypeList.length == 0){
    //   this.openSnackBar("please select document type")
    //   return ;
    // }
    // else if(methodType == 'add' && this.selectedPlantList.length == 0){
    //   this.openSnackBar("please select plant")
    //   return ;
    // }
    // else if(methodType == 'add' && this.selectedPaymentTermList.length == 0){
    //   this.openSnackBar("please select payment term")
    //   return ;
    // }
    this.inProgress = true;
    // let transactionId = this.viewTransactionId;
    // let orgId = this.viewOrganizationId;
    // let diviName = this.viewDivisionName;
    // let disttibutionChannel = this.viewDistChannel;
    let docType = CommonFunction.createCommaSeprate(this.selectedDocumentTypeList);
    let plant = CommonFunction.createCommaSeprate(this.selectedPlantList);
    let payTerm = CommonFunction.createCommaSeprate(this.selectedPaymentTermList);
    if(methodType == "edit"){
      docType = this.viewDocumentType;
      plant = this.viewPlant;
      payTerm = this.viewPaymentTerm;
    }

    let jsonData = {
      transactionId : this.viewTransactionId,
      empId : this.empId,
      territoryCode : this.viewTerritoryCode,
      dealerCode : this.viewDealerCode,
      orgId : this.viewOrganizationId,
      divisionName : this.viewDivisionName,
      disttibutionChannel : this.viewDistChannel,
      documentType : docType,
      plant : plant,
      paymentTerm : payTerm,
      submitType : submitType,
      isNewTransaction : "N",
      alreadyExistItemList : this.alreadyExistItemList,
      newAddItemsList : this.newAddItemsList,
    }

    // console.log(JSON.stringify(jsonData));

    this.orBooService.submitOrderBookingData(jsonData)
    .subscribe(
      (response) => {
        // console.log(response)
        this.inProgress = false;
        if(response.responseCode == Constant.SUCCESSFUL_STATUS_CODE){
          this.openSnackBar("Successfully inserted");
          this.makeDefaultAfterSubmit();
        }
        else{
          this.openSnackBar("something wrong");
        }
      },
      (error) => {
        this.toastr.warning(Constant.returnServerErrorMessage("submitOrderBookingData"),"Alert !");
      }
    )
  }

  makeDefaultAfterSubmit(){
    this.newAddItems = false;
    this.editItems = false;
    this.viewAddedItems = false;
    this.summaryDetails = true;
    this.getOrderSummary();

    this.catelogNumberList = [];
    this.selectedCatelogNumberList = [];
    this.materialCodeList = [];
    this.selectedMaterialCodeList = [];
    this.divisionCodeList = [];
    this.selectedDivisionCodeList = [];
    this.quantity = "";
    this.allAddItems = [];
    this.newAddItemsList = [];
    this.documentTypeList = [];
    this.selectedDocumentTypeList = [];
    this.plantList = [];
    this.selectedPlantList = [];
    this.paymentTermList = [];
    this.selectedPaymentTermList = [];
    this.docPlantPay = false;
    setTimeout(() => {
      this.openSnackBar("Now add new items");
    }, 2000);
    
  }

  

}

@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.html',
})
export class DeleteDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
