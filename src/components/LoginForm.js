import React, { useState } from 'react';
import Form from './Form';
import TextInput from './TextInput';
import Button from './Button';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom'

const LoginForm = () => {
    const { login } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const handledLogin = async (e) => {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await login(email, password)
            history.push('/')
        } catch (error) {
            console.log(error);
            setError("Can't login")
        }
    }
    return (<>
        <Form onSubmit={handledLogin}
            className={{ height: '330px' }}>
            <TextInput required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Enter email"
                icon="alternate_email"
            />

            <TextInput
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter password" icon="lock" />

            <Button disabled={loading} type='submit'>
                <span>Submit Now</span>
            </Button>


        </Form>
        {error && <p className='error'>{error}</p>}
        <div className="info">
            Don't have an account? <Link to="/signup">Signup</Link> instead.
        </div>
    </>
    );
};

export default LoginForm;