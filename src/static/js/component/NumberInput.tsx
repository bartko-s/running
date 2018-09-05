import * as React from 'react';
import {ReactNode} from 'react';

type Props = Readonly<{
    onIncreaseHandler: () => void,
    onDecreaseHandler: () => void,
    onValueChange: (val: number) => void,
    value: number,
    isLocked: boolean,
    step: number,
    valueFormatter?: (val: number) => string,
}>

const defaultProps = {
    step: 1
}

type State = typeof initialState

const initialState =  {
    isFocused: false
}

export class NumberInput extends React.Component<Props, State> {
    static defaultProps = defaultProps;

    readonly state: State = initialState;

    private repeater?: number
    private delay?: number
    private speedUpTimes?: number

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

    valueChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        this.props.onValueChange(Number(value))
    }

    focusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        e.persist();

        this.setState({
            isFocused: true
        }, () => {
            e.target.select()
        })
    }

    blurHandler = () => {
        this.setState({
            isFocused: false
        })
    }

    wheelHandler = () => {

    }

    get value(): string {
        if(this.props.valueFormatter != undefined && this.state.isFocused == false) {
            return this.props.valueFormatter(this.props.value)
        } else {
            return this.props.value.toString()
        }
    }

    renderIncreaseButtons = () => {
        if(!this.props.isLocked) {
            return (
                <span className="input__button input__button--increase"
                        onClick={() => {this.stopRepeater(); this.props.onIncreaseHandler();}}
                        onMouseUp={this.stopRepeater}
                        onTouchEnd={this.stopRepeater}
                        onMouseDown={() => {this.startRepeater(this.props.onIncreaseHandler)}}
                        onTouchStart={() => {this.startRepeater(this.props.onIncreaseHandler)}}
                        title="Increase"
                > + </span>
            )

        }
    }

    renderDecreaseButtons = () => {
        if(!this.props.isLocked) {
            return (
                <span className="input__button input__button--decrease"
                        onClick={() => {this.stopRepeater(); this.props.onDecreaseHandler()}}
                        onMouseUp={this.stopRepeater}
                        onTouchEnd={this.stopRepeater}
                        onMouseDown={() => {this.startRepeater(this.props.onDecreaseHandler)}}
                        onTouchStart={() => {this.startRepeater(this.props.onDecreaseHandler)}}
                        title="Decrease"
                >-</span>
            )

        }
    }

    renderInput = () => {
        if(this.props.isLocked) {
            return <span className="input__value">{this.value}</span>
        } else {
            return <input className="input__value input__value--editable"
                          value={this.value}
                          type="number"
                          step={this.props.step}
                          onChange={this.valueChangeHandler}
                          onFocus={this.focusHandler}
                          onBlur={this.blurHandler}
                          onWheel={this.wheelHandler}
            />
        }
    }

    render(): ReactNode {
        return (
            <div className="input">
                {this.renderIncreaseButtons()}
                {this.renderInput()}
                {this.renderDecreaseButtons()}
            </div>
        )
    }
}
