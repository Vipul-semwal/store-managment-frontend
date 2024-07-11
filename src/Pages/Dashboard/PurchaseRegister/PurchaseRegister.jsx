// import React, { useState } from 'react'
import Form from '../../../component/Global/Form/Form'
import dataApi from '../../../Api/DataApi'
import { Purchaseschema } from '../../../Schema/DataSchema'
import { useDashContext } from '../../../Hooks/ContextDashboard'
import { Makeoptions } from '../../../utility/Makeoptions'
import { useEffect, useMemo, useState } from 'react'
import { DateTime } from 'luxon';
import { PartieRegister, ItemMaster } from "../../export"
import { SideShow } from '../../../component/export'

function PurchaseRegister() {
    const data = useDashContext()

    // select options
    const partyName = useMemo(() => Makeoptions(data?.Data.parties || [], 'Name'), [data.Data.parties]);
    const itemName = useMemo(() => Makeoptions(data?.Data.items || [], 'itemName'), [data.Data.items]);
    const PurchaseType = [{ value: 'Cash', label: 'Cash' }, { value: 'Credit', label: 'Credit' }]

    // state for manageing what to show in the side 
    const [WhatToShow, SetWhatToShow] = useState("")

    // formik items state
    const lastDate = data?.Data?.extraData?.LastPurchaseDate ? data.Data?.extraData?.LastPurchaseDate : ""
    const [FormikItems, SetFormikItems] = useState({
        type: "",
        partyName: '',
        items: [],
        // mrp: 0,
        totalAmount: 0,
        Date: lastDate ? lastDate : "",
        BillNum: "",
        // EveryItemTotal: 0,
        totalItem: 0
    });

    // fromik values for form 
    const Formik = {
        initialValues: FormikItems,
        extrafn: data.reloadFunction,
        validationSchema: Purchaseschema,
        onSubmit: () => {
            return dataApi.PurchaseRegister.bind(dataApi)
        }


    }

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
                SetWhatToShow(e.target.name)
            }
        },
        {
            inputType: 'select',
            type: 'text',
            label: 'type',
            name: 'type',
            options: PurchaseType,
        },
        {
            inputType: 'logicNormal',
            type: 'Number',
            label: 'No of Items',
            name: 'totalItem',
            onChange: (e, formik) => {
                formik.handleChange(e)
                // will generate the feilds after setting value in formik
                CreateObjectTemplet(e.target.value, formik)
            }
        }
    ]
    // inputs for form 
    const [inputs, SetInputs] = useState([])

    // for setting inital inputs and updaing the option in party name and itamName
    useEffect(() => {
        console.log('running the effect agian')
        SetInputs((prev) => {
            if (prev.length > 5) {
                let restOftheArr = prev.slice(5)
                return [...initalnewInputs, ...restOftheArr]
            }
            else {
                return [...initalnewInputs]
            }
        })
    }, [partyName, itemName])


    // extra info for form
    const extra = {
        heading: 'PurchaseRegister',
        btnTitle: "Add"
    }

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


    }

    return (
        <div className='d-flex'>
            <div>
                <Form inputs={inputs} Formik={Formik} extra={extra} />
            </div>
            <SideShow whatName={"partyName"} CMP1={<PartieRegister />} CMP2={<ItemMaster />} WhatToShow={WhatToShow} SetWhatToShow={SetWhatToShow} />
        </div>
    )
}

export default PurchaseRegister
