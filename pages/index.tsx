import React from 'react';
import {useState} from 'react';
import {Lock} from "../components/Lock"
import {Distance} from "../components/Distance"
import {Hours} from "../components/Hours"
import {Minutes} from "../components/Minutes"
import {Seconds} from "../components/Seconds"
import {WorldRecords} from "../components/WorldRecords"
import {Modal} from "../components/Modal"
import {Speed} from "../components/Speed"
import {ToggleButton} from "../components/ToggleButton"
import Head from "next/head";

import styles from '../styles/Home.module.scss'

type LockedInput = "time" | "pace-speed" | "distance"
type DistanceUnit = "km" | "mi"

// official world half-marathon record
const defaultTime: number = (58 * 60) + 23
const defaultDistance: number = 21.1

export default function Pace() {
  const [time, setTime] = useState<number>(defaultTime); //seconds
  const [distance, setDistance] = useState<number>(defaultDistance); //km
  const [lockedInput, setLockedInput] = useState<LockedInput>("distance");
  const [showWorldRecordModal, setShowWordRecordModal] = useState<boolean>(false);
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>("km");

  function changeTimeHandler(newTime: number) {
    if (newTime <= 0) {
      return
    }

    setTime(newTime);
  }

  function changePaceHandler(newPace: number) {
    if(newPace <= 0) {
      return
    }

    if (lockedInput == 'time') {
      setDistance(time / newPace)
    } else if (lockedInput == 'distance') {
      setTime(distance * newPace)
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
  }

  function timeTotal(): number {
    return time
  }

  function paceTotal(): number {
    return time / distance
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
      <>
        <Head>
          <title>Running Pace Calculator</title>
        </Head>
        <main className="content">
          {renderWorldRecordsModal()}
          <h1>Running Pace Calculator</h1>

          <ToggleButton leftText="km"
                        rightText="mi"
                        isChecked={distanceUnit == 'mi'}
                        onValueChange={onChangeDistanceUnit}
          />

          <div className={styles.block}>
            <Lock state={lockedInput == "distance"}
                  onClick={onLockClickHandler("distance")}
            />
            <span className={styles.label}>Distance</span>
            <Distance distance={distanceTotal()}
                      isLocked={lockedInput == "distance"}
                      onValueChangeHandler={changeDistanceHandler}
            />
            <span className={styles.unit}>{distanceUnit == 'km' ? 'km' : 'mi'}</span>
            <a href="#"
               className={styles.worldRecordsLink}
               onClick={showWorldRecords}
               title="Show world records"
            >World Records</a>
          </div>
          <div className={styles.block}>
            <Lock state={lockedInput == "time"}
                  onClick={onLockClickHandler("time")}
            />
            <span className={styles.label}>Time</span>
            <Hours time={timeTotal()}
                   isLocked={lockedInput == "time"}
                   onValueChangeHandler={changeTimeHandler}
            />
            <span className={styles.separator}>:</span>
            <Minutes time={timeTotal()}
                     isLocked={lockedInput == "time"}
                     onValueChangeHandler={changeTimeHandler}
            />
            <span className={styles.separator}>:</span>
            <Seconds time={timeTotal()}
                     isLocked={lockedInput == "time"}
                     onValueChangeHandler={changeTimeHandler}
            />
          </div>
          <div className={styles.block}>
            <Lock state={lockedInput == "pace-speed"}
                  onClick={onLockClickHandler("pace-speed")}
            />
            <span className={styles.label}>Pace</span>
            <Minutes time={paceTotal()}
                     isLocked={lockedInput == "pace-speed"}
                     onValueChangeHandler={changePaceHandler}
            />
            <span className={styles.separator}>:</span>
            <Seconds time={paceTotal()}
                     isLocked={lockedInput == "pace-speed"}
                     onValueChangeHandler={changePaceHandler}
            />
            <span className={styles.unit}>{distanceUnit == 'km' ? 'min/km' : 'min/mi'}</span>
          </div>
          <div className={styles.block}>
            <Lock state={lockedInput == "pace-speed"}
                  onClick={onLockClickHandler("pace-speed")}
            />
            <span className={styles.label}>Speed</span>
            <Speed speed={speedTotal()}
                   isLocked={lockedInput == "pace-speed"}
                   onValueChangeHandler={changeSpeedHandler}
            />
            <span className={styles.unit}>{distanceUnit == 'km' ? 'km/h' : 'mi/h'}</span>
          </div>
        </main>
      </>
  )
}
