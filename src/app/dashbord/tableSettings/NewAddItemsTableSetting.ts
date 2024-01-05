export class NewAddItemsTableSetting{
    public static setting = {
        mode: 'external',
        hideSubHeader: false,
        actions: {
          position: 'right',
          add: false,
          edit : false,
          delete : false,
          custom: [
            { name: 'deleteNewItemRecord', title: 'Delete' }
          ]
        },
        pager :{
          perPage : 10
        },
        columns: {
          id : {
            title : "Id",
            sortDirection : 'desc',
          },
          materialDesc : {
            title : "Material_Desc",
          },
          materialCode: {
            title: 'Material_Code'
          },
          catelogNumber: {
            title: 'Catelog_Number'
          },
          // divisionCode: {
          //   title: 'Division_Code'
          // },
          quantity: {
            title: 'Quantity'
          }
        }
    }
}