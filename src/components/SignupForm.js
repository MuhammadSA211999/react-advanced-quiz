import React, { useState } from 'react';
import Form from './Form'
import Button from './Button'
import TextInput from './TextInput'
import Checkbox from './Checkbox'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';
const SignupForm = () => {
    const history = useHistory()
    const { signup } = useAuth()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [agree, setAgree] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSignup = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            return setError("Password don't match")
        }
        try {
            setError('')
            setLoading(true)
            await signup(email, password, name)
            history.push('/')
        } catch (error) {
            console.log(error);
            setError('Signup failed!')

        }
    }

    return (
        <Form onSubmit={handleSignup}
            className={{ height: '530px' }}>
            <TextInput required
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text" placeholder="Enter name" icon="person" />

            <TextInput required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Enter email"
                icon="alternate_email"
            />

            <TextInput required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password" placeholder="Enter password" icon="lock" />

            <TextInput required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="Confirm password"
                icon="lock_clock"
            />
            {error && <p className='error'>{error}</p>}
            <Checkbox required
                value={agree}
                onChange={(e) => setAgree(e.target.value)}
                text="I agree to the Terms &amp; Conditions" />

            <Button disabled={loading} type='submit'>
                <span>Submit Now</span>
            </Button>

            <div className="info">
                Already have an account? <Link to="/login">Login</Link> instead.
            </div>
        </Form>
    );
};

export default SignupForm;