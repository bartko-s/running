import * as React from 'react';
import {ReactNode} from 'react';
import {NumberInput} from "./NumberInput"
import {formatTimeDigits} from "../utilities"

type Props = Readonly<{
    time: number
    isLocked: boolean
    onValueChangeHandler: (val: number) => void
}>

export class Hours extends React.Component<Props, {}> {
    get value(): number {
        const time = this.props.time
        return Math.floor(time / 3600)
    }

    valueChangeHandler = (val: number) => {
        const hours = Math.floor(this.props.time / 3600)
        const minutes = Math.floor((this.props.time - (hours * 3600)) / 60)
        const seconds = this.props.time - (Math.floor(this.props.time / 60) * 60)
        const newVal = (val * 3600) + (minutes * 60) + seconds
        this.props.onValueChangeHandler(newVal)
    }

    render(): ReactNode {
        return (
            <NumberInput value={this.value}
                         isLocked={this.props.isLocked}
                         onValueChange={this.valueChangeHandler}
                         valueFormatter={formatTimeDigits}
            />
        )
    }
}
