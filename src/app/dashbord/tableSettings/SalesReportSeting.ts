export class SalesReportSetting{
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
          invDoc: {
            title: 'INV_DOC'
          },
          billingDate: {
            title: 'BILLING_DATE'
          },
          billingType: {
            title: 'BILLING_TYPE'
          },
          material: {
            title: 'MATERIAL'
          },
          distributionChannel: {
            title: 'DISTRIBUTION_CHANNEL'
          },
          division: {
            title: 'DIVISION'
          },
          materialDiscription: {
            title: 'MATERIAL_DISCRIPTION'
          },
          quantity: {
            title: 'QUANTITY'
          },
          invoiceValue: {
            title: 'INVOICE_VALUE'
          },
          employee: {
            title: 'EMPLOYEE'
          },
          employeeName: {
            title: 'EMPLOYEE_NAME'
          },
          creditControlArea: {
            title: 'CREDIT_CONTROL_AREA'
          },
          profitCenter: {
            title: 'PROFIT_CENTER'
          },
          provg: {
            title: 'PROVG'
          },
          prdCatText: {
            title: 'PRD_CAT_TEXT'
          },
          materialGrp2: {
            title: 'MATERIAL_GRP2'
          },
          materialGrp2Text: {
            title: 'MATERIAL_GRP2_TEXT'
          }
        }

    }
}