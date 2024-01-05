export class OrderBookingTableSetting{
    public static setting = {
        mode: 'external',
        hideSubHeader: false,
        actions: {
          columnTitle : "",
          position: 'right',
          add: false,
          edit : false,
          delete : true,
          // custom: [
          //   { name: 'editRecord', title: 'Edit'},
          //   { name: 'deleteRecord', title: 'Delete' }
          // ]
        },
        delete: {
          deleteButtonContent: 'Delete',
          mode: 'external'
        },
        pager :{
          perPage : 10
        },
        columns: {
          srNo : {
            title : "SR_No",
            sortDirection : 'desc',
          },
          // territoryCode: {
          //   title: 'Territory_Code'
          // },
          // dealerCode: {
          //   title: 'Dealer_Code'
          // },
          // organization: {
          //   title: 'Organization'
          // },
          // distributionChannel: {
          //   title: 'Distribution_Channel'
          // },
          // divisionName:{
          //   title : 'Division_Name'
          // },
          // paymentTerm:{
          //   title : 'Payment_Term'
          // },
          // documentType:{
          //   title : 'Document_Type'
          // },
          // plant:{
          //   title : 'Plant'
          // },
          materialDesc: {
            title: 'Material_Desc'
          },
          catelogNumber: {
            title: 'Catelog_Number'
          },
          materialCode: {
            title: 'Material_Code'
          },
          // materialType: {
          //   title: 'Material_Type'
          // },
          // divisionCode: {
          //   title: 'Division_Code'
          // },
          quantity: {
            title: 'Quantity'
          }
        }
    }
}