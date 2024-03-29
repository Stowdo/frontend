import React from 'react'

import Form from '../shared/Form'
import FormField from '../shared/FormField'
import FormInput from '../shared/FormInput'
import StaticHeader from '../shared/StaticHeader'
import ButtonWithIcon from '../shared/ButtonWithIcon'
import Toast from '../shared/Toast'
import { ReactComponent as NextIcon } from '../shapes/next.svg'
import { setToken } from '../utils'
import { signin } from '../api/auth'
import { useNavigate } from 'react-router-dom'


export default function SignIn({ next='/' }) {
    const [formData, setFormData] = React.useState({
        username: '',
        password: ''
    })
    const [toast, setToast] = React.useState({
        opened: false,
        message: '',
    })
    const navigate = useNavigate()

    const handleSubmit = async event => {
        event.preventDefault()
        
        try {
            const token = await signin(formData.username, formData.password)
            setToken(token)
            navigate(next, { replace: true })
        } catch(e) {
            setToast({
                opened: true,
                message: 'Unable to sign-in with these credentials'
            })
        }
    }

    return (
        <div className='SignIn'>
            <StaticHeader />
            <Form
                title='Sign in'
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
                    />
                ]}
                sendButton={
                    <ButtonWithIcon
                        onClick={handleSubmit}
                        icon={<NextIcon />}
                    >
                        Let's go
                    </ButtonWithIcon>}
                details={<p>Don’t have an account ? <a href='/signup'>Sign up here</a></p>}
                isSection={true}
            />
            {toast.opened
            ?   <Toast message={toast.message} onDestroy={() => setToast({...toast, opened: false})} />
            :   React.null
            }
        </div>
    )
}