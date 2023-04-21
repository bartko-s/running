import React from 'react';
import {NumberInput} from "./NumberInput"
import {formatTimeDigits, timeExtractor} from "../utilities"

type Props = Readonly<{
    time: number
    isLocked: boolean
    onValueChangeHandler: (val: number) => void
}>

export function Minutes(props: Props) {
    function valueChangeHandler(minutes: number) {
        props.onValueChangeHandler(setNewMinutePart(minutes, props.time))
    }

    return (
        <NumberInput value={timeExtractor(props.time).minutes}
                     isLocked={props.isLocked}
                     onValueChange={valueChangeHandler}
                     valueFormatter={formatTimeDigits}
        />
    )
}

function setNewMinutePart(minutes: number, oldTimeInSeconds: number): number {
    const old = timeExtractor(oldTimeInSeconds);
    return (((old.hours * 60) + minutes) * 60) + old.seconds
}