import * as React from 'react';
import {ReactNode} from 'react';

type Props = Readonly<{
    onClick: () => void
    state: boolean
}>

export class Lock extends React.Component<Props, {}> {
    render(): ReactNode {
        const state = this.props.state ? "Locked" : "Lock"
        const stateClass = this.props.state ? "lock lock--locked" : "lock lock--unlocked"
        const title = this.props.state ? "" : "Lock"

        return (
            <span onClick={this.props.onClick}
                    className={stateClass}
                    title={title}
            >{state}</span>
        )
    }
}