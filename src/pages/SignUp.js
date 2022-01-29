import React from 'react'

import StaticHeader from '../shared/StaticHeader'
import Form from '../shared/Form'
import FormField from '../shared/FormField'
import FormInput from '../shared/FormInput'
import ButtonWithIcon from '../shared/ButtonWithIcon'
import { ReactComponent as NextIcon } from '../shapes/next.svg'
import { registerUser } from '../api/user'
import { useNavigate } from 'react-router-dom'


function SignUp() {
    let [formData, setFormData] = React.useState({
        username: '',
        email: '',
        password: '',
        confirm: '',
    })
    const navigate = useNavigate()

    const handleSubmit = async () => {
        registerUser(
            formData.username,
            formData.email,
            formData.password,
            formData.confirm
        )
        navigate('/signin')
    }

    return (
        <div className="SignUp">
            <StaticHeader />
            <Form
                title='Sign up'
                fields={[
                    <FormField
                        key='username'
                        label='Username'
                        input={
                            <FormInput
                                value={formData.username}
                                onChange={event => setFormData({
                                    ...formData,
                                    username: event.target.value
                                })}
                                hint='Type your username'
                            />
                        }
                    />,
                    <FormField
                        key='email'
                        label='Email'
                        input={
                            <FormInput
                                value={formData.email}
                                onChange={event => setFormData({
                                    ...formData,
                                    email: event.target.value
                                })}
                                hint='Type your email'
                            />
                        }
                    />,
                    <FormField
                        key='password'
                        label='Password'
                        input={
                            <FormInput
                                value={formData.password}
                                onChange={event => setFormData({
                                    ...formData,
                                    password: event.target.value
                                })}
                                hint='Type your password'
                                type='password'
                            />
                        }
                    />,
                    <FormField
                        key='confirm'
                        label='Confirm password'
                        input={
                            <FormInput
                                value={formData.confirm}
                                onChange={event => setFormData({
                                    ...formData,
                                    confirm: event.target.value
                                })}
                                hint='Confirm your password'
                                type='password'
                            />
                        }
                    />
                ]}
                sendButton={
                    <ButtonWithIcon
                        onClick={handleSubmit}
                        icon={<NextIcon />}
                    >
                        Let's go
                    </ButtonWithIcon>}
                details={<p>Already have an account ? <a href='/signin'>Sign in here</a></p>}
            />
        </div>
    )
}

export default SignUp