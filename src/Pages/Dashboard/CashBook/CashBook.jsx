import React, { useEffect, useState } from 'react'
import { Form } from '../../../component/export'
import dataApi from '../../../Api/DataApi'
import { CashBookSchmema, intialAmountSchema } from '../../../Schema/DataSchema'
import { useDashContext } from '../../../Hooks/ContextDashboard'
import { toast } from 'react-toastify'
function CashBook() {
    const data = useDashContext();

    // if user's cashbook is not made or empty for that inital ammount data
    const FormikInital = {
        initialValues: {
            intialAmount: ""
        },
        validationSchema: intialAmountSchema,
        extrafn: data.reloadFunction,
        onSubmit: () => {
            return dataApi.intialCashAmmount.bind(dataApi)
        }


    }
    const inputsIntial = [{
        inputType: 'normal',
        type: 'number',
        label: ' Ammount',
        name: 'intialAmount',
    }]
    const extraInital = {
        heading: 'Initial Ammount',
        btnTitle: "Add"
    }

    //<--------- normal cashbook data----->

    // form data
    const ReceiptTypeoptions = [
        { value: 'receive', label: 'receive' },
        { value: 'paid', label: 'paid' },
    ]
    const CashPayCategory = [
        { value: 'Cash Purchase', label: 'Cash Purchase' },
        { value: 'Suplier', label: 'Suplier' },
        { value: 'Expense', label: 'Expense' },
        { value: 'Saving', label: 'Saving' },
        { Value: 'Salary', label: 'Salary' },
        { Value: 'Co Owner', label: 'Co Owner' }
    ]
    const CashRecCategory = [
        { value: 'Sale', label: 'Sale' },
        { value: 'Saving', label: 'Saving' },
        { value: 'Co Owner', label: 'Co Owner' },
    ]

    // inital inputs and othe to create form
    const lastDate = data?.Data?.extraData?.LastCashBookDate ? data?.Data?.extraData?.LastCashBookDate : ""
    const Formik = {
        initialValues: {
            Date: lastDate ? lastDate : "",
            ReceiptType: "",
            category: "",
            Ammount: "",
            RefBillNo: 0,
            Discription: "",
            PendingAmmount: 0
        },
        validationSchema: CashBookSchmema,
        extrafn: data.reloadFunction,
        onSubmit: () => {
            return dataApi.Cashbook.bind(dataApi)
        }


    }
    const [inputs, Setinputs] = useState([])

    const extra = {
        heading: 'Cash Book',
        btnTitle: "Add"
    }

    // Manuplating the inputs
    const [RecType, SetRecType] = useState('')
    const [Sale, SetSale] = useState(false)
    const [PendingAmmount, SetPendingAmmount] = useState(0)
    const GetBillData = async (data) => {
        const result = await dataApi.BillNoData(data)
        if (result === null) {
            toast.error('something went wrong')
            return 0
        }
        if (result?.data?.success === true) {
            return result.data.data
        }
        else {
            toast.error(result?.data?.message)
            return 0
        }
    }

    useEffect(() => {
        console.log('render again:', RecType)
        const Initalinputs = [
            {
                inputType: 'normal',
                type: 'Date',
                label: 'Date',
                name: 'Date',
            }
            ,
            {
                inputType: 'logicselect',
                type: 'text',
                label: 'Receipt Type',
                name: 'ReceiptType',
                options: ReceiptTypeoptions,
                onChange: (option, formik) => {
                    formik.setFieldValue(`category`, "")
                    // if sale was set to true like user changed everthing in between
                    SetSale(false)
                    formik.setFieldValue(`ReceiptType`, option.value)
                    SetRecType(option.value)
                }
            },
            RecType ? {
                inputType: 'logicselect',
                type: 'text',
                label: 'Category',
                name: 'category',
                options: RecType === "paid" ? CashPayCategory : CashRecCategory,
                onChange: (option, formik) => {
                    formik.setFieldValue(`category`, option.value)
                    SetSale(false)
                    if (option.value === "Sale") {
                        console.log('showing the data')
                        SetSale(true)
                    }
                }
            } : null
            ,
            Sale ? {
                inputType: 'logicNormal',
                type: 'Number',
                label: 'Ref Bill No',
                name: 'RefBillNo',
                onChange: async (e, formik) => {
                    if (e.target.value.length > 10) {
                        return
                    }
                    formik.setFieldValue("PendingAmmount", "")
                    formik.handleChange(e)
                    if (e.target.value.length == 10) {
                        // console.log('chalra hain', GetBillData(e.target.value))
                        formik.setFieldValue('PendingAmmount', await GetBillData(e.target.value))

                    }

                }
            } : null
            ,
            Sale ? {
                inputType: 'normal',
                type: 'Number',
                label: 'Pending Ammount',
                name: 'PendingAmmount',
                readOnly: true
            } : null
            ,

            {
                inputType: 'normal',
                type: 'text',
                label: `Ammount ${RecType === "paid" ? "Paid" : "Rec"}`,
                name: 'Ammount',
            },
            {
                inputType: 'normal',
                type: 'text',
                label: 'Shot Discription',
                name: 'Discription',
            },
        ]
        Setinputs(Initalinputs)
    }, [RecType, Sale])


    if (data.Data.CashBook) {
        return (
            <Form Formik={Formik} inputs={inputs} extra={extra} />
        )
    }
    else {
        return (
            <Form Formik={FormikInital} inputs={inputsIntial} extra={extraInital} />
        )
    }

}

export default CashBook
