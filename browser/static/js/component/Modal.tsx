import React from 'react';
import {ReactNode, useRef} from 'react';
import useClickOutside from "use-click-outside"

type Props = Readonly<{
    onCloseHandler: () => void,
    children: ReactNode,
}>

export function Modal(props: Props) {
    const ref = useRef<any>();
    useClickOutside(ref, props.onCloseHandler);

    return (
        <div className="modal__background">
            <div ref={ref} className="modal__content_wrapper">
                <div className="modal__header">
                    <a href="#"
                       className="modal__header-close-button"
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