import React from 'react';
import {NumberInput} from "./NumberInput"

import styles from './Distance.module.scss'

type Props = Readonly<{
    distance: number
    isLocked: boolean
    onValueChangeHandler: (val: number) => void
}>

export function Distance(props: Props) {
    return (
        <NumberInput value={Number(props.distance.toFixed(2))}
                     isLocked={props.isLocked}
                     onValueChange={props.onValueChangeHandler}
                     step={0.1}
                     extraClass={styles.distanceInput}
                     valueFormatter={valueFormatter}
        />
    )
}

function valueFormatter(val: number): string {
    return val.toFixed(2)
}