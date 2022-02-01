import React from 'react'
import StaticHeader from '../shared/StaticHeader'

import Form from '../shared/Form'
import FormField from '../shared/FormField'
import FormInput from '../shared/FormInput'
import Button from '../shared/Button'
import { readUser, updateUser } from '../api/user'
import { signout } from '../api/auth'
import { useNavigate } from 'react-router-dom'
import { removeToken } from '../utils'


function Settings() {
    const [defaultUser, setDefaultUser] = React.useState({
        username: '',
        email: '',
        firstname: '',
        lastname: '',
    })
    const [user, setUser] = React.useState({
        username: '',
        email: '',
        firstname: '',
        lastname: '',
    })
    const [password, setPassword] = React.useState({
        password: { value: '', modified: false },
        confirm: { value: '', modified: false },
    })
    const navigate = useNavigate()

    const handleSubmitUser = async event => {
        event.preventDefault()
        await updateUser(
            user.username !== defaultUser.username ? user.username : null,
            user.firstname !== defaultUser.firstname ? user.firstname : null,
            user.lastname !== defaultUser.lastname ? user.lastname : null,
        )
    }

    const handleLogout = async event => {
        event.preventDefault()
        await signout()
        removeToken()
        navigate('/signin')
    }

    const loadUser = async () => {
        const { username, email, first_name, last_name } = await readUser()
        const formatted = {
            username: username,
            email: email,
            firstname: first_name,
            lastname: last_name
        }
        setDefaultUser(formatted)
        setUser(formatted)
    }

    React.useEffect(() => {
        loadUser()
    }, [])

    return (
        <div className="Settings">
            <StaticHeader withClose={true} />
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
                sendButton={
                    <Button
                        key='save'
                        onClick={handleSubmitUser}
                        disabled={false}
                        secondary={false}
                    >
                        Save
                    </Button>
                }
                cancelButton={
                    <Button
                        key='cancel'
                        onClick={async event => {
                            event.preventDefault()
                            await loadUser()
                        }}
                        disabled={false}
                        secondary={true}
                    >
                        Cancel
                    </Button>
                }
                isSection={true}
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
                sendButton={
                    <Button
                        key='save'
                        onClick={() => {}}
                        disabled={false}
                        secondary={false}
                    >
                        Save
                    </Button>
                }
                cancelButton={
                    <Button
                        key='cancel'
                        onClick={() => {}}
                        disabled={false}
                        secondary={true}
                    >
                        Cancel
                    </Button>
                }
                isSection={true}
            />
            <Form
                title='Session actions'
                sendButton={
                    <Button
                        key='signout'
                        onClick={handleLogout}
                        disabled={false}
                        secondary={false}
                    >
                        Sign out
                    </Button>
                }
                isSection={true}
            />
        </div>
    )
}

export default Settings