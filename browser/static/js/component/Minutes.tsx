import * as React from 'react';
import {NumberInput} from "./NumberInput"
import {formatTimeDigits} from "../utilities"

type Props = Readonly<{
    time: number
    isLocked: boolean
    onValueChangeHandler: (val: number) => void
}>

export const Minutes = (props: Props) => {
    const valueChangeHandler = (minutes: number) => {
        props.onValueChangeHandler(setNewMinutePart(minutes, props.time))
    }

    return (
        <NumberInput value={extractMinutesPart(props.time)}
                     isLocked={props.isLocked}
                     onValueChange={valueChangeHandler}
                     valueFormatter={formatTimeDigits}
        />
    )
}

const extractMinutesPart = (totalTimeInSeconds: number): number => {
    const time = totalTimeInSeconds
    const h = Math.floor(time / 3600)
    return Math.floor((time - (h * 3600)) / 60)
}

const setNewMinutePart = (minutes: number, oldTimeInSeconds: number): number => {
    const hours = Math.floor(oldTimeInSeconds / 3600)
    const seconds = oldTimeInSeconds - (Math.floor(oldTimeInSeconds / 60) * 60)
    return (hours * 3600) + (minutes * 60) + seconds
}