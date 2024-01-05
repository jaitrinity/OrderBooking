export class OverdueInvoiceSetting {
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
          divisionCode: {
            title: 'DIVISION_CODE'
          },
          crdtCtrlArea: {
            title: 'CRDT_CTRL_AREA'
          },
          invoiceNumber: {
            title: 'INVOICE_NUMBER'
          },
          invoiceDate: {
            title: 'INVOICE_DATE'
          },
          invoiceAmount: {
            title: 'INVOICE_AMOUNT'
          },
          dueAmt7Days: {
            title: 'DUE_AMT_7DAYS'
          },
          totalOs: {
            title: 'TOTAL_OS'
          },
          dueDate: {
            title: 'DUE_DATE'
          },
          remarks: {
            title: 'REMARKS'
          },
          paymentTerms: {
            title: 'PAYMENT_TERMS'
          },
          profitCenter: {
            title: 'PROFIT_CENTER'
          },
        }
      };
}

