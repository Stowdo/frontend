import React from 'react'
import StaticHeader from '../shared/StaticHeader'

import Form from '../shared/Form'
import FormField from '../shared/FormField'
import FormInput from '../shared/FormInput'
import Button from '../shared/Button'
import { deleteUser, updateUser } from '../api/user'
import { changePassword, getConnectedUser, signout } from '../api/auth'
import { useNavigate } from 'react-router-dom'
import { removeToken } from '../utils'


function Settings() {
    const [user, setUser] = React.useState({
        id: -1,
        username: '',
        email: '',
        firstname: '',
        lastname: '',
    })
    const [password, setPassword] = React.useState({
        newPassword1: '',
        newPassword2: '',
        oldPassword: ''
    })
    const navigate = useNavigate()

    const handleSubmitUser = async event => {
        event.preventDefault()
        await updateUser(
            user.id,
            user.username,
            user.email,
            user.firstname,
            user.lastname,
        )
    }

    const handleChangePassword = async event => {
        event.preventDefault()
        await changePassword(
            password.newPassword1,
            password.newPassword2,
            password.oldPassword
        )
    }

    const handleSignout = async event => {
        event.preventDefault()
        await signout()
        removeToken()
        navigate('/signin')
    }

    const handleDeleteUser = async event => {
        event.preventDefault()
        await deleteUser(user.id)
        await signout()
        removeToken()
        navigate('/signup')
    }

    const loadUser = async () => {
        const { pk, username, email, first_name, last_name } = await getConnectedUser()
        setUser({
            id: pk,
            username: username,
            email: email,
            firstname: first_name,
            lastname: last_name
        })
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
                        key='newPassword1'
                        label='New password'
                        input={<FormInput
                            value={password.newPassword1}
                            hint='Type a new password'
                            type='password'
                            onChange={event => {
                                setPassword({
                                    ...password,
                                    newPassword1: event.target.value
                                })
                            }}
                        />}
                    />,
                    <FormField
                        key='newPassword2'
                        label='Confirm password'
                        input={<FormInput
                            value={password.newPassword2}
                            hint='Confirm your new password'
                            type='password'
                            onChange={event => {
                                setPassword({
                                    ...password,
                                    newPassword2: event.target.value
                                })
                            }}
                        />}
                    />,
                    <FormField
                        key='oldPassword'
                        label='Old password'
                        input={<FormInput
                            value={password.oldPassword}
                            hint='Confirm your old password'
                            type='password'
                            onChange={event => {
                                setPassword({
                                    ...password,
                                    oldPassword: event.target.value
                                })
                            }}
                        />}
                    />
                ]}
                sendButton={
                    <Button
                        key='save'
                        onClick={handleChangePassword}
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
                title='Other actions'
                sendButton={
                    <Button
                        key='signout'
                        onClick={handleSignout}
                        disabled={false}
                        secondary={false}
                    >
                        Sign out
                    </Button>
                }
                cancelButton={
                    <Button
                        key='Delete user'
                        onClick={handleDeleteUser}
                        disabled={false}
                        secondary={true}
                    >
                        Delete user
                    </Button>
                }
                isSection={true}
            />
        </div>
    )
}

export default Settings