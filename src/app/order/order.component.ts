import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../service/SharedService';
import { ToastrService } from 'ngx-toastr';
import { Constant } from '../shared/constant/Constant';
import { CommonFunction } from '../shared/constant/CommonFunction';
import { OrderBookingTableSetting } from '../dashbord/tableSettings/OrderBookingTableSetting';
import { OrderBookingService } from '../service/OrderbookingService';
// import { DatePipe } from '@angular/common';
import { MatSnackBar, MatDialog,MatDialogRef, ThemePalette } from '@angular/material';
declare var $: any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  // spinnerColor: ThemePalette = 'warn';
  spinnerColor: ThemePalette = 'accent';
  descInProgress = false;
  cateInProgress = false;
  codeInProgress = false;
  inProgress = false;
  loader = false;
  isDisabled = false;
  docPlantPay = false;
  orderBookingTableSetting = OrderBookingTableSetting.setting;
  multiSelectdropdownSettings = {};
  singleSelectdropdownSettings = {};

  allAddItems = [];
  addItemsList = [];
  territoryCodeList = [];
  selectedTerritoryCodeList = [];
  dealerCodeList = [];
  selectedDealerCodeList = [];
  organizationList = [];
  selectedOrganizationList = [];
  distriChannelList = [];
  selectedDistriChannelList = [];
  distributionChannelList = [];
  selectedDistributionChannelList = [];

  divisionNameList = [];
  selectedDivisionNameList = [];

  materialCodeList = [];
  selectedMaterialCodeList = [];
  materialDescList = [];
  selectedMaterialDescList = [];
  catelogNumberListList = [];
  selectedCatelogNumberList = [];
  divisionCodeList = [];
  selectedDivisionCodeList = [];
  
  documentTypeList = [];
  selectedDocumentTypeList = [];
  plantList = [];
  selectedPlantList = [];
  paymentTermList = [];
  selectedPaymentTermList = [];


  toastrFadeoutTime : number = 0;
  actionDoneOnMatCode = "No";
  actionDoneOnMatDesc = "No";
  actionDoneOnCatNum = "No";
  bankNameList = [];
  selectedBankNameList = [];
  chequeNumber = "";
  quantity = "";
  empId = "";
  constructor(private route: ActivatedRoute,
    private sharedService : SharedService,
    private orBooService : OrderBookingService,
    private toastr: ToastrService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) { 
      this.toastrFadeoutTime = Constant.TOSTER_FADEOUT_TIME;
    this.route.queryParams.subscribe(params => {
        this.empId = params['empId'];
    });
  }

  ngOnInit() {
    this.multiSelectdropdownSettings = {
      singleSelection: false,
      idField: 'paramCode',
      textField: 'paramDesc',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 0,
      allowSearchFilter: true
    };
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

  openSnackBar(message: string) {
    this._snackBar.open(message, "Alert !", {
      duration: 2000,
    });
  }

  onSelectOrDeselectDealer(item: any){}
  onSelectOrDeselectDivisionName(item: any){
    this.dealerCodeList = [];
    this.selectedDealerCodeList = [];

    this.paymentTermList = [];
    this.selectedPaymentTermList = [];

    this.plantList = [];
    this.selectedPlantList = [];

    this.documentTypeList = [];
    this.selectedDocumentTypeList = [];

    this.materialDescList = [];
    this.selectedMaterialDescList = [];

    this.catelogNumberListList = [];
    this.selectedCatelogNumberList = [];

    this.materialCodeList = [];
    this.selectedMaterialCodeList = [];

    this.quantity = "";

    this.getDealerByTerritoryCode();
  }
  onSelectOrDeselectDistChannel(item: any){
    this.divisionNameList = [];
    this.selectedDivisionNameList = [];

    this.dealerCodeList = [];
    this.selectedDealerCodeList = [];

    this.paymentTermList = [];
    this.selectedPaymentTermList = [];

    this.plantList = [];
    this.selectedPlantList = [];

    this.documentTypeList = [];
    this.selectedDocumentTypeList = [];

    this.materialDescList = [];
    this.selectedMaterialDescList = [];

    this.catelogNumberListList = [];
    this.selectedCatelogNumberList = [];

    this.materialCodeList = [];
    this.selectedMaterialCodeList = [];

    this.quantity = "";

    this.getDivisionNameDistributionChannel();
  }
  onSelectOrDeselectDivisionCode(item: any){}
  onSelectOrDeselectDocumentType(item: any){}
  onSelectOrDeselectPlant(item: any){
    this.documentTypeList = [];
    this.selectedDocumentTypeList = [];

    this.materialDescList = [];
    this.selectedMaterialDescList = [];

    this.catelogNumberListList = [];
    this.selectedCatelogNumberList = [];

    this.materialCodeList = [];
    this.selectedMaterialCodeList = [];

    this.quantity = "";

    this.getDocumentTypeByPlant();
    this.getProductDetails();
  }
  onSelectOrDeselectPaymentTerm(item: any){}

  onSelectOrDeselectTerritoryCode(item: any){
    // this.getDealerByTerritoryCode();
  }
  onSelectOrDeselectOrganization(item: any){
    this.getDistributionChannelByOrgId();
  }
  // onSelectOrDeselectMaterialCode(item: any){
  //   this.actionDoneOnMatCode = "Yes";
  //   this.searchBy = "MATERIAL_CODE";
  //   this.getProductDetails();
  // }
  onSelectOrDeselectMaterialDesc(item: any){
    let matDesc = this.selectedMaterialDescList[0].paramCode;
    
    if(this.materialDescAddedList.find(x => x === matDesc)){
      this.openSnackBar("You already added "+matDesc+", please select another one. ");
      return false;
    }
    // this.actionDoneOnMatDesc = "Yes";
    // this.searchBy = "MATERIAL_DESC";

    // this.catelogNumberListList = [];
    // this.selectedCatelogNumberList = [];

    // this.materialCodeList = [];
    // this.selectedMaterialCodeList = [];

    // this.cateInProgress = true;
    // this.getProductDetails();
  }
  // onSelectOrDeselectCateglogNumber(item: any){
  //   this.actionDoneOnCatNum = "Yes";
  //   this.searchBy = "CATELOG_NUMBER";
    
  //   this.materialCodeList = [];
  //   this.selectedMaterialCodeList = [];

  //   this.codeInProgress = true;
  //   this.getProductDetails();
  // }

  getDocumentTypeByPlant(){
    // let documentType = "";
    let paramCode = this.selectedPlantList[0].paramCode;
    let dtList = [];
    for(let i=0;i<this.plantList.length;i++){
      let pc = this.plantList[i].paramCode;
      let dt = this.plantList[i].documentType;
      let dc = this.plantList[i].documentDesc;
      if(pc == paramCode){
        // documentType = dt;
        let json = {
          paramCode : dt,
          paramDesc : dc+"("+dt+")"
        }
        dtList.push(json);
        break;
      }
    }
    this.documentTypeList = dtList;
    if(this.documentTypeList.length == 1){
      this.selectedDocumentTypeList = this.documentTypeList;
    }
    
    // let salesOrg = CommonFunction.createCommaSeprate(this.selectedOrganizationList);
    // let distChannel = CommonFunction.createCommaSeprate(this.selectedDistributionChannelList);
    // let diviCode = CommonFunction.createCommaSeprate(this.selectedDivisionNameList);
    // let plantCode = CommonFunction.createCommaSeprate(this.selectedPlantList);
    // let jsonData = {
    //   salesOrg : salesOrg,
    //   distributionChannel : distChannel,
    //   divisionCode : diviCode,
    //   plantCode : plantCode
    // }
    // this.orBooService.getDocumentTypeByPlant(jsonData)
    // .subscribe(
    //   (response) => {

    //   },
    //   (error) => {
    //     this.toastr.warning(Constant.returnServerErrorMessage("getDocumentTypeByPlant"),"Alert !");
    //   }
    // )
  }

  onCustomAction(event) {
    switch ( event.action) {
      case 'editRecord':
        this.editAddedItem(event);
        break;
     case 'deleteRecord':
        this.deleteAddedItem(event);
        break;
    }
  }

  dialogRef : MatDialogRef<DeleteConfirmDialog>;
  deleteAddedItem(event){
    this.dialogRef = this.dialog.open(DeleteConfirmDialog, {
      disableClose: false
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        // this.documentTypeList = [];
        // this.selectedDocumentTypeList = [];
        // this.paymentTermList = [];
        // this.selectedPaymentTermList = [];
        // this.plantList = [];
        // this.selectedPlantList = [];
        this.docPlantPay = false;

        let srNo = event.data.srNo;
        let newList = [];
        // alert(srNo);
        for(let i=0;i<this.addItemsList.length;i++){
          let loopSrNo = this.addItemsList[i].srNo;
          let loopTerritoryCode = this.addItemsList[i].territoryCode;
          let loopDealerCode = this.addItemsList[i].dealerCode;
          let loopOrganization = this.addItemsList[i].organization;
          let loopDistributionChannel = this.addItemsList[i].distributionChannel;
          let loopMaterialCode = this.addItemsList[i].materialCode;
          let loopMaterialDesc = this.addItemsList[i].materialDesc;
          let loopCatelogNumber = this.addItemsList[i].catelogNumber;
          let loopDivisionCode = this.addItemsList[i].divisionCode;
          let loopQuantity = this.addItemsList[i].quantity;
          if(loopSrNo != srNo){
            let newJson = {
              srNo : newList.length + 1,
              territoryCode : loopTerritoryCode,
              dealerCode : loopDealerCode,
              organization : loopOrganization,
              distributionChannel : loopDistributionChannel,
              materialCode : loopMaterialCode,
              materialDesc : loopMaterialDesc,
              catelogNumber : loopCatelogNumber,
              divisionCode : loopDivisionCode,
              quantity : loopQuantity
            } 
            newList.push(newJson); 
          }
        }
        this.addItemsList = newList;
      }
      this.dialogRef = null;
    });
  }

  // openModal(){
  //   $("#editModal").modal({
  //     backdrop : 'static',
  //     keyboard : false
  //   });
  // }

  editQuantity = "";
  editAddedItem(event){
    let srNo = event.data.srNo;
    for(let i=0;i<this.addItemsList.length;i++){
      let loopSrNo = this.addItemsList[i].srNo;
      if(loopSrNo == srNo){
        this.editQuantity = this.addItemsList[i].quantity;

        $("#editModal").modal({
          backdrop : 'static',
          keyboard : false
        });
        break; 
      }
    }
  }

  searchBy = "";
  public getProductDetails(){
    if(this.selectedOrganizationList.length == 0){
      this.openSnackBar("please select organization ");
      return false;
    }
    
    else if(this.selectedDivisionNameList.length == 0){
      this.openSnackBar("please select division Name ");
      return false;
    }
    else if(this.selectedPlantList.length == 0){
      this.openSnackBar("please select plant ");
      return false;
    }

    if(this.actionDoneOnMatDesc == 'Yes'){
      this.actionDoneOnCatNum = "No";
      this.actionDoneOnMatCode = "No";
      this.openSnackBar("please wait some moments Catelog Number coming in progress ");
    }
    if(this.actionDoneOnCatNum == 'Yes'){
      this.actionDoneOnMatCode = "No";
      this.openSnackBar("please wait some moments Material Code coming in progress ");
    }
    
    let salesOrg = CommonFunction.createCommaSeprate(this.selectedOrganizationList);
    let distChannel = CommonFunction.createCommaSeprate(this.selectedDistributionChannelList);
    let diviCode = CommonFunction.createCommaSeprate(this.selectedDivisionNameList);
    let plantCode = CommonFunction.createCommaSeprate(this.selectedPlantList);
    let matCode = CommonFunction.createCommaSeprate(this.selectedMaterialCodeList);
    let matDesc = CommonFunction.createCommaSeprate(this.selectedMaterialDescList);
    let catNum = CommonFunction.createCommaSeprate(this.selectedCatelogNumberList);
    if(matCode == "" && matDesc == "" && catNum == ""){
      this.openSnackBar("please wait some moments Material Desc coming in progress ");
      this.descInProgress = true;
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
      salesOrg : salesOrg,
      distributionChannel : distChannel,
      divisionCode : diviCode,
      plantCode : plantCode,
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
          this.materialDescList = response.wrappedList[0].materialDescList;
          this.descInProgress = false;
        }
        else if(this.searchBy == Constant.MATERIAL_CODE){
          if(this.actionDoneOnMatDesc == "No"){
            this.materialDescList = response.wrappedList[0].materialDescList;
          }
          if(this.actionDoneOnCatNum == "No"){
            this.catelogNumberListList = response.wrappedList[0].catelogNumberListList;
          }  
        }
        else if(this.searchBy == Constant.MATERIAL_DESC){
          this.cateInProgress = false;
          // if(this.actionDoneOnCatNum == "No"){
          //   this.catelogNumberListList = response.wrappedList[0].catelogNumberListList;
          //   if(this.catelogNumberListList.length == 1){
          //     this.selectedCatelogNumberList = this.catelogNumberListList;
          //     this.actionDoneOnCatNum = "Yes";
          //     this.searchBy = "CATELOG_NUMBER";
          //     this.codeInProgress = true;
          //     this.getProductDetails();
          //   }
          // }
        }
        else if(this.searchBy == Constant.CATELOG_NUMBER){
          this.codeInProgress = false;
          // if(this.actionDoneOnMatCode == "No"){
          //   this.materialCodeList = response.wrappedList[0].materialCodeList;
          //   if(this.materialCodeList.length == 1){
          //     this.actionDoneOnMatCode = "Yes";
          //     this.searchBy = "MATERIAL_CODE";
          //     this.selectedMaterialCodeList = this.materialCodeList;
          //   }
          // }
        }
      },
      (error) => {
        this.toastr.warning(Constant.returnServerErrorMessage("getProductDetails"),"Alert !");
      }
    )
  }
  uiOrganization = "";
  uiTerritoryCode = "";
  businessUnit = "";
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
        // console.log(JSON.stringify(response));
        this.territoryCodeList = response.wrappedList[0].terricodeList;
        if(this.territoryCodeList.length == 1){
          this.selectedTerritoryCodeList = this.territoryCodeList;
          this.uiTerritoryCode += this.selectedTerritoryCodeList[0].paramDesc;
          this.uiTerritoryCode += "("+this.selectedTerritoryCodeList[0].paramCode+")";
          // this.getDealerByTerritoryCode();
        }
        this.distriChannelList = response.wrappedList[0].distributionChannelList;
        this.organizationList = response.wrappedList[0].organizationList;
        // this.bankNameList = response.wrappedList[0].bankNameList;
        if(this.organizationList.length == 1){
          this.selectedOrganizationList = this.organizationList;
          this.uiOrganization += this.selectedOrganizationList[0].paramDesc;
          this.uiOrganization += "("+this.selectedOrganizationList[0].paramCode+")";
          this.getDistributionChannelByOrgId();
        }
        this.businessUnit = response.wrappedList[0].businessUnit;
        //this.paymentTermList = response.wrappedList[0].paymentTermList;
        
      },
      (error) => {
        this.toastr.warning(Constant.returnServerErrorMessage("getTerritoryCodeByEmpId"),"Alert !");
      }
    )
  }

  getDivisionNameDistributionChannel(){
    if(this.selectedDistributionChannelList.length == 0){
      this.openSnackBar("please select distribution channel ");
      return ;
    }

    this.divisionNameList = [];
    
    let salesOrg = CommonFunction.createCommaSeprate(this.selectedOrganizationList);
    let terrId = CommonFunction.createCommaSeprate(this.selectedTerritoryCodeList);
    let distChannel = CommonFunction.createCommaSeprate(this.selectedDistributionChannelList);
    let jsonData = {
      "salesOrg" : salesOrg,
      "territoryCode" : terrId,
      "distributionChannel" : distChannel,
      "businessUnit" : this.businessUnit
    }
    this.orBooService.getDivisionNameDistributionChannel(jsonData)
    .subscribe(
      (response) => {
        this.divisionNameList = response.wrappedList[0].divisionNameList;
      },
      (error) => {
        this.toastr.warning(Constant.returnServerErrorMessage("getDealerByTerritoryCode"),"Alert !");
      }
    )
  }
  getDealerByTerritoryCode(){
    if(this.selectedTerritoryCodeList.length == 0){
      return ;
    }
    if(this.selectedDistributionChannelList.length == 0){
      this.openSnackBar("please select distribution channel ");
      return ;
    }
    if(this.selectedDivisionNameList.length == 0){
      this.openSnackBar("please select division name ");
      return ;
    }

    let salesOrg = CommonFunction.createCommaSeprate(this.selectedOrganizationList);
    let terrId = CommonFunction.createCommaSeprate(this.selectedTerritoryCodeList);
    let distChannel = CommonFunction.createCommaSeprate(this.selectedDistributionChannelList);
    let diviCode = CommonFunction.createCommaSeprate(this.selectedDivisionNameList);
    let jsonData = {
      "salesOrg" : salesOrg,
      "territoryCode" : terrId,
      "distributionChannel" : distChannel,
      "divisionCode" : diviCode,
      "businessUnit" : this.businessUnit

    }
    this.orBooService.getDealerByTerritoryCode(jsonData)
    .subscribe(
      (response) => {
        this.dealerCodeList = response.wrappedList[0].dealerCodeList;
        // this.documentTypeList = response.wrappedList[0].documentTypeList;
        this.paymentTermList = response.wrappedList[0].paymentTermList;
        this.plantList = response.wrappedList[0].plantList;
        if(this.dealerCodeList.length == 0){
          this.toastr.warning("Dealer not found of "+distChannel+" distributionChannel and "+diviCode+" divisionName","Alert !",{timeOut : this.toastrFadeoutTime});
        }
        if(this.paymentTermList.length == 0){
          this.toastr.warning("Payment term not found of "+distChannel+" distributionChannel and "+diviCode+" divisionName","Alert !",{timeOut : this.toastrFadeoutTime});
        }
        if(this.plantList.length == 0){
          this.toastr.warning("Plant not found of "+distChannel+" distributionChannel and "+diviCode+" divisionName","Alert !",{timeOut : this.toastrFadeoutTime});
        }
      },
      (error) => {
        this.toastr.warning(Constant.returnServerErrorMessage("getDealerByTerritoryCode"),"Alert !");
      }
    )
  }

  getDistributionChannelByOrgId(){
    if(this.selectedOrganizationList.length != 0){
      this.distributionChannelList = this.distriChannelList;
    }
    else{
      this.distributionChannelList = [];
      this.selectedDistributionChannelList = [];
    }
  }

  validateAddItems() : any{
    // if(this.selectedBankNameList.length == 0){
    //   this.openSnackBar("please select bank name ");
    //   return false;
    // }
    // else if(this.chequeNumber == ""){
    //   this.openSnackBar("please enter valid cheque number ");
    //   return false;
    // }
    if(this.selectedOrganizationList.length == 0){
      this.openSnackBar("please select organization ");
      return false;
    }
    else if(this.selectedTerritoryCodeList.length == 0){
      this.openSnackBar("please select territory code");
      return false;
    }
    else if(this.selectedDistributionChannelList.length == 0){
      this.openSnackBar("please select distribution channel ");
      return false;
    }
    else if(this.selectedDivisionNameList.length == 0){
      this.openSnackBar("please select division name");
      return false;
    }

    else if(this.selectedDealerCodeList.length == 0){
      this.openSnackBar("please select dealer name");
      return false;
    }

    else if(this.selectedPaymentTermList.length == 0){
      this.openSnackBar("please select payment term");
      return false;
    }

    else if(this.selectedDocumentTypeList.length == 0){
      this.openSnackBar("please select document type");
      return false;
    }
   
    else if(this.selectedPlantList.length == 0){
      this.openSnackBar("please select dealer name");
      return false;
    }
    
    else if(this.selectedMaterialDescList.length == 0){
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
      this.openSnackBar("please enter quantity");
      return false;
    }
    else if(this.quantity.trim().length > 4){
      this.openSnackBar("quantity length should be less than 4");
      return false;
    }
    else if(this.quantity.trim().includes(".")){
      this.openSnackBar("quantity should be non decimal number");
      return false;
    }
    return true;
  }

  materialDescAddedList = [];
  addItems(){
    if(!this.validateAddItems()){
      return ;
    }
    
   
    let v1 = CommonFunction.createCommaSeprateByParamDesc(this.selectedTerritoryCodeList);
    let v2 = CommonFunction.createCommaSeprateByParamDesc(this.selectedDealerCodeList);
    let v3 = CommonFunction.createCommaSeprateByParamDesc(this.selectedOrganizationList);
    let v4 = CommonFunction.createCommaSeprateByParamDesc(this.selectedDistributionChannelList);
    let comb = CommonFunction.createCommaSeprateByParamDesc(this.selectedMaterialDescList);
    let v6 = comb.split(" ~ ")[0];
    let v7 = comb.split(" ~ ")[1];
    let v5 = comb.split(" ~ ")[2];
    // let v6 = CommonFunction.createCommaSeprateByParamDesc(this.selectedMaterialDescList);
    // let v7 = CommonFunction.createCommaSeprateByParamDesc(this.selectedCatelogNumberList);
    // let v5 = CommonFunction.createCommaSeprateByParamDesc(this.selectedMaterialCodeList);
    // let v8 = CommonFunction.createCommaSeprateByParamDesc(this.selectedDivisionCodeList);
    let v9 = CommonFunction.createCommaSeprateByParamDesc(this.selectedDivisionNameList);
    let v10 = CommonFunction.createCommaSeprateByParamDesc(this.selectedPaymentTermList);
    let v11 = CommonFunction.createCommaSeprateByParamDesc(this.selectedDocumentTypeList);
    let v12 = CommonFunction.createCommaSeprateByParamDesc(this.selectedPlantList);

    let v66 = CommonFunction.createCommaSeprate(this.selectedMaterialDescList);
    this.materialDescAddedList.push(v66);

    // let materialType = "";
    // let paramCode = this.selectedMaterialDescList[0].paramCode;
    // for(let i=0;i<this.materialDescList.length;i++){
    //   let pc = this.materialDescList[i].paramCode;
    //   let mt = this.materialDescList[i].materialType;
    //   if(pc == paramCode){
    //     materialType = mt;
    //     break;
    //   }
    // }

    this.allAddItems = this.addItemsList;
    let addedItemLength = this.allAddItems.length + 1;

    let addItemJson = {
      srNo : addedItemLength,
      territoryCode : v1,
      dealerCode : v2,
      organization : v3,
      distributionChannel : v4,
      paymentTerm : v10.trim(),
      documentType : v11.trim(),
      plant : v12.trim(),
      materialCode : v5.trim(),
      materialDesc : v6.trim(),
      catelogNumber : v7.trim(),
      // materialType : materialType,
      // divisionCode : v8.trim(),
      divisionName : v9.trim(),
      quantity : this.quantity
    }

    this.allAddItems.push(addItemJson);
    this.addItemsList = [];
    setTimeout(() => {
      this.addItemsList = this.allAddItems;
      //console.log(JSON.stringify(this.addItemsList))
    }, 1);
    this.makeDefaultField();
    
  }

  makeDefaultField(){
    this.isDisabled = true;

    this.selectedMaterialDescList = [];

    this.catelogNumberListList = [];
    this.selectedCatelogNumberList = [];

    this.materialCodeList = [];
    this.selectedMaterialCodeList = [];
  
    this.divisionCodeList = [];
    this.selectedDivisionCodeList = [];

    this.quantity = "";
    //this.getProductDetails();
  }
  actionOnItem : number = 0;
  getOtherFieldData(){
    if(this.addItemsList.length == 0){
      this.openSnackBar("please add one item first.");
      return ;
    }
    // if(this.addItemsList.length == this.actionOnItem){
    //   this.openSnackBar("plese select document type, plant and payment terms.");
    //   return ;
    // }
    this.actionOnItem = this.addItemsList.length;
    this.loader = true;
    let terrCode = CommonFunction.createCommaSeprate(this.selectedTerritoryCodeList);
    let salesOrg =  CommonFunction.createCommaSeprate(this.selectedOrganizationList);
    let divisionCode = "";
    for(let i=0;i<this.addItemsList.length;i++){
      let dc = this.addItemsList[i].divisionCode;
      divisionCode += dc;
      if(i != this.addItemsList.length-1){
        divisionCode += ",";
      }
    }
    let jsonData = {
      territoryCode :terrCode,
      salesOrg : salesOrg,
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

  submitItems(submitType){
    // if(this.selectedDocumentTypeList.length == 0){
    //   this.openSnackBar("please select document type")
    //   return ;
    // }
    // else if(this.selectedPlantList.length == 0){
    //   this.openSnackBar("please select plant")
    //   return ;
    // }
    // else if(this.selectedPaymentTermList.length == 0){
    //   this.openSnackBar("please select payment term")
    //   return ;
    // }
    this.inProgress = true;
    let transactionId = new Date().getTime();
    let terrId = CommonFunction.createCommaSeprate(this.selectedTerritoryCodeList);
    let terrName = CommonFunction.createCommaSeprateByParamDesc(this.selectedTerritoryCodeList);
    let dealerCode = CommonFunction.createCommaSeprate(this.selectedDealerCodeList);
    let dealerName = CommonFunction.createCommaSeprateByParamDesc(this.selectedDealerCodeList);
    let diviName = CommonFunction.createCommaSeprate(this.selectedDivisionNameList);
    let orgId = CommonFunction.createCommaSeprate(this.selectedOrganizationList);
    let orgName = CommonFunction.createCommaSeprateByParamDesc(this.selectedOrganizationList);
    let distChannel = CommonFunction.createCommaSeprate(this.selectedDistributionChannelList);
    let distChannelDesc = CommonFunction.createCommaSeprateByParamDesc(this.selectedDistributionChannelList);
    let docType = CommonFunction.createCommaSeprate(this.selectedDocumentTypeList);
    let plant = CommonFunction.createCommaSeprate(this.selectedPlantList);
    let payTerm = CommonFunction.createCommaSeprate(this.selectedPaymentTermList);
    let bankName = CommonFunction.createCommaSeprate(this.selectedBankNameList);

    let jsonData = {
      transactionId : transactionId,
      empId : this.empId,
      territoryCode : terrId,
      territoryName : terrName,
      dealerCode : dealerCode,
      dealerName : dealerName,
      bankName : bankName,
      chequeNumber : this.chequeNumber,
      orgId : orgId,
      orgName : orgName,
      disttibutionChannel : distChannel,
      disttibutionChannelDesc : distChannelDesc,
      divisionName : diviName,
      documentType : docType,
      plant : plant,
      paymentTerm : payTerm,
      submitType : submitType,
      isNewTransaction : "Y",
      addItemsList : this.addItemsList
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
    this.isDisabled = false;
    this.selectedDistributionChannelList = [];
    this.divisionNameList = [];
    this.selectedDivisionNameList = [];
    this.dealerCodeList = [];
    this.selectedDealerCodeList = [];
    this.paymentTermList = [];
    this.selectedPaymentTermList = [];
    this.plantList = [];
    this.selectedPlantList = [];
    this.documentTypeList = [];
    this.selectedDocumentTypeList = [];

    this.materialDescList = [];
    this.selectedMaterialDescList = [];
    this.catelogNumberListList = [];
    this.selectedCatelogNumberList = [];
    this.materialCodeList = [];
    this.selectedMaterialCodeList = [];
    
    this.quantity = "";
    this.allAddItems = [];
    this.addItemsList = [];

    this.materialDescAddedList = [];
    this.selectedBankNameList = [];
    this.chequeNumber = "";
        
    this.docPlantPay = false;
    setTimeout(() => {
      this.openSnackBar("Now add new items");
    }, 2000);
    
  }

}

@Component({
  selector: 'delete-confirm-dialog',
  templateUrl: 'delete-confirm-dialog.html',
})
export class DeleteConfirmDialog {}
