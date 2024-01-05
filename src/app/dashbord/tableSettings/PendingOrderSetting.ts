export class PendingOrderSetting{
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
          // dealerCode: {
          //   title: 'DEALER_CODE'
          // },
          // channelCode: {
          //   title: 'CHANNEL_CODE'
          // },
          // divisionCode: {
          //   title: 'DIVISION_CODE'
          // },
          // orderType: {
          //   title: 'ORDER_TYPE'
          // },
          // orderNumber: {
          //   title: 'ORDER_NUMBER'
          // },
          // orderDate: {
          //   title: 'ORDER_DATE'
          // },
          // plantCode: {
          //   title: 'PLANT_CODE'
          // },
          // productCode: {
          //   title: 'PRODUCT_CODE'
          // },
          // pendingQua: {
          //   title: 'PENDING_QUA'
          // },
          // pendingAmt: {
          //   title: 'PENDING_AMT'
          // },
          // orderValue: {
          //   title: 'ORDER_VALUE'
          // },
          // creditBlock: {
          //   title: 'CREDIT_BLOCK'
          // },
          // matNotAvail: {
          //   title: 'MAT_NOT_AVAIL'
          // },
          // relYetToProc: {
          //   title: 'REL_YET_TO_PROC'
          // },
          // reasonForPending: {
          //   title: 'REASON_FOR_PENDING'
          // },
          // creditControlArea: {
          //   title: 'CREDIT_CONTROL_AREA'
          // },
          // profitCenter: {
          //   title: 'PROFIT_CENTER'
          // }

          dealerCode: {
            title: 'DEALER_CODE'
          },
          dealerName: {
            title: 'DEALER_NAME'
          },
          materialCode: {
            title: 'MATERIAL_CODE'
          },
          materialDesc: {
            title: 'MATERIAL_DESC'
          },
          orderNo: {
            title: 'ORDER_NUMBER'
          },
          orderQty: {
            title: 'ORDER_QTY'
          },
          billedQty: {
            title: 'BILLED_QTY'
          },
          pendingQty: {
            title: 'PENDING_QTY'
          },
          pendingStatus: {
            title: 'PENDING_STATUS'
          }
        }
      };
}