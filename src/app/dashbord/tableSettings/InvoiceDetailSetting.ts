export class InvoiceDetailSetting {
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
          documentType: {
            title: 'DOCUMENT_TYPE'
          },
          invDate: {
            title: 'INV_DATE'
          },
          material: {
            title: 'MATERIAL'
          },
          matDesc: {
            title: 'MAT_DESC'
          },
          materialGrp2: {
            title: 'MATERIAL_GRP2'
          },
          provg: {
            title: 'PROVG'
          },
          prdCatText: {
            title: 'PRD_CAT_TEXT'
          },
          invQty: {
            title: 'INV_QTY'
          },
          netAmount: {
            title: 'NET_AMOUNT'
          },
          bilValue: {
            title: 'BILL_VALUE'
          },
          distChnl: {
            title: 'DIST_CHNL'
          },
          division: {
            title: 'DIVISION'
          },
          employee: {
            title: 'EMPLOYEE'
          },
          employeeName: {
            title: 'EMPLOYEE_NAME'
          },
          empEmailId: {
            title: 'EMP_MAIL_ID'
          },
          territoryCode: {
            title: 'TERRITORY_CODE'
          },
          territoryName: {
            title: 'TERRITORY_NAME'
          },
          orderNo: {
            title: 'ORDER_NO'
          },
          invoiceCopy: {
            title: 'INVOICE_COPY'
          },
          creditControlArea: {
            title: 'CREDIT_CONTROL_AREA'
          },
          profitCenter: {
            title: 'PROFIT_CENTER'
          }
        }
      };
}

