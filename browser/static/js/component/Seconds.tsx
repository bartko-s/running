import * as React from 'react';
import {ReactNode} from 'react';
import {NumberInput} from "./NumberInput"
import {formatTimeDigits} from "../utilities"

type Props = Readonly<{
    time: number
    isLocked: boolean
    onValueChangeHandler: (val: number) => void
}>

export class Seconds extends React.Component<Props, {}> {
    get value(): number {
        const time = this.props.time
        const h = Math.floor(time / 3600)
        const m = Math.floor((time - (h * 3600)) / 60)
        return Math.round(time - (h * 3600) - (m * 60))
    }

    valueChangeHandler = (val: number) => {
        const newVal = (Math.floor(this.props.time / 60) * 60) + val
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
