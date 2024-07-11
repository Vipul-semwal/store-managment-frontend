import React from 'react'
import './Category.css'
import { Form } from '../../../component/export'
import dataApi from '../../../Api/DataApi'
import { CategorySchmema } from '../../../Schema/DataSchema'
import { useDashContext } from '../../../Hooks/ContextDashboard'
import { useFilterSerch } from '../../../Hooks/GenralHook'
import { SuggestionBox } from '../../../component/export'

function Category() {
    const data = useDashContext()
    const { findSame, Result } = useFilterSerch()
    // console.log('result', data.Data.Category[0].Name
    // )
    const Formik = {
        initialValues: {
            Name: '',

        },
        validationSchema: CategorySchmema,
        extrafn: data.reloadFunction,
        onSubmit: () => {
            return dataApi.CreateCategory.bind(dataApi)
        }


    }
    const inputs = [
        {
            inputType: 'logicNormal',
            type: 'text',
            label: 'Name',
            name: "Name",
            onChange: (e, formik) => {
                formik.handleChange(e)
                findSame(e.target.value, data?.Data.Category || [])

            }
        }
    ]
    const extra = {
        heading: 'Create New Category',
        btnTitle: "Add"
    }

    console.log(data.Data.Category)
    return (
        <div className='d-flex'>
            <Form Formik={Formik} inputs={inputs} extra={extra} />
            {/* <div className='mx-3 mt-3'>
                {Result.map((i, index) => {
                    return (
                        <p key={index}>{i}</p>
                    )
                })}
            </div> */}
            <div>
                {Result[0] === undefined ? null : <SuggestionBox Result={Result} title={"Alredy Existing Category"} />}
            </div>
        </div>
    )
}

export default Category
