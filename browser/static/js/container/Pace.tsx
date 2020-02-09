import React from 'react';
import {useEffect, useState} from 'react';
import {Lock} from "../component/Lock"
import {Distance} from "../component/Distance"
import {Hours} from "../component/Hours"
import {Minutes} from "../component/Minutes"
import {Seconds} from "../component/Seconds"
import {WorldRecords} from "../component/WorldRecords"
import {Modal} from "../component/Modal"
import {Speed} from "../component/Speed"
import {ToggleButton} from "../component/ToggleButton"

type LockedInput = "time" | "pace-speed" | "distance"
type DistanceUnit = "km" | "mi"

// official world half-marathon record
const defaultTime: number = (58 * 60) + 23
const defaultDistance: number = 21.1

export function Pace() {
    const [time, setTime] = useState(defaultTime); //seconds
    const [pace, setPace] = useState(defaultTime / defaultDistance); //seconds/km
    const [distance, setDistance] = useState(defaultDistance); //km
    const [lockedInput, setLockedInput] = useState("distance" as LockedInput);
    const [showWorldRecordModal, setShowWordRecordModal] = useState(false);
    const [distanceUnit, setDistanceUnit] = useState("km" as DistanceUnit);

    useEffect(() => {
        if(lockedInput == "distance") {
            setPace(time / distance)
        } else if(lockedInput == "pace-speed") {
            setDistance(time / pace)
        }
    }, [time])

    useEffect(() => {
        if(lockedInput == "time") {
            setDistance(time / pace)
        } else if(lockedInput == "distance") {
            setTime(pace * distance)
        }
    }, [pace])

    useEffect(() => {
        if(lockedInput == "time") {
            setPace(time / distance)
        } else if(lockedInput == "pace-speed") {
            setTime(distance * pace)
        }
    }, [distance])

    function changeTimeHandler(newTime: number) {
        if (newTime > 0) {
            setTime(newTime);
        }
    }

    function changePaceHandler(newPace: number) {
        if(newPace > 0) {
            setPace(newPace);
        }
    }

    function changeSpeedHandler(newSpeed: number) {
        changePaceHandler(3600 / newSpeed);
    }

    function changeDistanceHandler(newDistance: number) {
        if(newDistance > 0) {
            setDistance(newDistance)
        }
    }

    function onLockClickHandler(type: LockedInput): () => void {
        return () => {
            setLockedInput(type)
        }
    }

    function convertMilesToKilometres(distance: number) {
        return distance * 1.609344;
    }

    function convertKilometersToMiles(distance: number) {
        return distance / 1.609344;
    }

    function onChangeDistanceUnit() {
        if(distanceUnit == 'km') {
            setDistanceUnit('mi')
            setDistance(convertKilometersToMiles(distance))
        } else {
            setDistanceUnit('km')
            setDistance(convertMilesToKilometres(distance))
        }
    }

    function closeWorldRecordsModalWindow() {
        setShowWordRecordModal(false);
    }

    function showWorldRecords(e: React.MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();
        setShowWordRecordModal(true);
    }

    function setTimeAndDistance(distance: number, time: number) {
       closeWorldRecordsModalWindow()

        if(distanceUnit == 'mi') {
            distance = convertKilometersToMiles(distance);
        }

        setTime(time);
        setDistance(distance);
        setPace(time / distance);
    }

    function timeTotal(): number {
        return time
    }

    function paceTotal(): number {
        return pace
    }

    function speedTotal(): number {
        return distance / (time / 3600);
    }

    function distanceTotal(): number {
        return distance
    }

    function renderWorldRecordsModal() {
        if (showWorldRecordModal) {
            return (
                <Modal onCloseHandler={closeWorldRecordsModalWindow}>
                    <WorldRecords onPickRecordHandler={setTimeAndDistance}/>
                </Modal>
            );
        }
    }

    return (
        <div className="content">
             {renderWorldRecordsModal()}
             <h1>Running Pace Calculator</h1>

             <ToggleButton leftText="km"
                           rightText="mi"
                           isChecked={distanceUnit == 'mi'}
                           onValueChange={onChangeDistanceUnit}
             />

             <div className="block">
                 <Lock state={lockedInput == "distance"}
                       onClick={onLockClickHandler("distance")}
                 />
                 <span className="label">Distance</span>
                 <Distance distance={distanceTotal()}
                           isLocked={lockedInput == "distance"}
                           onValueChangeHandler={changeDistanceHandler}
                 />
                 <span className="unit">{distanceUnit == 'km' ? 'km' : 'mi'}</span>
                 <a href="#"
                    className="world-records-link"
                    onClick={showWorldRecords}
                    title="Show world records"
                 >World Records</a>
             </div>
             <div className="block">
                 <Lock state={lockedInput == "time"}
                       onClick={onLockClickHandler("time")}
                 />
                 <span className="label">Time</span>
                 <Hours time={timeTotal()}
                        isLocked={lockedInput == "time"}
                        onValueChangeHandler={changeTimeHandler}
                 />
                 <span className="separator">:</span>
                 <Minutes time={timeTotal()}
                          isLocked={lockedInput == "time"}
                          onValueChangeHandler={changeTimeHandler}
                 />
                 <span className="separator">:</span>
                 <Seconds time={timeTotal()}
                          isLocked={lockedInput == "time"}
                          onValueChangeHandler={changeTimeHandler}
                 />
             </div>
             <div className="block">
                 <Lock state={lockedInput == "pace-speed"}
                       onClick={onLockClickHandler("pace-speed")}
                 />
                 <span className="label">Pace</span>
                 <Minutes time={paceTotal()}
                          isLocked={lockedInput == "pace-speed"}
                          onValueChangeHandler={changePaceHandler}
                 />
                 <span className="separator">:</span>
                 <Seconds time={paceTotal()}
                          isLocked={lockedInput == "pace-speed"}
                          onValueChangeHandler={changePaceHandler}
                 />
                 <span className="unit">{distanceUnit == 'km' ? 'min/km' : 'min/mi'}</span>
             </div>
             <div className="block">
                 <Lock state={lockedInput == "pace-speed"}
                       onClick={onLockClickHandler("pace-speed")}
                 />
                 <span className="label">Speed</span>
                 <Speed speed={speedTotal()}
                        isLocked={lockedInput == "pace-speed"}
                        onValueChangeHandler={changeSpeedHandler}
                 />
                 <span className="unit">{distanceUnit == 'km' ? 'km/h' : 'mi/h'}</span>
             </div>
        </div>
    )
}
