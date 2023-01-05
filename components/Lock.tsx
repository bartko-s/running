import React from 'react';

import styles from './Lock.module.scss'

type Props = Readonly<{
    onClick: () => void
    state: boolean
}>

export function Lock(props: Props) {
    const state = props.state ? "Locked" : "Lock"
    const title = props.state ? "" : "Lock"

    return (
        <span onClick={props.onClick}
                className={props.state ? [styles.lock, styles.lockLocked].join(' ') : [styles.lock, styles.lockUnlocked].join(' ')}
                title={title}
        >{state}</span>
    )
}
