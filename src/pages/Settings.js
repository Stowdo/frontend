import React from "react"
import StaticHeader from '../shared/StaticHeader'

import Form from '../shared/Form'
import FormField from '../shared/FormField'
import FormInput from '../shared/FormInput'


function Settings() {
    let [user, setUser] = React.useState({
        username: '',
        email: '',
        firstname: '',
        lastname: ''
    })
    let [password, setPassword] = React.useState({
        password: '',
        confirm: ''
    })

    return (
        <div className="Settings">
            <StaticHeader withSettings={true} />
            <Form
                title='User settings'
                fields={[
                    <FormField
                        key='username'
                        label='Username'
                        input={<FormInput
                            value={user.username}
                            hint='Type your username'
                            onChange={event => {
                                setUser({
                                    ...user,
                                    username: event.target.value
                                })
                            }}
                        />}
                    />,
                    <FormField
                        key='email'
                        label='Email'
                        input={<FormInput
                            value={user.email}
                            hint='Type your mail address'
                            onChange={event => {
                                setUser({
                                    ...user,
                                    email: event.target.value
                                })
                            }}
                        />}
                    />,
                    <FormField
                        key='firstname'
                        label='First name'
                        input={<FormInput
                            value={user.firstname}
                            hint='Type your first name'
                            onChange={event => {
                                setUser({
                                    ...user,
                                    firstname: event.target.value
                                })
                            }}
                        />}
                    />,
                    <FormField
                        key='lastname'
                        label='Last name'
                        input={<FormInput
                            value={user.lastname}
                            hint='Type your last name'
                            onChange={event => {
                                setUser({
                                    ...user,
                                    lastname: event.target.value
                                })
                            }}
                        />}
                    />
                ]}
            />
            <Form
                title='Password settings'
                fields={[
                    <FormField
                        key='password'
                        label='Password'
                        input={<FormInput
                            value={password.password}
                            hint='Type a new password'
                            onChange={event => {
                                setPassword({
                                    ...password,
                                    password: event.target.value
                                })
                            }}
                        />}
                    />,
                    <FormField
                        key='confirm'
                        label='Confirm password'
                        input={<FormInput
                            value={password.confirm}
                            hint='Confirm your new password'
                            onChange={event => {
                                setPassword({
                                    ...password,
                                    confirm: event.target.value
                                })
                            }}
                        />}
                    />
                ]}
            />
            <Form
                title='Danger zone'
                fields={[
                    
                ]}
            />
        </div>
    )
}

export default Settings