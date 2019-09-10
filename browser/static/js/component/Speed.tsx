import * as React from 'react';
import {ReactNode} from 'react';
import {NumberInput} from "./NumberInput"

type Props = Readonly<{
    speed: number
    isLocked: boolean
    onValueChangeHandler: (val: number) => void
}>

export class Speed extends React.Component<Props, {}> {
    get value(): number {
        return Number(this.props.speed.toFixed(2))
    }

    valueChangeHandler = (val: number) => {
        this.props.onValueChangeHandler(val)
    }

    valueFormatter = (val: number): string => {
        return val.toFixed(2)
    }

    render(): ReactNode {
        return (
            <NumberInput value={this.value}
                         isLocked={this.props.isLocked}
                         onValueChange={this.valueChangeHandler}
                         step={0.01}
                         extraClass="input--distance"
                         valueFormatter={this.valueFormatter}
            />
        )
    }
}
