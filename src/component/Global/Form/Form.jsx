import React from 'react'
import './Form.css'
import Select from 'react-select'
import { useFormik } from 'formik';
import { Button } from '../../export';
import useformreq from '../../../Hooks/useformreq';
import FormError from '../../../Error/FormError';
import NestendValueError from '../../../Error/NestendValueError';
import { useState } from 'react';
import { array } from 'yup';


function Form({ inputs, extra, Formik }) {
    // console.log('seeformk', Formik.initialValues.items);
    // console.log('input', inputs, "values", Formik.initialValues.items);

    const { loading, makeRequest } = useformreq()
    const [Reload, SetReload] = useState(false)

    const formik = useFormik({
        initialValues: Formik.initialValues,
        validationSchema: Formik.validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            // console.log('fromikjsx', Formik.extrafn)
            console.log('value', values)
            makeRequest(Formik.onSubmit(), Formik.Redirect, values, Formik.extrafn)
        }

    })

    const errorStyle = { color: 'red', fontSize: '13px', }

    return (
        <div className="card data-collection">
            <div className="card-header">
                <div className="text-header">{extra.heading}</div>
            </div>
            <div className="card-body">
                <form action="#">
                    {inputs.map((i, index) => {
                        if (!i) {
                            return
                        }
                        {/* for if something is repeted and in group */ }
                        if (Array.isArray(i)) {
                            console.log('index:', i)
                            return (
                                <div className='items-gropus' key={index}>
                                    <h5 className='text-center'>{`Item:${i[0].index + 1}`}</h5>

                                    {
                                        i.map((i, index) => {
                                            {/* console.log('inside array', i) */ }
                                            const name = i.name;

                                            return (

                                                i.inputType === "normal" ? (
                                                    <div className="form-group mb-2" key={index}>
                                                        <label htmlFor={i.name}>{i.label}</label>
                                                        <input
                                                            className="form-control"
                                                            type={i.type}
                                                            name={i.name}
                                                            onBlur={formik.handleBlur}
                                                            onChange={formik.handleChange}
                                                            value={formik.values[i.PropName][[i.index]][i.title]}
                                                            readOnly={i.readOnly}
                                                        />
                                                        <NestendValueError
                                                            formik={formik}
                                                            propName={i.PropName}
                                                            index={i.index}
                                                            title={i.title}
                                                            errorStyle={errorStyle}

                                                        />
                                                    </div>
                                                ) : i.inputType === "select" ? (
                                                    <div className={`form-group ${i.addnewbtn ? "mb-0" : ""}`} key={index}>
                                                        <label htmlFor={i.name}>{i.label}</label>
                                                        <Select
                                                            options={i.options}
                                                            name={i.name}
                                                            onChange={(option) => formik.setFieldValue(name, option.value)}
                                                            onBlur={formik.handleBlur}
                                                            value={i.options.find((option) => option.value === formik.values[name])}
                                                        />
                                                        {i.addnewbtn && <div className='addnewbtndiv'><button className='addnewbtn mt-2' name={i.name} onClick={i.addnewFnc}>add new</button></div>}
                                                        <NestendValueError
                                                            formik={formik}
                                                            propName={i.PropName}
                                                            index={i.index}
                                                            title={i.title}
                                                            errorStyle={errorStyle}

                                                        />
                                                    </div>
                                                ) : i.inputType === 'logicNormal' ? (
                                                    <div className="form-group" key={index}>
                                                        <label htmlFor={i.name}>{i.label}</label>
                                                        <input
                                                            className="form-control"
                                                            type={i.type}
                                                            name={i.name}
                                                            value={formik.values[i.PropName][[i.index]][i.title]}
                                                            readOnly={i.readOnly}
                                                            onChange={(e) => {
                                                                i.onChange(e, formik)
                                                            }}
                                                            onBlur={formik.handleBlur}
                                                        />
                                                        <NestendValueError
                                                            formik={formik}
                                                            propName={i.PropName}
                                                            index={i.index}
                                                            title={i.title}
                                                            errorStyle={errorStyle}

                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="form-group" key={index}>
                                                        <label htmlFor={i.name}>{i.label}</label>
                                                        <Select
                                                            options={i.options}
                                                            name={i.name}
                                                            onChange={(option) => {
                                                                i.onChange(option, formik)
                                                            }}
                                                            onBlur={formik.handleBlur}
                                                            value={i.options.find((option) => option.value === formik.values[name])}
                                                        />
                                                        {i.addnewbtn && <div className='addnewbtndiv'><button className='addnewbtn mt-2' name={i.name} onClick={i.addnewFnc}>add new</button></div>}
                                                        <NestendValueError
                                                            formik={formik}
                                                            propName={i.PropName}
                                                            index={i.index}
                                                            title={i.title}
                                                            errorStyle={errorStyle}

                                                        />
                                                    </div>
                                                )
                                            );
                                        })
                                    }
                                </div>
                            )

                        }
                        else {
                            {/* normal inputs elemtns logic here */ }
                            const name = i.name;
                            return (

                                i.inputType === "normal" ? (
                                    <div className="form-group" key={index}>
                                        <label htmlFor={i.name}>{i.label}</label>
                                        <input
                                            className="form-control"
                                            type={i.type}
                                            name={i.name}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values[name]}
                                            readOnly={i.readOnly}
                                        />
                                        {formik.errors[i.name] && formik.touched[i.name] ? (
                                            <FormError message={formik.errors[i.name]} style={errorStyle} />
                                        ) : null}
                                    </div>
                                ) : i.inputType === "select" ? (
                                    <div className={`form-group ${i.addnewbtn ? "mb-0" : ""}`} key={index}>
                                        <label htmlFor={i.name}>{i.label}</label>
                                        <Select
                                            options={i.options}
                                            name={i.name}
                                            onChange={(option) => formik.setFieldValue(name, option.value)}
                                            onBlur={formik.handleBlur}
                                            value={{ value: formik.values[name], label: formik.values[name] }}
                                        />
                                        {i.addnewbtn && <div className='addnewbtndiv'><button className='addnewbtn mt-2' name={i.name} onClick={i.addnewFnc}>add new</button></div>}
                                        {
                                            formik.errors[i.name] && formik.touched[i.name] ? (
                                                <FormError message={formik.errors[i.name]} style={errorStyle} />
                                            ) : null
                                        }
                                    </div>
                                ) : i.inputType === 'logicNormal' ? (
                                    <div className="form-group" key={index}>
                                        <label htmlFor={i.name}>{i.label}</label>
                                        <input
                                            className="form-control"
                                            type={i.type}
                                            name={i.name}
                                            value={formik.values[name]}
                                            readOnly={i.readOnly}
                                            onChange={(e) => {
                                                i.onChange(e, formik)
                                            }}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.errors[i.name] && formik.touched[i.name] ? (
                                            <FormError message={formik.errors[i.name]} style={errorStyle} />
                                        ) : null}
                                    </div>
                                ) : (
                                    <div className="form-group" key={index}>
                                        <label htmlFor={i.name}>{i.label}</label>
                                        <Select
                                            options={i.options}
                                            name={i.name}
                                            onChange={(option) => {
                                                i.onChange(option, formik)
                                            }}
                                            onBlur={formik.handleBlur}
                                            value={i.options.find((option) => option.value === formik.values[name])}
                                        />
                                        {i.addnewbtn && <div className='addnewbtndiv'><button className='addnewbtn mt-2' name={i.name} onClick={i.addnewFnc}>add new</button></div>}
                                        {formik.errors[i.name] && formik.touched[i.name] ? (
                                            <FormError message={formik.errors[i.name]} style={errorStyle} />
                                        ) : null}
                                    </div>
                                )
                            );
                        }




                    })}

                    <Button loader={loading} onclick={formik.handleSubmit} title={extra.btnTitle} />
                </form>
            </div >
        </div >

    )
}

export default Form
