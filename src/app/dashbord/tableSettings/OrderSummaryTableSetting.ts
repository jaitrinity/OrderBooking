export class OrderSummaryTableSetting{
    public static setting = {
        mode: 'external',
        hideSubHeader: false,
        actions: {
          position: 'right',
          add: false,
          edit : false,
          delete : false,
          custom: [
            { name: 'viewTransactionRecord', title: 'View'},
            { name: 'deleteTransactionRecord', title: 'Delete' }
          ]
        },
        pager :{
          perPage : 10
        },
        columns: {
        transactionId : {
            title : "Order_Id",
          },
          territoryCode: {
            title: 'Territory_Code'
          },
          territoryName: {
            title: 'Territory_Name'
          },
          dealerCode: {
            title: 'Dealer_Code'
          },
          dealerName: {
            title: 'Dealer_Name'
          },
          divisionName: {
            title: 'Division_Name'
          },
          distChannel: {
            title: 'Dist_Channel_Code'
          },
          distChannelDesc: {
            title: 'Dist_Channel_Name'
          },
          documentType: {
            title: 'Document_Type'
          },
          plant: {
            title: 'Plant'
          },
          paymentTerm: {
            title: 'Payment_Term'
          },
          // bankName: {
          //   title: 'Bank_Name'
          // },
          // chequeNumber: {
          //   title: 'Cheque_Number'
          // },
          salDoc: {
            title: 'Sal_Doc'
          },
          docDate: {
            title: 'Doc_Date'
          },
          netValue: {
            title: 'Net_value'
          },
          type: {
            title: 'Type'
          },
          createDate: {
            title: 'Create_Date'
          }
        }
    }
}