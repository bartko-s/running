import React from 'react';
import {ReactNode} from 'react';
import useClickOutside from "react-cool-onclickoutside"

import styles from './Modal.module.scss'

type Props = Readonly<{
    onCloseHandler: () => void,
    children: ReactNode,
}>

export function Modal(props: Props) {
    const ref = useClickOutside(props.onCloseHandler);

    return (
        <div className={styles.background}>
            <div ref={ref} className={styles.contentWrapper}>
                <div className={styles.header}>
                    <a href="#"
                       className={styles.headerCloseButton}
                       title="Close window"
                       onClick={props.onCloseHandler}
                    />
                </div>
                <div>
                    {props.children}
                </div>
            </div>
        </div>
    )
}