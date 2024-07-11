import React from 'react'
import FormError from './FormError';

function NestendValueError({ formik, propName, index, title, errorStyle }) {
    let errorMessage;
    if (formik.errors[propName] && formik.errors[propName][[index]] && formik.errors[propName][[index]][title] && formik.touched[propName] && formik.touched[propName][[index]] && formik.touched[propName][[index]][title]) {
        errorMessage = <FormError message={formik.errors[propName][[index]][title]} style={errorStyle} />;
    } else {
        errorMessage = null;
    }

    return errorMessage;
}

export default NestendValueError