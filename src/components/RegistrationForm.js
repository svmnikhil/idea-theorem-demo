import React, { useCallback, useState, useEffect } from "react";
import InputComponent from "./InputComponent";
import BirthDateComponent from "./BirthDateComponent";
import SubmitComponent from "./SubmitComponent";
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
 

export default function RegistrationForm() {

    const initialFormState = {
        full_name: "",
        contact_number: "",
        email: "",
        date_of_birth: "",
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
    const [resetDate, setResetDate] = useState(false);
    const [errors, setErrors] = useState(initialErrorState);
    const [submitSuccess, setSubmitSuccess] = useState(null);
    const [submitMessage, setSubmitMessage] = useState("");
    const [opacity, setOpacity] = useState(1); // New state for controlling opacity


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
            case 'date_of_birth':
                const parts = value.split('-');
                const [day, month, year] = parts.map(part => part.trim());
                if (!day) {
                    error = 'Sorry, the birthdate must include a day. Please try again.';
                } else if (!month) {
                error = 'Sorry, the birthdate must include a month. Please try again.';
                } else if (!year) {
                error = 'Sorry, the birthdate must include a year. Please try again.';
                } else {
                    error = '';
                }
                break;
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
                if (!value.trim()) {
                    error = 'Sorry, password cannot be empty. Please try again.';
                } else if(value !== form.password){
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
        // console.log(event);
        
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error
        }));
        // console.log(error);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        let newErrors = {};
        let isValid = true; // Flag to track overall form validity

        Object.keys(form).forEach(fieldName => {
            const error = formValidate(fieldName, form[fieldName]);
            if (error) {
                newErrors[fieldName] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);

        if (!isValid) {
            setSubmitSuccess(false);
            setSubmitMessage("Please correct the errors before submitting.");
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
                setTimeout(() => setOpacity(0), 1000);
            } else {
                const error = await response.text();
                setSubmitSuccess(false);
                setSubmitMessage("There was an error creating the account.");
                setTimeout(() => setOpacity(0), 1000);
                throw new Error(error);
            }
        } catch (error) {
            console.error('There was an error submitting the form:', error);
        }
    }

    useEffect(() => {
        if (submitSuccess !== null) {
            setOpacity(1);
            setTimeout(() => setSubmitSuccess(null), 2000);
        }
    }, [submitSuccess]);

    const handleCancel = (event) => {
        setForm(initialFormState);
        setResetDate(prev => !prev);
        setErrors(initialErrorState);
    }

    return (
        <div className="flex flex-col justify-between md:justify-center w-full md:w-1/3 mt-4 md:mt-0 h-screen">
            <div>
                <label className="block pl-3 md:pl-0 pb-2 font-semibold text-gray-700 text-lg">Create User Account</label>
                <form className="relative border-t md:border md:border-gray-50 md:shadow-2xl md:shadow-gray-300 w-full bg-white px-3 md:px-6 md:pt-4 pb-6 md:rounded-md" onSubmit={handleSubmit}>  
                    {submitSuccess !== null && (
                        <div 
                            className={
                                `absolute transform -bottom-5 md:bottom-full -translate-y-0 md:absolute inset-x-0 md:top-0 md:left-auto md:translate-x-64 md:translate-y-0 
                                ${submitSuccess ? 'bg-green-100' : 'bg-red-200'} 
                                px-3 py-4 md:py-7 rounded-md text-center md:text-left flex items-center justify-center md:justify-start z-10 transition-opacity duration-2000`
                            }
                            style={{ opacity: opacity, transition: 'opacity 2s ease-in-out' }}
                        >
                            {submitSuccess ? <CheckCircleIcon className="h-6 w-6"/> : <XCircleIcon className="h-6 w-6" />}
                            <span className="ml-2">{submitMessage}</span>
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
                    <BirthDateComponent setDate={handleInputChange} error={errors.date_of_birth} reset={resetDate}/>
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
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleInputChange}
                        onBlur={handleValidationOnBlur}
                        error={errors.password}
                        placeholder="Create Password"
                    />
                    <InputComponent 
                        label="Confirm Password"
                        type="password"
                        name="confirm_password"
                        value={form.confirm_password}
                        onChange={handleInputChange}
                        onBlur={handleValidationOnBlur}
                        error={errors.confirm_password}
                        placeholder="Confirm Password"
                    />
                </form>
            </div>
            <div className="fixed inset-x-0 bottom-0 md:relative md:px-0 md:-pt-2 md:bottom-2">
                <SubmitComponent 
                    submit={handleSubmit} 
                    cancel={handleCancel}
                />
            </div>
        </div>
    )
}