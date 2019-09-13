import * as React from 'react';
import {ReactNode} from 'react';

type Props = Readonly<{
    leftText: string,
    rightText: string,
    isChecked: boolean,
    onValueChange: () => void,
}>

export class ToggleButton extends React.Component<Props, {}> {
    render(): ReactNode {
        return (
            <div className="toggle-button">
                <input type="checkbox"
                       onChange={this.props.onValueChange}
                       checked={this.props.isChecked}
                       className="toggle-button__checkbox" />
                <span className="toggle-button__button" />
                <span className="toggle-button__text-container">
                    <span className="toggle-button__text-left">{this.props.leftText}</span>
                    <span className="toggle-button__text-right">{this.props.rightText}</span>
                </span>
                <span className="toggle-button__background" />
            </div>
        )
    }
}
