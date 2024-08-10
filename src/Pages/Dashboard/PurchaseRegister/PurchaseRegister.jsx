// import React, { useState } from 'react'
import Form from '../../../component/Global/Form/Form'
import dataApi from '../../../Api/DataApi'
import { Purchaseschema,PurchaseitemSchemaForForm } from '../../../Schema/DataSchema'
import { useDashContext } from '../../../Hooks/ContextDashboard'
import { Makeoptions } from '../../../utility/Makeoptions'
import { useEffect, useMemo, useState } from 'react'
import { DateTime } from 'luxon';
import { PartieRegister, ItemMaster } from "../../export"
import { SideShow } from '../../../component/export'
import './Purchase.css'
import {Table} from '../../../component/export'
import {handleDeleteClick,utlityformFn} from '../../../utility/sharedUtils'
import {MdDelete } from 'react-icons/md';

function PurchaseRegister() {
    const data = useDashContext()

    // select options
    const partyName = useMemo(() => Makeoptions(data?.Data.parties || [], 'Name'), [data.Data.parties]);
    const itemName = useMemo(() => Makeoptions(data?.Data.items || [], 'itemName'), [data.Data.items]);
    const PurchaseType = [{ value: 'Cash', label: 'Cash' }, { value: 'Credit', label: 'Credit' }];

    // state for manageing what to show in the side 
    const [WhatToShow, SetWhatToShow] = useState("");
     // ref to main form formik obj
     const [FormikRef,SetFormikRef] = useState('');

    // formik items state
    const lastDate = data?.Data?.extraData?.LastPurchaseDate ? data.Data?.extraData?.LastPurchaseDate : "";

    const [FormikItems, SetFormikItems] = useState({
        type: "",
        partyName: '',
        items: [],
        // mrp: 0,
        totalAmount: 0,
        Date: lastDate ? lastDate : "",
        BillNum: "",
        // EveryItemTotal: 0,
        Added_item:""
    });

    // fromik values for form 
    const Formik = {
        initialValues: FormikItems,
        extrafn: data.reloadFunction,
        validationSchema: Purchaseschema,
        passFormikRef:true,
        SetFormikRef,
        onSubmit: () => {
            return dataApi.PurchaseRegister.bind(dataApi)
        }


    };

    const extra = {
        heading: 'Purchase Entry',
        btnTitle: "Add"
    };
    // initalinputs
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
            label: 'Bill NO',
            name: 'BillNum',
        },
        {
            inputType: 'select',
            type: 'text',
            label: 'partie Name',
            name: 'partyName',
            options: partyName,
            addnewbtn: true,
            addnewFnc: (e) => {
                e.preventDefault();
                SetWhatToShow('partieRegister')
            }
        },
        {
            inputType: 'select',
            type: 'text',
            label: 'type',
            name: 'type',
            options: PurchaseType,
        },
        // {
        //     inputType: 'logicNormal',
        //     type: 'Number',
        //     label: 'No of Items',
        //     name: 'totalItem',
        //     onChange: (e, formik) => {
        //         formik.handleChange(e)
        //         // will generate the feilds after setting value in formik
        //         CreateObjectTemplet(e.target.value, formik)
        //     }
        // },
        {
            inputType: 'normal',
            type: 'Number',
            label: 'total Amount',
            name: 'totalAmount',
            readOnly: true
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
                SetWhatToShow('itemForm');
            },
        },
    ];
    // inputs for form 
    const [inputs, SetInputs] = useState([]);

    // for setting inital inputs and updaing the option in party name and itamName
    useEffect(() => {
        console.log('running the effect agian')
        SetInputs(initalnewInputs)
    }, [partyName, itemName]);


    // function for generating dynamic feilds
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
                unit: "",
                quantity: "",
                rate: ""
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
                    label: 'item Name',
                    name: `items[${i}].itemName`,
                    options: itemName,
                    index: i,
                    title: "itemName",
                    PropName: "items",
                    onChange: (option, formik) => {
                        formik.setFieldValue(`items[${i}].itemName`, option.value)
                        const found = data.Data.items.find((i) => {
                            return i.itemName === option.value
                        }).unit

                        // console.log('found', formik.values.items)
                        formik.setFieldValue(`items[${i}].unit`, found)


                    },
                    addnewbtn: true,
                    addnewFnc: (e) => {
                        e.preventDefault();
                        SetWhatToShow(e.target.name)
                    }
                }
                ,
                {
                    inputType: 'normal',
                    type: 'text',
                    label: 'unit',
                    name: `items[${i}].unit`,
                    index: i,
                    title: "unit",
                    PropName: "items",
                    readOnly: true
                },
                {
                    inputType: 'logicNormal',
                    type: 'Number',
                    label: 'rate',
                    name: `items[${i}].rate`,
                    index: i,
                    title: "rate",
                    PropName: "items",
                    onChange: (e, formik) => {
                        formik.handleChange(e)
                        let LastRate = formik.values.items[i].rate;
                        let Lastquantity = formik.values.items[i].quantity
                        let CurrentAmount = formik.values.totalAmount

                        formik.setFieldValue("totalAmount", (+e.target.value * Lastquantity) + CurrentAmount - (LastRate * Lastquantity))

                    }
                },
                {
                    inputType: 'logicNormal',
                    type: 'Number',
                    label: 'quantity',
                    name: `items[${i}].quantity`,
                    index: i,
                    title: "quantity",
                    PropName: "items",
                    onChange: (e, formik) => {
                        formik.handleChange(e)
                        // getting all the last values
                        let LastRate = formik.values.items[i].rate;
                        let Lastquantity = formik.values.items[i].quantity
                        let CurrentAmount = formik.values.totalAmount
                        console.log("last value", LastRate, Lastquantity, CurrentAmount)

                        formik.setFieldValue("totalAmount", (LastRate * +e.target.value) + CurrentAmount - (LastRate * Lastquantity))
                    }
                },
            ]
            Mainarr.push(thePussingArr)
        }

        // settign all the states formik values and items 
        formik?.setFieldValue("items", formikItem)
        // setting the feilds 
        SetInputs((prev) => {
            return [
                ...prev,
                ...Mainarr,
                {
                    inputType: 'normal',
                    type: 'Number',
                    label: 'total Amount',
                    name: 'totalAmount',
                    readOnly: true
                },
            ]
        })


    };
    // <<<<Iteam form data>>>>
    const ItemFormikData = {
        initialValues: {
            itemName:"",
            unit: "",
            rate: 0, // Initialize as number
            quantity: 0, // Initialize as number
        },
        validationSchema: PurchaseitemSchemaForForm,
        isutlityform:true,
        utlityformFn:(values)=>{
            utlityformFn(values,FormikRef,{SetWhatToShow,type:"purchase"})
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
            onChange: (option, formik) => {
                console.log(option.value)

                formik.setFieldValue(`itemName`, option.value)
                const { unit
                } = data.Data.items.find((i) => {
                    return i.itemName === option.value
                })

                formik.setFieldValue(`unit`, unit)
            }
        },
        {
            inputType: 'normal',
            type: 'text',
            label: 'unit',
            name: `unit`,
            readOnly: true,
        },
        {
            inputType: 'normal',
            type: 'Number',
            label: 'Rate',
            name: `rate`,
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
                let Rate = formik.values.Rate;
                let Lastquantity = formik.values.quantity
                let CurrentAmount = formik.values.total

            },
            title: "quantity",
            PropName: "items",
        }
    ]

    // <<<<Table Data>>>>
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
            header: 'rate',
            accessorKey: 'rate',
        },
        {
            header: 'quantity',
            accessorKey: 'quantity',
        },
        {
            header: 'Delete',
            cell: ({ row }) => {
                return (
                    <button onClick={() => handleDeleteClick(row.original.index,FormikRef,{type:"purchase"})}>
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


     //   sideShow logic
     const SideShowArr = [
        {name:'partieRegister',CMP:<PartieRegister />},
        {name:'item',CMP:<ItemMaster />},
        {name:'itemForm',CMP:<Form extra={ItemFormExtra} inputs={ItemFormInputs} Formik={ItemFormikData} />}
    ];
    return (
       <div className="container">
        <div className="row">
            <div className="col-md-6 col-sm-12">
            <div className='purchase-form-container'>
            <div className='purchase-form'>
                <Form inputs={inputs} Formik={Formik} extra={extra} />
            </div>
          <div className="purchas-side-show1">
          <SideShow whatName={"partyName"} CMP1={<PartieRegister />} CMP2={<ItemMaster />} WhatToShow={WhatToShow} SetWhatToShow={SetWhatToShow} SideShowArr={SideShowArr}/>
          </div>
             </div>
            </div>
            <div className="col-md-6 col-sm-12">
          <div className="table-container-purchase">
          <Table data={FormikRef.values?.items || []} columns={columns} extra={TableExtra} />
          </div>
            </div>
        </div>
       </div>
    )
}

export default PurchaseRegister
