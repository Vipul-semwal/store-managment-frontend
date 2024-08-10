const handleDeleteClick = (index,formik,extraObj)=>{
      let type = extraObj.type
      const findindx = formik.values.items.findIndex(obj => obj.index === index)
     let updatedArr = Dltfrom(findindx,formik.values.items)
     let currentTotal =  type === "sale" ?formik.values.items[findindx].Mrp*formik.values.items[findindx].quantity:formik.values.items[findindx].rate*formik.values.items[findindx].quantity;
     let lastTotal = type === "sale"? formik.values.total:formik.values.totalAmount;
     let lastItemCount = formik.values.Added_item;
     console.log('lastitemcount:',lastItemCount)
     


     formik.setFieldValue('items',updatedArr);
     formik.setFieldValue(`${ type === "sale"? "total":"totalAmount"}`,lastTotal-currentTotal);
     formik.setFieldValue('Added_item',lastItemCount-1);
     type === "sale"? formik.setFieldValue('netPayable',0):null;
     type === "sale"? formik.setFieldValue(' discount',0):null;

    //  removing specific item from array
     function Dltfrom(index, arr) {
         if(arr.length === 1){
             return []
         }
         return [...arr.slice(0, index), ...arr.slice(index + 1, arr.length)];
       }
 }


 const utlityformFn = (values,formik,extraObj)=>{
    // console.log("",values,formik.values.total)
    let type = extraObj.type
    let lastItemsArrValue = formik.values.items;
    let lastTotal = type === "sale"? formik.values.total:formik.values.totalAmount;
    let currentTotal = type === "sale"?  values.Mrp*values.quantity:values.rate*values.quantity;
    let Lastnetpay =type === "sale"? formik.values.netPayable:null;
    let lastItemCount = formik.values.Added_item;
    console.log('damnn',lastItemCount+1)
    
    // merging last and new values of item
    formik.setFieldValue('items',[...lastItemsArrValue,{...values,index:lastItemsArrValue.length}]);
    formik.setFieldValue(`${ type === "sale"? "total":"totalAmount"}`,lastTotal+currentTotal);
    type === "sale"? formik.setFieldValue('netPayable',Lastnetpay+currentTotal):null;
    formik.setFieldValue('Added_item',+lastItemCount+1);

    extraObj.SetWhatToShow(false)
   }


 export  {handleDeleteClick,utlityformFn}