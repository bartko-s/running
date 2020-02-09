import React from 'react';

type Props = Readonly<{
    onClick: () => void
    state: boolean
}>

export function Lock(props: Props) {
    const state = props.state ? "Locked" : "Lock"
    const stateClass = props.state ? "lock lock--locked" : "lock lock--unlocked"
    const title = props.state ? "" : "Lock"

    return (
        <span onClick={props.onClick}
                className={stateClass}
                title={title}
        >{state}</span>
    )
}
