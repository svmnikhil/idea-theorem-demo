import React, { useCallback, useState } from "react";
import InputComponent from "./InputComponent";
import BirthDateComponent from "./BirthDateComponent";
import SubmitComponent from "./SubmitComponent";
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
 

export default function RegistrationForm() {

    const initialFormState = {
        full_name: "",
        contact_number: "",
        email: "",
        date_of_birth: "01011999",
        password: "",
        confirm_password: ""
    };

    const initialErrorState = {
        full_name: '',
        contact_number: '',
        email: '',
        date_of_birth: '',
        password: '',
        confirm_password: ''
    }

    const [form, setForm] = useState(initialFormState);
    const [errors, setErrors] = useState(initialErrorState);
    const [submitSuccess, setSubmitSuccess] = useState(null);
    const [submitMessage, setSubmitMessage] = useState("There was an error creating the account.");

    const formValidate = useCallback((name, value) => {
        let error = '';

        switch(name) {
            case 'full_name':
                if(!value.trim()) {
                    error = 'Sorry, the full name cannot be empty. Please try again.';
                } else if (/[^a-zA-Z -]/.test(value)) {
                    error = 'Sorry, the full name cannot contain symbols. Please try again.'
                } else {
                    error = '';
                }
                break;
            case 'contact_number':

                if(!value.trim()) {
                    error = 'Sorry, contact number cannot be empty. Please try again.';
                } else if (!(value.match('[0-9]{10}'))) {
                    error = 'Sorry, this contact number is not in a valid Canadian format. Please try again.';
                } else {
                    error = '';
                }
                break;
            // add day, month, year errors
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if(!value.trim()) {
                    error = 'Sorry, email cannot be empty. Please try again.';
                } else if (!emailRegex.test(value)) {
                    error = 'Sorry, this email is not in a valid format. Please try again.';
                } else {
                    error = '';
                }
                break;
            case 'password':
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]{8,}$/;
                if (!value.trim()) {
                    error = 'Sorry, password cannot be empty. Please try again.';
                } else if (!passwordRegex.test(value)) {
                    error = 'Sorry, this password must contain at least 8 characters, including lower case, upper case, and numbers. Please try again.';
                } else {
                    error = '';
                }
                break;
            case 'confirm_password':
                if(value !== form.password){
                    error = 'Sorry, these passwords do not match. Please try again.';
                } else {
                    error = '';
                }
                break;
            default:
                break;
        }
        return error;
    },[form]);

    const handleValidationOnBlur = (event) => {
        const { name, value } = event.target;
        const error = formValidate(name, value);
        // console.log(name, value, error);
        setErrors(prevErrors => ({
          ...prevErrors,
          [name]: error
        }));
      };

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        const error = formValidate(name, value);
        setForm((prevValues) => ({
            ...prevValues,
            [name]: value
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error
        }));
        //console.log(error);
    };

    const handleSubmit = async (event) => {
        //only works if errors are cleared
        event.preventDefault();
        const hasErrors = Object.values(errors).some(error => error !== '');

        if (hasErrors) {
            setSubmitSuccess(false);
            setSubmitMessage("There was an error creating the account.");
            return;
        }

       try {
            const response = await fetch('https://fullstack-test-navy.vercel.app/api/users/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
            });

            if (response.ok) {
                handleCancel();
                setSubmitSuccess(true);
                setSubmitMessage("User account successfully created.");
            } else {
                const error = await response.text();
                setSubmitSuccess(false);
                setSubmitMessage("There was an error creating the account.");
                throw new Error(error);
            }
        } catch (error) {
            console.error('There was an error submitting the form:', error);
        }
    }

    const handleCancel = (event) => {
        setForm(initialFormState);
    }

    return (
        <div className="flex flex-col justify-start md:justify-center w-full md:w-auto h-screen md:h-auto mt-4 md:mt-12">
            <label className="block pl-3 md:pl-0 pb-2 font-semibold text-gray-700 text-lg">Create User Account</label>
            <form className="relative md:border md:border-gray-50 md:shadow-2xl md:shadow-gray-300 w-full bg-white px-8 pt-4 md:pt-4 pb-6 md:rounded-md" onSubmit={handleSubmit}>  
                {submitSuccess !== null && (
                    <div 
                    className={
                        `absolute flex flex-row justify-center items-center inset-x-0 -bottom-20 md:top-1 md:left-auto md:bottom-auto 
                        ${submitSuccess ? 'bg-green-100 md:-right-72' : 'bg-red-200 md:-right-[345px]'} 
                        pl-3 pr-7 py-4 rounded-md md:rounded-md`}
                    >
                        {submitSuccess ? <CheckCircleIcon className="h-8 w-8 mx-3"/> : <XCircleIcon className="h-8 w-8 mx-3" />}
                        {submitMessage}
                    </div>
                )}
                <InputComponent 
                    label="Full Name"
                    type="text"
                    name="full_name"
                    value={form.full_name}
                    onChange={handleInputChange}
                    onBlur={handleValidationOnBlur}
                    error={errors.full_name}
                    placeholder="Full Name"
                />
                <InputComponent 
                    label="Contact Number"
                    type="tel"
                    name="contact_number"
                    value={form.contact_number}
                    onChange={handleInputChange}
                    onBlur={handleValidationOnBlur}
                    error={errors.contact_number}
                    placeholder="(XXX)-XXX-XXXX"
                    pattern="[0-9]*"
                />
                <BirthDateComponent />
                <InputComponent 
                    label="Email Address"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    onBlur={handleValidationOnBlur}
                    error={errors.email}
                    placeholder="Email Address"
                />
                <InputComponent 
                    label="Password"
                    type="text"
                    name="password"
                    value={form.password}
                    onChange={handleInputChange}
                    onBlur={handleValidationOnBlur}
                    error={errors.password}
                    placeholder="Password"
                />
                <InputComponent 
                    label="Confirm Password"
                    type="text"
                    name="confirm_password"
                    value={form.confirm_password}
                    onChange={handleInputChange}
                    onBlur={handleValidationOnBlur}
                    error={errors.confirm_password}
                    placeholder="Password"
                />
            </form>             
            <SubmitComponent 
                submit={handleSubmit} 
                cancel={handleCancel}
                className="fixed bottom-auto left-0 right-0 bg-white md:relative md:bg-transparent md:border-t-0"
                />
        </div>
    )
}