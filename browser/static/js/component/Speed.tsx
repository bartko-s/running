import * as React from 'react';
import {NumberInput} from "./NumberInput"

type Props = Readonly<{
    speed: number
    isLocked: boolean
    onValueChangeHandler: (val: number) => void
}>

export const Speed = (props: Props) => {
    return (
        <NumberInput value={Number(props.speed.toFixed(2))}
                     isLocked={props.isLocked}
                     onValueChange={props.onValueChangeHandler}
                     step={0.01}
                     extraClass="input--distance"
                     valueFormatter={valueFormatter}
        />
    )
}

const valueFormatter = (val: number): string => {
    return val.toFixed(2)
}