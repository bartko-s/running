import * as React from 'react';
import {ReactNode} from 'react';
import {Lock} from "../component/Lock"
import {Distance} from "../component/Distance"
import {Hours} from "../component/Hours"
import {Minutes} from "../component/Minutes"
import {Seconds} from "../component/Seconds"
import {WorldRecords} from "../component/WorldRecords"
import {Modal} from "../component/Modal"
import {Speed} from "../component/Speed"

type State = Readonly<typeof initialState>

type Props = Readonly<{}>

type LockedInput = "time" | "pace-speed" | "distance"

// official world half-marathon record
const defaultTime: number = (58 * 60) + 23
const defaultDistance: number = 21.1

const initialState = {
    time: defaultTime, //seconds
    pace: defaultTime / defaultDistance, // seconds/km
    distance: defaultDistance, //km
    lockedInput: "distance" as LockedInput,
    showWorldRecordsModal: false ,
}

export class Pace extends React.Component<Props, State> {
    readonly state: State = initialState;

    changeTimeHandler = (newTime: number) => {
        this.setState((prevState: State) => {
            let newState = {
                ...prevState
            }

            if(newTime > 0) {
                if(prevState.lockedInput == "distance") {
                    newState['time'] = newTime
                    newState['pace'] = newTime / prevState['distance']
                } else if(prevState.lockedInput == "pace-speed") {
                    newState['time'] = newTime
                    newState['distance'] = newTime / prevState['pace']
                }
            }

            return newState
        })
    }

    changePaceHandler = (newPace: number) => {
        this.setState((prevState: State) => {
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

    changeSpeedHandler = (newSpeed: number) => {
        this.changePaceHandler(3600 / newSpeed);
    }

    changeDistanceHandler = (newDistance: number) => {
        this.setState((prevState: State) => {
            let newState = {
                ...prevState
            }

            if(newDistance > 0) {
                if(prevState.lockedInput == "time") {
                    newState['distance'] = newDistance
                    newState['pace'] = prevState['time'] / newDistance
                } else if(prevState.lockedInput == "pace-speed") {
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

    closeWorldRecordsModalWindow = () => {
        this.setState({
            showWorldRecordsModal: false
        })
    }

    showWorldRecords = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        this.setState({
            showWorldRecordsModal: true
        })
    }

    setTimeAndDistance = (distance: number, time: number) => {
        this.closeWorldRecordsModalWindow()

        this.setState({
            time: time,
            distance: distance,
            pace: time / distance,
        })
    }

    get timeTotal(): number {
        return this.state.time
    }

    get paceTotal(): number {
        return this.state.pace
    }

    get speedTotal(): number {
        return this.state.distance / (this.state.time / 3600);
    }

    get distanceTotal(): number {
        return this.state.distance
    }

    renderWorldRecordsModal = () => {


        if(this.state.showWorldRecordsModal) {
            return (
                <Modal onCloseHandler={this.closeWorldRecordsModalWindow}>
                    <WorldRecords onPickRecordHandler={this.setTimeAndDistance}/>
                </Modal>
            )
        }
    }

    render(): ReactNode {
        return (
            <div className="content">
                {this.renderWorldRecordsModal()}
                <h1>Running Pace Calculator</h1>

                <div className="block">
                    <Lock state={this.state.lockedInput == "distance"}
                          onClick={this.onLockClickHandler("distance")}
                    />
                    <span className="label">Distance</span>
                    <Distance distance={this.distanceTotal}
                              isLocked={this.state.lockedInput == "distance"}
                              onValueChangeHandler={this.changeDistanceHandler}
                    />
                    <span className="unit">km</span>
                    <a href="#"
                       className="world-records-link"
                       onClick={this.showWorldRecords}
                       title="Show world records"
                    >World Records</a>
                </div>
                <div className="block">
                    <Lock state={this.state.lockedInput == "time"}
                          onClick={this.onLockClickHandler("time")}
                    />
                    <span className="label">Time</span>
                    <Hours time={this.timeTotal}
                           isLocked={this.state.lockedInput == "time"}
                           onValueChangeHandler={this.changeTimeHandler}
                    />
                    <span className="separator">:</span>
                    <Minutes time={this.timeTotal}
                             isLocked={this.state.lockedInput == "time"}
                             onValueChangeHandler={this.changeTimeHandler}
                    />
                    <span className="separator">:</span>
                    <Seconds time={this.timeTotal}
                             isLocked={this.state.lockedInput == "time"}
                             onValueChangeHandler={this.changeTimeHandler}
                    />
                </div>
                <div className="block">
                    <Lock state={this.state.lockedInput == "pace-speed"}
                          onClick={this.onLockClickHandler("pace-speed")}
                    />
                    <span className="label">Pace</span>
                    <Minutes time={this.paceTotal}
                             isLocked={this.state.lockedInput == "pace-speed"}
                             onValueChangeHandler={this.changePaceHandler}
                    />
                    <span className="separator">:</span>
                    <Seconds time={this.paceTotal}
                             isLocked={this.state.lockedInput == "pace-speed"}
                             onValueChangeHandler={this.changePaceHandler}
                    />
                    <span className="unit">min/km</span>
                </div>
                <div className="block">
                    <Lock state={this.state.lockedInput == "pace-speed"}
                          onClick={this.onLockClickHandler("pace-speed")}
                    />
                    <span className="label">Speed</span>
                    <Speed speed={this.speedTotal}
                           isLocked={this.state.lockedInput == "pace-speed"}
                           onValueChangeHandler={this.changeSpeedHandler}
                    />
                    <span className="unit">km/h</span>
                </div>
            </div>
        )
    }
}
