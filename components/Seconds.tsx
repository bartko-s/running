import React from 'react';
import {NumberInput} from "./NumberInput"
import {formatTimeDigits, timeExtractor} from "../utilities"

type Props = Readonly<{
    time: number
    isLocked: boolean
    onValueChangeHandler: (val: number) => void
}>

export function Seconds(props: Props) {
    function valueChangeHandler(seconds: number) {
        props.onValueChangeHandler(setNewSecondsPart(seconds, props.time))
    }

    return (
        <NumberInput value={timeExtractor(props.time).seconds}
                     isLocked={props.isLocked}
                     onValueChange={valueChangeHandler}
                     valueFormatter={formatTimeDigits}
        />
    )
}

function setNewSecondsPart(seconds: number, oldTimeInSeconds: number): number {
    const old = timeExtractor(oldTimeInSeconds)
    return (((old.hours * 60) + old.minutes) * 60) + seconds
}