export class BillOrderSetting{
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
          channelCode: {
            title: 'CHANNEL_CODE'
          },
          division: {
            title: 'DIVISION'
          },
          orderNumber: {
            title: 'ORDER_NUMBER'
          },
          orderType: {
            title: 'ORDER_TYPE'
          },
          orderDate: {
            title: 'ORDER_DATE'
          },
          orderNexf: {
            title: 'ORDER_NEXF'
          },
          billNo: {
            title: 'BILL_NO'
          },
          billedValue: {
            title: 'BILLED_VALUE'
          },
          orderQty: {
            title: 'ORDER_QTY'
          },
          billedQty: {
            title: 'BILLED_QTY'
          },
          creditControlArea: {
            title: 'CREDIT_CONTROL_AREA'
          },
          profitCenter: {
            title: 'PROFIT_CENTER'
          },
          territory: {
            title: 'TERRITORY'
          }
        }
    }
}