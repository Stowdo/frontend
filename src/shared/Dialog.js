import React from 'react'

import './Dialog.scss'


export default function Dialog({ children }) {
    const [isOpened, open] = React.useState(false)

    React.useEffect(() => {
        setTimeout(() => open(true), 200)
    }, [])

    return (
        <div className={'Dialog' + (isOpened ? '' : ' Dialog--hidden')}>
            { children }
        </div>
    )
}