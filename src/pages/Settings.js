import React from 'react'
import StaticHeader from '../shared/StaticHeader'

import Form from '../shared/Form'
import FormField from '../shared/FormField'
import FormInput from '../shared/FormInput'
import Button from '../shared/Button'
import { readUser, updateUser } from '../api/user'


function Settings() {
    let [user, setUser] = React.useState({
        username: { value: '', modified: false },
        email: { value: '', modified: false },
        firstname: { value: '', modified: false },
        lastname: { value: '', modified: false }
    })
    let [password, setPassword] = React.useState({
        password: { value: '', modified: false },
        confirm: { value: '', modified: false },
    })

    const handleSubmitUser = async event => {
        event.preventDefault()
        await updateUser(user.username, user.firstname, user.lastname)
    }

    const loadUser = async () => {
        const { username, email, first_name, last_name } = await readUser()
        setUser({
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
                title='Danger zone'
                sendButton={
                    <Button
                        key='delete'
                        onClick={() => {}}
                        disabled={false}
                        secondary={false}
                    >
                        Delete this account
                    </Button>
                }
                cancelButton={
                    <Button
                        key='reset'
                        onClick={() => {}}
                        disabled={false}
                        secondary={true}
                    >
                        Reset storage
                    </Button>
                }
                isSection={true}
            />
        </div>
    )
}

export default Settings