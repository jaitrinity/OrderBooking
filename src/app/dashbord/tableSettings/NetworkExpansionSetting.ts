export class NetworkExpansionSetting{
    public static setting = {
        mode: 'external',
        hideSubHeader: false,
        actions: {
          position: 'right',
          add: false,
          edit : false,
          delete : false
        },
        pager :{
          perPage : 10
        },
        columns: {
          dealerCode: {
            title: 'DEALER_CODE'
          },
          dealerName: {
            title: 'DEALER_NAME'
          },
          noOfBilling: {
            title: 'NO_OF_BILLING'
          },
          ytdBillingValue: {
            title: 'YTD_BILLING_VALUE'
          }
          
        }
    }
}