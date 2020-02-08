import React from 'react';
import {NumberInput} from "./NumberInput"
import {formatTimeDigits} from "../utilities"

type Props = Readonly<{
    time: number
    isLocked: boolean
    onValueChangeHandler: (val: number) => void
}>

export const Seconds = (props: Props) => {
    const valueChangeHandler = (seconds: number) => {
        props.onValueChangeHandler(setNewSecondsPart(seconds, props.time))
    }

    return (
        <NumberInput value={extractSecondsPart(props.time)}
                     isLocked={props.isLocked}
                     onValueChange={valueChangeHandler}
                     valueFormatter={formatTimeDigits}
        />
    )
}

const extractSecondsPart = (totalTimeInSeconds: number): number => {
    const time = totalTimeInSeconds
    const h = Math.floor(time / 3600)
    const m = Math.floor((time - (h * 3600)) / 60)
    return Math.round(time - (h * 3600) - (m * 60))
}

const setNewSecondsPart = (seconds: number, oldTimeInSeconds: number): number => {
    return (Math.floor(oldTimeInSeconds / 60) * 60) + seconds
}