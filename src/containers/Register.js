import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../reducers/auth';
import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import './login.css';

function RegisterForm() {
    const [inputs, setInputs] = useState({ 
        "username": "", 
        "email": "",
        "password": "",
        "confirmPassword": "",
    });
    
    const dispatch = useDispatch();

    const handleChange = event => {
        const { name, value } = event.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (inputs.password !== inputs.confirmPassword) {
            alert('The two passwords did not match.');
        } else {
            delete inputs['confirmPassword'];
            console.log("inputs: ", inputs);
            dispatch(register(inputs));
        }
    };  
    return (
        <form onSubmit={handleSubmit}>
        <div className="form-group">
                <label for="username">Username</label>
                <input type="text" className="form-control" id="username" name="username" value={inputs.username} onChange={handleChange} required />
                <small className="form-text text-muted">
                    150 characters or fewer. Letters, digits, and @.+-_ only
                </small>
            </div>
            <div className="form-group">
                <label for="email">Email</label>
                <input type="email" className="form-control" id="email" name="email" value={inputs.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label for="password">Password</label>
                <input type="password" className="form-control" id="password" name="password" value={inputs.password} onChange={handleChange} required />
                <small className="form-text text-muted">
                    Password must be unique, different than personal information, 
                    contain at least 8 characters, and not be purely numeric.
                </small>
            </div>
            <div className="form-group">
                <label for="confirmPassword">Confirm Password</label>
                <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={inputs.confirmPassword} onChange={handleChange} required />
            </div>
            <div className="text-center">
                <button type="submit" className="btn btn-success user-btn-primary my-2">Sign Up</button>
                <h5 className="my-2">-or-</h5>
                <a href="/login" className="user-btn-secondary my-2">Log In to Existing Account</a>
            </div>
        </form>
    )
}

function Register(){
    return (
        <Container className='Register-Container'>
            <div className="user-form-title">Sign Up</div>
                <div className="user-form-description mt-3">
                    All fields marked with * are required.
                </div>
            <RegisterForm />
        </Container>
            
);
}

export default Register;