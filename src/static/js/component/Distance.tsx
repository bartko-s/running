import * as React from 'react';
import {ReactNode} from 'react';
import {NumberInput} from "./NumberInput"

type Props = Readonly<{
    distance: number
    isLocked: boolean
    onValueChangeHandler: (val: number) => void
}>

export class Distance extends React.Component<Props, {}> {
    get value(): number {
        return Number(this.props.distance.toFixed(1))
    }

    increaseHandler = () => {
        this.props.onValueChangeHandler(this.props.distance + 0.1)
    }

    decreaseHandler = () => {
        this.props.onValueChangeHandler(this.props.distance - 0.1)
    }

    valueChangeHandler = (val: number) => {
        this.props.onValueChangeHandler(val)
    }

    render(): ReactNode {
        return (
            <NumberInput value={this.value}
                         isLocked={this.props.isLocked}
                         onIncreaseHandler={this.increaseHandler}
                         onDecreaseHandler={this.decreaseHandler}
                         onValueChange={this.valueChangeHandler}
                         step={0.1}
            />
        )
    }
}
