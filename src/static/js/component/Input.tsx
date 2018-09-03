import * as React from 'react';
import {ReactNode} from 'react';

type Props = Readonly<{
    onIncreaseHandler: () => void,
    onDecreaseHandler: () => void,
    value: string | number,
    isLocked: boolean,
}>

export class Input extends React.Component<Props, {}> {
    repeater?: number
    delay?: number
    speedUpTimes?: number

    componentWillUnmount(): void {
        this.stopRepeater();
    }

    stopRepeater = () => {
        if (this.repeater != undefined) {
            clearInterval(this.repeater);
        }

        if (this.delay != undefined) {
            clearInterval(this.delay);
        }

        if (this.speedUpTimes != undefined) {
            clearInterval(this.speedUpTimes);
        }
    }

    startRepeater = (callback: () => void) => {
        const self = this;

        this.delay = window.setTimeout(() => {
            self.repeater = window.setInterval(callback, 100);
            self.speedUpTimes = window.setInterval(() => {
                clearInterval(self.repeater)
                self.repeater = window.setInterval(callback, 25);
            }, 3000)
        }, 200)
    }

    renderIncreaseButtons = () => {
        if(!this.props.isLocked) {
            return (
                <button className="input__button input__button--increase"
                        onClick={() => {this.stopRepeater(); this.props.onIncreaseHandler();}}
                        onMouseUp={this.stopRepeater}
                        onTouchEnd={this.stopRepeater}
                        onMouseDown={() => {this.startRepeater(this.props.onIncreaseHandler)}}
                        onTouchStart={() => {this.startRepeater(this.props.onIncreaseHandler)}}
                        title="Increase"
                > + </button>
            )

        }
    }

    renderDecreaseButtons = () => {
        if(!this.props.isLocked) {
            return (
                <button className="input__button input__button--decrease"
                        onClick={() => {this.stopRepeater(); this.props.onDecreaseHandler()}}
                        onMouseUp={this.stopRepeater}
                        onTouchEnd={this.stopRepeater}
                        onMouseDown={() => {this.startRepeater(this.props.onDecreaseHandler)}}
                        onTouchStart={() => {this.startRepeater(this.props.onDecreaseHandler)}}
                        title="Decrease"
                >-</button>
            )

        }
    }

    render(): ReactNode {
        return (
            <div className="input">
                {this.renderIncreaseButtons()}
                <span className="input__value">{this.props.value}</span>
                {this.renderDecreaseButtons()}
            </div>
        )
    }
}
