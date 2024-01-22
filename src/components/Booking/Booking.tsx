//import './BiometricsComponent.styles.css'
import { useState, useEffect, useRef } from 'react';
import './Booking.styles.css'
import { post, get } from '../../apiClient'
import { Form } from 'react-bootstrap';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
        

const Booking = () => {

    const toast: any = useRef(null);

    const [paid, setPaid] = useState<any>(false);

    const [details, setDetails] = useState<any>({});

    const handleInputChange = (event: any) => {
        const { name, value }: any = event.target;
        if (event.target === undefined) return;
        setDetails({ ...details, [name]: value });
        console.log(details)
    };

    const submit = async (e: any) => {
        e.preventDefault();
        console.log(details)
        const { 
            firstname, 
            lastname,
            totalprice,
            paid,
            checkin,
            checkout,
            additionalneeds
        }: any = details;


        function formatDate(date: any){
            return date?.toLocaleDateString('sv-SE', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              });
        }

        const payload = {
            firstname, 
                lastname,
                totalprice: parseInt(totalprice),
                depositpaid: paid,
                bookingdates: {
                    checkin: formatDate(checkin),
                    checkout: formatDate(checkout),
                },
                additionalneeds
        }

        console.log(payload)

        const results: any = await post({ url: 'booking', payload });

        if(results?.code === "ERR_NETWORK") return toast.current.show({ severity: 'warn', summary: 'Info', detail: 'Network Error, contact System Administrator!' });
        if (results?.response?.status === 401) return toast.current.show({ severity: 'error', summary: 'Info', detail: 'Email/Password Invalid!' });
        if (results?.status === 200) localStorage.setItem('access_token', results.data.access_token);
    };

    return (
        <>
            <div className="card container form-container">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="card container form-container login-container">
                    <Toast ref={toast} position="top-center" />
                    <Form.Group controlId="formStep1">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="firstname"
                            className='input'
                            value={details.first_name}
                            onChange={handleInputChange}
                        />

                        <hr />

                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastname"
                            className='input'
                            value={details.last_name}
                            onChange={handleInputChange}
                        />

                        <hr />

                        <Form.Label>Total Price</Form.Label>
                        <Form.Control
                            type="number"
                            name="totalprice"
                            className='input'
                            value={details.total_price}
                            onChange={handleInputChange}
                        />

                        <hr />

                        <Form.Label>Deposit Paid?</Form.Label>
                        <div className="card flex justify-content-center">
                            <div className="flex flex-wrap gap-3">
                                <div className="flex align-items-center">
                                    <RadioButton inputId="ingredient1" name="paid" value={true} onChange={handleInputChange} checked={paid === true} />
                                    <label htmlFor="ingredient1" className="ml-2">Yes</label>
                                </div>
                                <div className="flex align-items-center">
                                    <RadioButton inputId="ingredient2" name="paid" value={false} onChange={handleInputChange} checked={paid === false} />
                                    <label htmlFor="ingredient2" className="ml-2">No</label>
                                </div>
                            </div>
                        </div>

                        <hr />

                        <Form.Label>Check In</Form.Label>
                            <Calendar className='input' onChange={(e: any) => handleInputChange({ target: { name: "checkin", value: e.value } })} name="check_in" />
                        <hr />

                        <Form.Label>Check Out</Form.Label>
                            <Calendar className='input' onChange={(e: any) => handleInputChange({ target: { name: "checkout", value: e.value } })} name="check_out" />
                        <hr />

                        <Form.Label>Additional Needs</Form.Label>
                        <InputTextarea name="additionalneeds" onChange={handleInputChange} rows={5} cols={30} />
                        

                        <div className="row">
                            <div className="col-md-12 col-lg-12 col-sm-12">
                                <Button label="Create Booking" severity="info" onClick={submit} />
                            </div>
                        </div>
                    </Form.Group>
                </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Booking;