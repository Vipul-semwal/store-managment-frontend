import React from 'react'
import { Form } from '../../../component/export'
import dataApi from '../../../Api/DataApi'
import { UnitSchema } from '../../../Schema/DataSchema'
import { useDashContext } from '../../../Hooks/ContextDashboard'
import { useFilterSerch } from '../../../Hooks/GenralHook'
import { SuggestionBox } from '../../../component/export'
function Unit() {
  const data = useDashContext()
  const { findSame, Result } = useFilterSerch()
  // console.log('result', data.Data.Category[0].Name
  // )
  const Formik = {
    initialValues: {
      Name: '',

    },
    validationSchema: UnitSchema,
    extrafn: data?.reloadFunction,
    onSubmit: () => {
      return dataApi.CreateUnit.bind(dataApi)
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
        findSame(e.target.value, data?.Data.Unit || [])

      }
    }
  ]
  const extra = {
    heading: 'Add New Unit',
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
        {Result[0] === undefined ? null : <SuggestionBox Result={Result} title={"Alredy Existing Units"} />}
      </div>
    </div>
  )
}

export default Unit
