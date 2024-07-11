import * as yup from 'yup'


const SignupSchema = yup.object({
    firstName: yup.string().min(2).max(15).required('please enter your first name'),
    email: yup.string().email().required('please enter your email'),
    password: yup.string().min(8).required('please enter your password'),
    confirmPassword: yup.string().required().oneOf([yup.ref('password'), null], 'confirm password and password shoud match')
})


const SignInSchmema = yup.object({
    email: yup.string().email().required('email is required'),
    password: yup.string().required("password can't be empty"),
    confirmPassword: yup.string().required().oneOf([yup.ref('password'), null], 'confirm password and password shoud match')
})

export { SignupSchema, SignInSchmema }