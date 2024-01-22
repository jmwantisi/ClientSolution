//import './BiometricsComponent.styles.css'
import { Form } from 'react-bootstrap';
import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { post } from '../apiClient'
import { Toast } from 'primereact/toast';
import { Navigate } from 'react-router-dom'

const LoginComponent = () => {

    const toast: any = useRef(null);

    const [loginDetails, setLoginDetails] = useState<any>({});
    const [isLoggedIn, setIsLoggedIn] = useState<any>(false);

    const handleInputChange = (event: any) => {
        const { name, value }: any = event.target;
        if (event.target === undefined) return;
        setLoginDetails({ ...loginDetails, [name]: value });
    };

    const submit = async (e: any) => {
        e.preventDefault();
        localStorage.setItem("access_token", "");
        const { username, password }: any = loginDetails;
        const results: any = await post({ url: 'auth', payload: { username, password } });

        console.log("Login Click::: ", results)
        
        if(results?.code === "ERR_NETWORK") return toast.current.show({ severity: 'warn', summary: 'Info', detail: 'Network Error, contact System Administrator!' });
        if (results?.response?.status === 401) return toast.current.show({ severity: 'error', summary: 'Info', detail: 'Email/Password Invalid!' });
        if (results?.status === 200) localStorage.setItem('access_token', results.data.access_token);
        setIsLoggedIn(true);
    };

    const submitSettingsRef: any = useRef();

    const saveAppSettings = (e: any): any => {
        // pass data to Child from here
        e.preventDefault();
        submitSettingsRef.current.submitChanges();
    }

    return (
        !isLoggedIn && localStorage.getItem('access_token') === "" || localStorage.getItem('access_token') === null ?
            <>
                <div className="card container form-container login-container">
                    <Toast ref={toast} position="top-center" />
                    <Form.Group controlId="formStep1">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            className='input'
                            value={loginDetails.email}
                            onChange={handleInputChange}
                        />
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            className='input'
                            value={loginDetails.password}
                            onChange={handleInputChange}
                        />
                        <div className="row">
                            <div className="col-md-12 col-lg-12 col-sm-12">
                                <Button label="Login" severity="info" onClick={submit} />
                            </div>
                        </div>
                    </Form.Group>
                </div>
            </>
            : <Navigate to='/bookings/list' />
    );
};

export default LoginComponent;