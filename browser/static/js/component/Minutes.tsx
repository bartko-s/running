import * as React from 'react';
import {ReactNode} from 'react';
import {NumberInput} from "./NumberInput"
import {formatTimeDigits} from "../utilities"

type Props = Readonly<{
    time: number
    isLocked: boolean
    onValueChangeHandler: (val: number) => void
}>

export class Minutes extends React.Component<Props, {}> {
    get value(): number {
        const time = this.props.time
        const h = Math.floor(time / 3600)
        return Math.floor((time - (h * 3600)) / 60)
    }

    increaseHandler = () => {
        this.props.onValueChangeHandler(this.props.time + 60)
    }

    decreaseHandler = () => {
        this.props.onValueChangeHandler(this.props.time - 60)
    }

    valueChangeHandler = (val: number) => {
        const hours = Math.floor(this.props.time / 3600)
        const seconds = this.props.time - (Math.floor(this.props.time / 60) * 60)
        const newVal = (hours * 3600) + (val * 60) + seconds
        this.props.onValueChangeHandler(newVal)
    }

    render(): ReactNode {
        return (
            <NumberInput value={this.value}
                         isLocked={this.props.isLocked}
                         onIncreaseHandler={this.increaseHandler}
                         onDecreaseHandler={this.decreaseHandler}
                         onValueChange={this.valueChangeHandler}
                         valueFormatter={formatTimeDigits}
            />
        )
    }
}
