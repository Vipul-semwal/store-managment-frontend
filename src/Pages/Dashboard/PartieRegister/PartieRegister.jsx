import React from 'react'
import { Form } from '../../../component/export'
import dataApi from '../../../Api/DataApi'
import { PartiesSchema } from '../../../Schema/DataSchema'
import { useDashContext } from '../../../Hooks/ContextDashboard'
import { useLocation } from 'react-router-dom'
import find from '../../../utility/find'



function PartieRegister() {
    const data = useDashContext();

    // all the lgoic for update item query 
    const params = new URLSearchParams(useLocation().search)
    const id = params.get("id")
    const DataForUpdate = find(id, data?.Data?.parties)
    console.log("parasm", DataForUpdate)

    const Formik = {
        initialValues: {
            Name: id && DataForUpdate ? DataForUpdate.Name : "",
            type: id && DataForUpdate ? DataForUpdate.type : "",
            contactNo: id && DataForUpdate ? DataForUpdate.contactNo : "",
            Address: id && DataForUpdate ? DataForUpdate.Address : "",
            id: id ? id : null
        },
        validationSchema: PartiesSchema,
        extrafn: data.reloadFunction,
        onSubmit: () => {
            return !id ? dataApi.PartieRegister.bind(dataApi) : dataApi.UpdatePartie.bind(dataApi)
        }


    }
    const options = [
        { value: 'Buyer', label: 'Buyer' },
        { value: 'Supplier', label: 'Supplier' },
    ]
    const inputs = [
        {
            inputType: 'normal',
            type: 'text',
            label: 'Name',
            name: 'Name',
            readOnly: id && DataForUpdate ? true : false
        },
        {
            inputType: 'select',
            type: 'text',
            label: 'Type',
            name: 'type',
            options: options
        }
        ,
        {
            inputType: 'normal',
            type: 'text',
            label: 'contactNo',
            name: 'contactNo',
        },
        {
            inputType: 'normal',
            type: 'text',
            label: 'Address',
            name: 'Address',
        },
    ]

    const extra = {
        heading: id ? "Update Partie" : 'Add Partie',
        btnTitle: "Add",
    }
    return (
        <Form Formik={Formik} inputs={inputs} extra={extra} />
    )
}

export default PartieRegister
