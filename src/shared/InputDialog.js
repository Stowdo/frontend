import React from 'react'

import Dialog from './Dialog'
import Button from './Button'
import Form from './Form'
import FormField from './FormField'
import FormInput from './FormInput'


export default function InputDialog({
    title,
    onSubmit,
    onCancel=() => {},
    defaultValue='',
    label='',
    hint='', 
}) {
    const [value, setValue] = React.useState(defaultValue)

    return (
        <Dialog>
            <Form
                key='inputDialogForm'
                title={title}
                fields={[
                    <FormField
                        key='inputDialogField'
                        label={label}
                        input={
                            <FormInput
                                value={value}
                                onChange={event => setValue(event.target.value)}
                                hint={hint}
                            />
                        }
                    />
                ]}
                sendButton={
                    <Button
                        onClick={event => {
                            event.preventDefault()
                            onSubmit(value)
                        }}
                        disabled={value.length === 0}
                    >
                        Create
                    </Button>
                }
                cancelButton={
                    <Button
                        onClick={() => onCancel()}
                        secondary={true}
                    >
                        Cancel
                    </Button>
                }
            />
        </Dialog>
    )
}