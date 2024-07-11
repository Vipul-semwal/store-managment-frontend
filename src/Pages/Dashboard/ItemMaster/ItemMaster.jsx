import React from 'react'
import { Form } from '../../../component/export'
import './ItemMaster.css'
import dataApi from '../../../Api/DataApi'
import { ItemMasterSchema } from '../../../Schema/DataSchema'
import { useDashContext } from '../../../Hooks/ContextDashboard'
import { Makeoptions } from '../../../utility/Makeoptions'
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import find from '../../../utility/find'

function ItemMaster() {
    const data = useDashContext()

    // all the lgoic for update item query 
    const params = new URLSearchParams(useLocation().search)
    const id = params.get("id")
    const DataForUpdate = find(id, data?.Data?.items)
    console.log("parasm", DataForUpdate)

    const CategoryOptions = useMemo(() => Makeoptions(data?.Data.Category || [], 'Name'), [data.Data.Category]);
    const UnitOptions = useMemo(() => Makeoptions(data?.Data.Unit || [], 'Name'), [data.Data.Unit]);

    const Formik = {
        initialValues: {
            itemName: id && DataForUpdate ? DataForUpdate.itemName : "",
            Mrp: id && DataForUpdate ? DataForUpdate.Mrp : "",
            unit: id && DataForUpdate ? DataForUpdate.unit : '',
            id: id ? id : null,
            category: id && DataForUpdate ? DataForUpdate.category : ""
        },
        validationSchema: ItemMasterSchema,
        extrafn: data.reloadFunction,
        onSubmit: () => {
            return !id ? dataApi.ItemMaster.bind(dataApi) : dataApi.UpdateItem.bind(dataApi)
        }


    }
    const options = [
        { value: 'Exterior Accessories', label: 'Exterior Accessories' },
        { value: 'interior', label: 'interior' },
        { value: 'performance', label: 'performance' }
    ]
    const inputs = [
        {
            inputType: 'normal',
            type: 'text',
            label: 'Name',
            name: 'itemName',
            readOnly: id && DataForUpdate ? true : false
        },
        {
            inputType: 'select',
            type: 'text',
            label: 'unit',
            name: 'unit',
            options: UnitOptions,
            initvalue: { value: DataForUpdate?.unit, label: DataForUpdate?.unit }
        },
        {
            inputType: 'select',
            type: 'text',
            label: 'category',
            name: 'category',
            options: CategoryOptions
        },
        {
            inputType: 'normal',
            type: 'Number',
            label: 'MRP',
            name: 'Mrp',
        },
        !id ? {
            inputType: 'normal',
            type: 'text',
            label: 'init stock',
            name: 'quantity',
        } : null
    ]

    const extra = {
        heading: 'Item Master',
        btnTitle: "Add"
    }
    return (
        <Form Formik={Formik} inputs={inputs} extra={extra} />
    )
}

export default ItemMaster
