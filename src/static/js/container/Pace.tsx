import * as React from 'react';
import {ReactNode} from 'react';
import {Input} from "../component/Input"
import {Lock} from "../component/Lock"

type State = Readonly<typeof initialState>

type Props = Readonly<{}>

type LockedInput = "time" | "pace" | "distance"

const initialState = {
    // official word half-marathon record
    time: (58 * 60) + 23, //seconds
    pace: ((58 * 60) + 23) / 21.1, // seconds/km
    distance: 21.1, //km
    lockedInput: "distance" as LockedInput
}

export class Pace extends React.Component<Props, State> {
    readonly state: State = initialState;

    changeTimeHandler = (step: number) => {
        this.setState((prevState: State) => {
            const newTime = this.state.time + step;

            let newState = {
                ...prevState
            }

            if(newTime > 0) {
                if(prevState.lockedInput == "distance") {
                    newState['time'] = newTime
                    newState['pace'] = newTime / prevState['distance']
                } else if(prevState.lockedInput == "pace") {
                    newState['time'] = newTime
                    newState['distance'] = newTime / prevState['pace']
                }
            }

            return newState
        })
    }

    changePaceHandler = (step: number) => {
        this.setState((prevState: State) => {
            const newPace = this.state.pace + step;

            let newState = {
                ...prevState
            }

            if(newPace > 0) {
                if(prevState.lockedInput == "time") {
                    newState['pace'] = newPace
                    newState['distance'] = prevState['time'] / newPace
                } else if(prevState.lockedInput == "distance") {
                    newState['pace'] = newPace
                    newState['time'] = newPace * prevState['distance']
                }
            }

            return newState
        })
    }

    changeDistanceHandler = (step: number) => {
        this.setState((prevState: State) => {
            const newDistance = this.state.distance + step;

            let newState = {
                ...prevState
            }

            if(newDistance > 0) {
                if(prevState.lockedInput == "time") {
                    newState['distance'] = newDistance
                    newState['pace'] = prevState['time'] / newDistance
                } else if(prevState.lockedInput == "pace") {
                    newState['distance'] = newDistance
                    newState['time'] = newDistance * prevState['pace']
                }
            }

            return newState
        })
    }

    onLockClickHandler = (type: LockedInput): () => void => {
        return () => {
            this.setState(
                {
                    lockedInput: type
                }
            )
        }
    }

    format = (num: number): string => {
        if (num <= 9) {
            return "0" + num;
        } else {
            return num.toString()
        }
    }

    render(): ReactNode {
        let time_hours = Math.floor(this.state.time / 3600)
        let time_minutes = Math.floor((this.state.time - (time_hours * 3600)) / 60)
        let time_seconds = Math.floor(this.state.time - (time_hours * 3600) - (time_minutes * 60))

        let pace_minutes = Math.floor(this.state.pace / 60)
        let pace_seconds = Math.floor(this.state.pace - (Number(pace_minutes) * 60))

        let distance = Number(this.state.distance.toFixed(1));

        return (
            <div className="content">
                <h1>Running Pace Calculator</h1>
                <div className="block">
                    <Lock state={this.state.lockedInput == "distance"}
                          onClick={this.onLockClickHandler("distance")}
                    />
                    <span className="label">Distance</span>
                    <Input value={distance}
                           onIncreaseHandler={() => {this.changeDistanceHandler(0.1)}}
                           onDecreaseHandler={() => {this.changeDistanceHandler(-0.1)}}
                           isLocked={this.state.lockedInput == "distance"}
                    /> km
                </div>
                <div className="block">
                    <Lock state={this.state.lockedInput == "time"}
                          onClick={this.onLockClickHandler("time")}
                    />
                    <span className="label">Time</span>
                    <Input value={this.format(time_hours)}
                           onIncreaseHandler={() => {this.changeTimeHandler(3600)}}
                           onDecreaseHandler={() => {this.changeTimeHandler(-3600)}}
                           isLocked={this.state.lockedInput == "time"}
                    />
                    <span className="separator">:</span>
                    <Input value={this.format(time_minutes)}
                           onIncreaseHandler={() => {this.changeTimeHandler(60)}}
                           onDecreaseHandler={() => {this.changeTimeHandler(-60)}}
                           isLocked={this.state.lockedInput == "time"}
                    />
                    <span className="separator">:</span>
                    <Input value={this.format(time_seconds)}
                           onIncreaseHandler={() => {this.changeTimeHandler(1)}}
                           onDecreaseHandler={() => {this.changeTimeHandler(-1)}}
                           isLocked={this.state.lockedInput == "time"}
                    />
                </div>
                <div className="block">
                    <Lock state={this.state.lockedInput == "pace"}
                          onClick={this.onLockClickHandler("pace")}
                    />
                    <span className="label">Pace</span>
                    <Input value={this.format(pace_minutes)}
                           onIncreaseHandler={() => {this.changePaceHandler(60)}}
                           onDecreaseHandler={() => {this.changePaceHandler(-60)}}
                           isLocked={this.state.lockedInput == "pace"}
                    />
                    <span className="separator">:</span>
                    <Input value={this.format(pace_seconds)}
                           onIncreaseHandler={() => {this.changePaceHandler(1)}}
                           onDecreaseHandler={() => {this.changePaceHandler(-1)}}
                           isLocked={this.state.lockedInput == "pace"}
                    /> min/km
                </div>
            </div>
        )
    }
}
