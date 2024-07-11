import React, { useState } from 'react'
import './SignUp.css'
import { useFormik } from 'formik'
import auth from '../../Api/Authentication'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { SignupSchema } from '../../Schema/AuthSchema';
import FormError from '../../Error/FormError';
import { ButtonLoader } from '../export';

function SignUp() {
    const [Loader, SetLoader] = useState(false)

    const initialValues = {
        firstName: "",
        email: "",
        password: "",
        confirmPassword: ''
    }

    const onSubmit = async (values) => {
        SetLoader(true)
        const result = await auth.signup(values)
        if (!result) {
            toast.error('somethig went wrong')
        }
        if (result.data.success === true) {
            toast.success(result.data.message)
        }
        else {
            toast.error(result.data.message)
        }
        SetLoader(false)
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: SignupSchema,
        onSubmit: onSubmit,
    })

    const errorStyle = { color: 'red', fontSize: '13px', position: 'absolute', bottom: "-33px" }


    return (
        <form className="form mb-5 mt-3" onSubmit={formik.handleSubmit}>
            <span className="signup">Sign Up</span>
            <div className='input-error-group'>
                <input type="text" placeholder="First Name" name='firstName' className="form--input" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.firstName} />
                {formik.errors.firstName && formik.touched.firstName ? (
                    <FormError message={formik.errors.firstName} style={errorStyle} />
                ) : (
                    null
                )}
            </div>
            <div className='input-error-group'>
                <input type="email" placeholder="Email address" name='email' className="form--input" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                {formik.errors.email && formik.touched.email ? (
                    <FormError message={formik.errors.email} style={errorStyle} />
                ) : (
                    null
                )}
            </div>
            <div className='input-error-group'>
                <input type="password" placeholder="Password" name='password' className="form--input" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                {formik.errors.password && formik.touched.password ? (
                    <FormError message={formik.errors.password} style={errorStyle} />
                ) : (
                    null
                )}
            </div>
            <div className='input-error-group'>
                <input type="password" placeholder="Confirm password" name='confirmPassword' className="form--input mb-3" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirmPassword} />
                {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
                    <FormError message={formik.errors.confirmPassword} style={errorStyle} />
                ) : (
                    null
                )}
            </div>

            {/* <div className="form--marketing">
                <input id="okayToEmail" type="checkbox" />
                <label htmlFor="okayToEmail" className="checkbox">
                    I want to join the newsletter
                </label>
            </div> */}
            <button type="submit" id='sign-up-btn' disabled={Loader}>
                {Loader ? (<p className='mt-2'><ButtonLoader /></p>) : " Sign up"}
            </button>
        </form>

    )
}

export default SignUp
