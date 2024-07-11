import React from 'react'
import Select from 'react-select'
import { Makeoptions } from '../../../utility/Makeoptions'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from '../../export';
import './Filter.css'

function Filter({ inputs, Data, Setter, ShouldAppend }) {
    // console.log(Data,)

    return (
        <div className='container'>
            <div className='row'>

                {inputs.map((i, index) => {
                    return (i.inputType === "select" ? (<div className='col-3' key={index}>
                        <Select options={i.options} onChange={(e) => {
                            Setter((prev) => {
                                // console.log(inputs.select1Name)
                                // console.log({ ...prev, partyName: 'newadded' })
                                // console.log(Data)
                                ShouldAppend(false)
                                return {
                                    ...prev,
                                    [i.name]: e.value,
                                    skip: 0,
                                    isFilter: "true"
                                }
                            })
                        }} value={{ value: Data[i.name], label: Data[i.name] }} />
                    </div>) : (<div className='col-3'>
                        <DatePicker startDate={i.date} onChange={(date) => {
                            ShouldAppend(true)
                            Setter((prev) => {
                                return {
                                    ...prev,
                                    [i.name]: date,
                                    skip: 0,
                                    isFilter: "true"
                                }
                            })

                        }} className="form-group mt-2 " />
                    </div>))
                })}
                <div className='col-3 mb-1'><button className='resetBtn' onClick={(e) => {
                    ShouldAppend(false)
                    Setter({
                        skip: 0,
                        isFilter: "false"
                    })
                }}>Rest</button></div>
            </div>

        </div>
    )
}

export default Filter
