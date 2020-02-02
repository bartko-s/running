import * as React from 'react';

type Props = Readonly<{
    leftText: string,
    rightText: string,
    isChecked: boolean,
    onValueChange: () => void,
}>

export const ToggleButton = (props: Props) => {
    return (
        <div className="toggle-button">
            <input type="checkbox"
                   onChange={props.onValueChange}
                   checked={props.isChecked}
                   className="toggle-button__checkbox" />
            <span className="toggle-button__button" />
            <span className="toggle-button__text-container">
                <span className="toggle-button__text-left">{props.leftText}</span>
                <span className="toggle-button__text-right">{props.rightText}</span>
            </span>
            <span className="toggle-button__background" />
        </div>
    )
}
