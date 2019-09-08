import * as React from 'react';
import {ReactNode} from 'react';

type Props = Readonly<{
    onValueChange: (val: number) => void,
    value: number,
    isLocked: boolean,
    step: number,
    valueFormatter?: (val: number) => string,
    extraClass?: string
}>

const defaultProps = {
    step: 1,
    extraClass: '',
}

type State = typeof initialState

const initialState =  {
    isFocused: false
}

export class NumberInput extends React.Component<Props, State> {
    static defaultProps = defaultProps;

    readonly state: State = initialState;

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
            <div className={"input " + this.props.extraClass}>
                {this.renderInput()}
            </div>
        )
    }
}
