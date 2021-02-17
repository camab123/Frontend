import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/auth';
import { Alert, Button, Jumbotron,  Form } from 'reactstrap';
import TextInput from './TextInput'

function LoginForm() {
    const [inputs, setInputs] = useState({ username: '', password: '' });
    
    const dispatch = useDispatch();

    const handleChange = event => {
        const { name, value } = event.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(login(inputs.username, inputs.password));
    };

    return (
    <Jumbotron className="container">
        <Form onSubmit={handleSubmit}>
        <h1>Authentication</h1>
        <TextInput name="username" label="username"  value={inputs.username} onChange={handleChange} required />
        <TextInput name="password" label="password" type="password" value={inputs.password} onChange={handleChange} required />
        <Button type="submit" color="primary" size="lg">Log In</Button>
        </Form>
    </Jumbotron>
    )
}

function Login() {
    return (
        <LoginForm/>
    )
}

export default Login;