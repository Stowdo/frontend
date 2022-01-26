import React from 'react'
import Form from '../shared/Form'
import FormField from '../shared/FormField'
import FormInput from '../shared/FormInput'
import StaticHeader from '../shared/StaticHeader'
import { ReactComponent as NextIcon } from '../shapes/next.svg'
import ButtonWithIcon from '../shared/ButtonWithIcon'

function SignIn() {
    let [formData, setFormData] = React.useState({
        username: '',
        password: ''
    })
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
                        onClick={() => {}}
                        icon={<NextIcon />}
                    >
                        Let's go
                    </ButtonWithIcon>}
                details={<p>Don’t have an account ? <a href='/signup'>Sign up here</a></p>}
            />
        </div>
    )
}

export default SignIn