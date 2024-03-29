import React from 'react';
import {NumberInput} from "./NumberInput"

import styles from "./Speed.module.scss";

type Props = Readonly<{
    speed: number
    isLocked: boolean
    onValueChangeHandler: (val: number) => void
}>

export function Speed(props: Props) {
    return (
        <NumberInput value={Number(props.speed.toFixed(2))}
                     isLocked={props.isLocked}
                     onValueChange={props.onValueChangeHandler}
                     step={0.01}
                     extraClass={styles.speedInput}
                     valueFormatter={valueFormatter}
        />
    )
}

function valueFormatter(val: number): string {
    return val.toFixed(2)
}