import React from 'react';
import {NumberInput} from "./NumberInput"
import {formatTimeDigits} from "../utilities"

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
        <NumberInput value={extractHoursPart(props.time)}
                     isLocked={props.isLocked}
                     onValueChange={valueChangeHandler}
                     valueFormatter={formatTimeDigits}
        />
    )
}

function extractHoursPart(totalTimeInSeconds: number): number {
    return Math.floor(totalTimeInSeconds / 3600)
}

function setNewHoursPart(hours: number, oldTimeInSeconds: number): number {
    const oldHours = Math.floor(oldTimeInSeconds / 3600)
    const minutes = Math.floor((oldTimeInSeconds - (oldHours * 3600)) / 60)
    const seconds = oldTimeInSeconds - (Math.floor(oldTimeInSeconds / 60) * 60)
    return (hours * 3600) + (minutes * 60) + seconds
}