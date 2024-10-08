import React, { useState, useEffect } from 'react'
import dataApi from '../../../Api/DataApi'
import { Form } from '../../../component/export'
import { SalesSchema,saleItemFormSchema } from '../../../Schema/DataSchema'
import { Makeoptions } from '../../../utility/Makeoptions'
import { useDashContext } from '../../../Hooks/ContextDashboard'
import { useMemo } from 'react'
import { PartieRegister, ItemMaster } from '../../export'
import { SideShow } from '../../../component/export'
import { toast } from 'react-toastify';
import './saleEntry.css'
import {Table} from '../../../component/export'
import {MdDelete } from 'react-icons/md';
import {handleDeleteClick,utlityformFn} from '../../../utility/sharedUtils'

function SalesEntry() {
    const data = useDashContext()

    const partyName = useMemo(() => {
        console.log("Recomputing partyName options");
        return Makeoptions(data?.Data.parties || [], 'Name');
    }, [data.Data?.parties]);

    const itemName = useMemo(() => Makeoptions(data?.Data.items || [], 'itemName'), [data.Data]);

    // ref to main form formik obj
    const [FormikRef,SetFormikRef] = useState('');
         
    const [SaleType, SetSaleType] = useState(null);

    // sideshow mager state
    const [WhatToShow, SetWhatToShow] = useState("");
    
    // state for manuplating inputs
    const [inputs, SetInputs] = useState([]);

    const SaleTypeOption = [{ value: 'Cash', label: 'Cash' }, { value: 'Credit', label: 'Credit' }];

    const modeOfPaymentOptions = [{ value: 'Cash', label: 'Cash' }, { value: 'Online', label: 'Online' }];
    // Advance ammount collect feild input
    const AdvanceFeild = {
        inputType: 'normal',
        type: 'number',
        label: 'Advance',
        name: `Advance`,
    };

    const advanceField = SaleType === "Credit" ? AdvanceFeild : null;
    
    // default inputs 
    const initalnewInputs = [
        {
            inputType: 'normal',
            type: 'Date',
            label: 'Date',
            name: 'Date',
        },
        {
            inputType: 'normal',
            type: 'number',
            label: 'Bill.NO',
            name: 'BillNum',
        },
        {
            inputType: 'logicSelect',
            type: 'text',
            label: 'saleType',
            name: 'saleType',
            options: SaleTypeOption,
            onChange: (option, formik) => {
                formik.setFieldValue('saleType', option.value);
                SetSaleType(option.value);

            },
        },
        {
            inputType: SaleType === "Cash" ? 'normal' : 'select',
            type: 'text',
            label: 'partyName',
            name: 'partyName',
            options: partyName,
            addnewbtn: true,
            addnewFnc: (e) => {
                e.preventDefault();
                SetWhatToShow(e.target.name);
            },
        },
        // {
        //     inputType: 'logicNormal',
        //     type: 'Number',
        //     label: 'No of Items',
        //     name: 'totalItem',
        //     onChange: (e, formik) => {
        //         formik.handleChange(e);
        //         // will generate the fields after setting value in formik
        //         CreateObjectTemplet(e.target.value, formik);
        //     },
        // },
        {
            inputType: 'normal',
            type: 'text',
            label: 'total',
            name: 'total',
            readOnly: true,
        },
        {
            inputType: 'logicNormal',
            type: 'Number',
            label: 'discount',
            name: 'discount',
            onChange: (e, formik) => {
                formik.handleChange(e)
                console.log(formik.values.netPayable)
                formik.setFieldValue('netPayable', formik.values.total - e.target.value);
            }

        },
        {
            inputType: 'normal',
            type: 'text',
            label: 'netPayable',
            name: 'netPayable',
            readOnly: true,
        },
        {
            inputType: 'normal',
            type: 'number',
            label: 'Added item',
            name: 'Added_item',
            readOnly: true,
            addnewbtn: true,
            addBtnTxt:"add item",
            addnewFnc: (e) => {
                e.preventDefault();
                SetWhatToShow(e.target.name);
            },
        },
        advanceField
    ];

    // rendring inital feilds and deciding what kinf of  partyname and Advance feild based on saletype
    useEffect(() => {
        SetInputs([...initalnewInputs])
    }, [SaleType,FormikRef.values?.items]);

    // re rendring if new parites get added real time
    useEffect(() => {
        SetInputs([...initalnewInputs])
    }, [partyName])

    // inital values and data for form
    const lastDate = data?.Data?.extraData?.LastSaleDate ? data?.Data?.extraData?.LastSaleDate : ""

    const Formik = {
        initialValues: {
            partyName: "",
            saleType: "",
            items: [],
            total: 0, // Initialize as number
            netPayable: 0, // Initialize as number
            discount: 0,
            Date: lastDate ? lastDate : "",
            BillNum: "",
            totalItem: "",
            Advance: 0,
            Added_item:0

        },
        validationSchema: SalesSchema,
        extrafn: data.reloadFunction,
        onSubmit: () => {
            return dataApi.SalesEntry.bind(dataApi)
        },
        passFormikRef:true,
        SetFormikRef


    }

    const extra = {
        heading: 'SaleEntry',
        btnTitle: "Add"
    }
    const CreateObjectTemplet = (num, formik) => {
        if (num > 10 || !num) {
            return
        }
        // console.log("inside", formik.setFieldValue)
        // return
        formik?.setFieldValue("items", [])

        SetInputs(initalnewInputs)

        // initalize objects indie array in formik 
        const formikItem = []
        for (let i = 0; i < num; i++) {
            const objtopush = {
                itemName: "",
                currentStock: "",
                unit: "",
                Mrp: "",
                quantity: "",
            }
            formikItem.push(objtopush)
        }

        // dynaminc inuts extra items 
        const Mainarr = []
        for (let i = 0; i < num; i++) {
            const thePussingArr = [
                {
                    inputType: 'logicSelect',
                    type: 'text',
                    label: 'itemName',
                    name: `items[${i}].itemName`,
                    options: itemName,
                    index: i,
                    title: "itemName",
                    PropName: "items",
                    onChange: (option, formik) => {
                        console.log(option.value)

                        formik.setFieldValue(`items[${i}].itemName`, option.value)
                        const { unit, quantity, Mrp
                        } = data.Data.items.find((i) => {
                            return i.itemName === option.value
                        })

                        formik.setFieldValue(`items[${i}].unit`, unit)
                        formik.setFieldValue(`items[${i}].currentStock`, quantity)
                        formik.setFieldValue(`items[${i}].Mrp`, Mrp)
                    }
                },
                {
                    inputType: 'normal',
                    type: 'text',
                    label: 'unit',
                    name: `items[${i}].unit`,
                    readOnly: true,
                    index: i,
                    title: "unit",
                    PropName: "items",
                },
                {
                    inputType: 'normal',
                    type: 'number',
                    label: 'currentStock',
                    name: `items[${i}].currentStock`,
                    readOnly: true,
                    index: i,
                    title: "currentStock",
                    PropName: "items",
                },
                {
                    inputType: 'normal',
                    type: 'Number',
                    label: 'Mrp',
                    name: `items[${i}].Mrp`,
                    readOnly: true,
                    index: i,
                    title: "Mrp",
                    PropName: "items",
                }
                ,
                {
                    inputType: 'logicNormal',
                    type: 'Number',
                    label: 'quantity',
                    name: `items[${i}].quantity`,
                    onChange: (e, formik) => {
                        if (+e.target.value > formik.values.items[i].currentStock) {
                            toast.warn("cant`t sell more than current stock")
                            return
                        }
                        formik.handleChange(e)
                        let Rate = formik.values.items[i].Mrp;
                        let Lastquantity = formik.values.items[i].quantity
                        let CurrentAmount = formik.values.total
                        // console.log()

                        formik.setFieldValue("total", (Rate * +e.target.value) + CurrentAmount - (Rate * Lastquantity))
                        formik.setFieldValue('netPayable', (Rate * +e.target.value) + CurrentAmount - (Rate * Lastquantity));
                    },
                    index: i,
                    title: "quantity",
                    PropName: "items",
                }
            ]
            Mainarr.push(thePussingArr)
        }

        // settign all the states formik values and items 
        formik?.setFieldValue("items", formikItem)

        // checking if the advance feild should be included or not
        const advanceField = SaleType === "Credit" ? AdvanceFeild : null
        // setting the feilds 
        SetInputs((prev) => {
            return [
                ...prev,
                ...Mainarr,
                {
                    inputType: 'normal',
                    type: 'text',
                    label: 'total',
                    name: 'total',
                    readOnly: true,
                },
                {
                    inputType: 'logicNormal',
                    type: 'Number',
                    label: 'discount',
                    name: 'discount',
                    onChange: (e, formik) => {
                        formik.handleChange(e)
                        console.log(formik.values.netPayable)
                        formik.setFieldValue('netPayable', formik.values.total - e.target.value);
                    }

                },
                {
                    inputType: 'normal',
                    type: 'text',
                    label: 'netPayable',
                    name: 'netPayable',
                    readOnly: true
                },
                advanceField

            ]
        })


    }

    // <<<<<<<<<the item adding form data>>>>>>>>>>>>>
    // const utlityformFn = (values,formik)=>{
    //     console.log("lund hi chut hain",values,FormikRef.values.total)
    //     let lastItemsArrValue = FormikRef.values.items;
    //     let lastTotal = FormikRef.values.total;
    //     let currentTotal = values.Mrp*values.quantity
    //     let Lastnetpay = FormikRef.values.netPayable
    //     let lastItemCount = FormikRef.values.Added_item
    //     console.log('damnn',currentTotal,lastTotal)

    //     FormikRef.setFieldValue('items',[...lastItemsArrValue,{...values,index:lastItemsArrValue.length}])
    //     FormikRef.setFieldValue('total',lastTotal+currentTotal)
    //     FormikRef.setFieldValue('netPayable',Lastnetpay+currentTotal)
    //     FormikRef.setFieldValue('Added_item',lastItemCount+1)

    //     SetWhatToShow(false)
    //    }

    const ItemFormikData = {
        initialValues: {
            itemName:"",
            unit: "",
            currentStock: 0,
            Mrp: 0, // Initialize as number
            quantity: 0, // Initialize as number
        },
        validationSchema: saleItemFormSchema,
        isutlityform:true,
        utlityformFn:(values)=>{
            utlityformFn(values,FormikRef,{SetWhatToShow,type:"sale"})
        }
        
    }

    const ItemFormExtra = {
        heading: 'new item',
        btnTitle: "Add"
    }

    const ItemFormInputs =  [
        {
            inputType: 'logicSelect',
            type: 'text',
            label: 'Item Name',
            name: `itemName`,
            options: itemName,
            title: "itemName",
            PropName: "items",
            onChange: (option, formik) => {
                console.log(option.value)

                formik.setFieldValue(`itemName`, option.value)
                const { unit, quantity, Mrp
                } = data.Data.items.find((i) => {
                    return i.itemName === option.value
                })

                formik.setFieldValue(`unit`, unit)
                formik.setFieldValue(`currentStock`, quantity)
                formik.setFieldValue(`Mrp`, Mrp)
            }
        },
        {
            inputType: 'normal',
            type: 'text',
            label: 'unit',
            name: `unit`,
            readOnly: true,
            title: "unit",
            PropName: "items",
        },
        {
            inputType: 'normal',
            type: 'number',
            label: 'currentStock',
            name: `currentStock`,
            readOnly: true,
            title: "currentStock",
            PropName: "items",
        },
        {
            inputType: 'normal',
            type: 'Number',
            label: 'Mrp',
            name: `Mrp`,
            readOnly: true,
            title: "Mrp",
            PropName: "items",
        }
        ,
        {
            inputType: 'logicNormal',
            type: 'Number',
            label: 'quantity',
            name: `quantity`,
            onChange: (e, formik) => {
                if (+e.target.value > formik.values.currentStock) {
                    toast.warn("cant`t sell more than current stock")
                    return
                }
                formik.handleChange(e)
                let Rate = formik.values.Mrp;
                let Lastquantity = formik.values.quantity
                let CurrentAmount = formik.values.total

            },
            title: "quantity",
            PropName: "items",
        }
    ]

    // <<<<table data >>>>

    const columns = [
        {
            header: 'Name',
            accessorKey: 'itemName'
        },
        {
            header: 'unit',
            accessorKey: 'unit',
        },
        {
            header: 'currentStock',
            accessorKey: 'currentStock',
        },
        {
            header: 'Mrp',
            accessorKey: 'Mrp',
        },
        {
            header: 'quantity',
            accessorKey: 'quantity',
        },
        {
            header: 'Delete',
            cell: ({ row }) => {
                return (
                    <button onClick={() => handleDeleteClick(row.original.index,FormikRef,{type:'sale'})}>
                        <MdDelete />
                    </button>
                );
            }
        }
    ]
    const [pageNo, SetPageNo] = useState(1)
    const TableExtra = {
        pageNo,
        SetPageNo,
        heading: 'Added Items'
    }

    return (
        <div className="container">
        <div className="row">
          <div className="col-md-6 col-sm-3 low-wraper">
            <div className="sale-entry-form">
              <Form extra={extra} inputs={inputs} Formik={Formik} />
            </div>
            {WhatToShow && (
              <div className="sale-entry-partieR">
                <SideShow
                  whatName={"partyName"}
                  CMP1={<PartieRegister />}
                  CMP2={<Form extra={ItemFormExtra} inputs={ItemFormInputs} Formik={ItemFormikData} />}
                  WhatToShow={WhatToShow}
                  SetWhatToShow={SetWhatToShow}
                />
              </div>
            )}
          </div>
          <div className="col-md-6 col-sm-12 sale-item-table">
            <div className="sale-entry-table-cotnainer">
            <Table data={FormikRef.values?.items || []} columns={columns} extra={TableExtra} />
            </div>
          </div>
        </div>
      </div>
    )
}

export default SalesEntry
