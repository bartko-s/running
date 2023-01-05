import React from 'react';
import {useEffect, useRef, useState} from 'react';

import styles from './NumberInput.module.scss'

type Props = Readonly<{
    onValueChange: (val: number) => void,
    value: number,
    isLocked: boolean,
    valueFormatter?: (val: number) => string,
} & typeof defaultProps>;

const defaultProps = {
    step: 1,
    extraClass: '',
}

export function NumberInput(props: Props) {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const inputEl = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(isFocused && inputEl.current !== null) {
            inputEl.current.select();
        }
    }, [isFocused])

    function valueChangeHandler(e: React.FormEvent<HTMLInputElement>) {
        const value = e.currentTarget.value
        setIsFocused(true);
        props.onValueChange(Number(value))
    }

    function focusHandler(e: React.FocusEvent<HTMLInputElement>) {
        e.persist();
        setIsFocused(true);
    }

    function blurHandler() {
        setIsFocused(false)
    }

    function wheelHandler() {}

    function getValue(): string {
        if(props.valueFormatter != undefined && !isFocused) {
            return props.valueFormatter(props.value)
        } else {
            return  props.value.toString()
        }
    }

    function renderInput() {
        if(props.isLocked) {
            return <span className={styles.inputValue}>{getValue()}</span>
        } else {
            return <input className={[styles.inputValue, styles.inputValueEditable].join(' ')}
                          value={getValue()}
                          ref={inputEl}
                          type="number"
                          step={props.step}
                          onChange={valueChangeHandler}
                          onFocus={focusHandler}
                          onBlur={blurHandler}
                          onWheel={wheelHandler}
            />
        }
    }

    return (
        <div className={[styles.input, props.extraClass].join(' ')}>
            {renderInput()}
        </div>
    )
}

NumberInput.defaultProps = defaultProps;
