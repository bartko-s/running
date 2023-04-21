import React from 'react';
import {NumberInput} from "./NumberInput"
import {formatTimeDigits, timeExtractor} from "../utilities"

type Props = Readonly<{
    time: number
    isLocked: boolean
    onValueChangeHandler: (val: number) => void
}>

export function Hours(props: Props) {
    function valueChangeHandler(hours: number) {
        props.onValueChangeHandler(setNewHoursPart(hours, props.time))
    }

    return (
        <NumberInput value={timeExtractor(props.time).hours}
                     isLocked={props.isLocked}
                     onValueChange={valueChangeHandler}
                     valueFormatter={formatTimeDigits}
        />
    )
}

function setNewHoursPart(hours: number, oldTimeInSeconds: number): number {
    const old = timeExtractor(oldTimeInSeconds)
    return (((hours * 60) + old.minutes) * 60) + old.seconds
}