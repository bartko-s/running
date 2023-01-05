import React from 'react';

import styles from './ToggleButton.module.scss'

type Props = Readonly<{
    leftText: string,
    rightText: string,
    isChecked: boolean,
    onValueChange: () => void,
}>

export function ToggleButton(props: Props) {
    return (
        <div className={styles.toggleButton}>
            <input type="checkbox"
                   onChange={props.onValueChange}
                   checked={props.isChecked}
                   className={styles.toggleButtonCheckbox} />
            <span className={styles.toggleButtonButton} />
            <span className={styles.toggleButtonTextContainer}>
                <span className={styles.toggleButtonTextLeft}>{props.leftText}</span>
                <span className={styles.toggleButtonTextRight}>{props.rightText}</span>
            </span>
            <span className={styles.toggleButtonBackground} />
        </div>
    )
}
