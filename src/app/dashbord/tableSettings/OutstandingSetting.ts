export class OutstandingSetting{
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
          division: {
            title: 'DIVISION'
          },
          outstaAmount: {
            title: 'OUTSTA_AMOUNT'
          },
          notDue: {
            title: 'NOT_DUE'
          },
          z0_30: {
            title: 'Z0_30'
          },
          z31_60: {
            title: 'Z31_60'
          },
          z61_90: {
            title: 'Z61_90'
          },
          z91_180: {
            title: 'Z91_180'
          },
          z181_365: {
            title: 'Z181_365'
          },
          z366_Above : {
            title: 'Z366_Above'
          }
          // z366_730: {
          //   title: 'Z366_730'
          // },
          // z731_1095: {
          //   title: 'Z731_1095'
          // },
          // z1096_Above: {
          //   title: 'Z1096_ABOVE'
          // },
          // creditControlArea: {
          //   title: 'CREDIT_CONTROL_AREA'
          // },
          // profitCenter: {
          //   title: 'PROFIT_CENTER'
          // },
          // docType: {
          //   title: 'DOC_TYPE'
          // },
          // docNum: {
          //   title: 'DOC_NUM'
          // },
          // docDate: {
          //   title: 'DOC_DATE'
          // }
          
        }
    }
}