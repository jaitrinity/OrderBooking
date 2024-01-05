export class AddedItemsTableSettings{
    public static setting = {
        mode: 'external',
        hideSubHeader: false,
        actions: {
          position: 'right',
          add: false,
          edit : false,
          delete : false,
          custom: [
            { name: 'editItemRecord', title: 'Edit'},
            { name: 'deleteItemRecord', title: 'Delete' }
          ]
        },
        pager :{
          perPage : 10
        },
        columns: {
          id : {
            title : "Id",
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
          materialType: {
            title: 'Material_Type'
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