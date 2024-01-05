export class NonVisitedDealerSetting{
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
          dealerClass: {
            title: 'DEALER_CLASS'
          },
          ytdSale: {
            title: 'YTD_SALE'
          },
          lastVisitDate: {
            title: 'LAST_VISIT_DATE'
          }
          
        }
    }
}