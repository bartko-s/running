import React from 'react';
import {useEffect, useState} from 'react';
import {getAthletes} from "../api"
import {secondsToFullTime} from "../utilities"

import styles from './WorldRecords.module.scss'

type Props = Readonly<{
    onPickRecordHandler: (distance: number, time: number) => void
}>

const initialState = {
    athletes: [] as Array<{
        distance: number
        time: number
        location_abbr: string
        location: string
        data: number
        gender: "male" | "female"
        name: string
        nationality: string
        nationality_abbr: string
    }>,
    loading: true
}

export function WorldRecords(props: Props) {
    const [loading, setLoading] = useState(initialState.loading);
    const [athletes, setAthletes] = useState(initialState.athletes);

    useEffect( () => {
        (async () => {
            const result = await getAthletes();
            setAthletes(result.data);
            setLoading(false);
        })()
    }, []);

    function renderRecords() {
        if(loading) {
            return '...loading'
        }

        return athletes.map((item) => {
            return (
                <div className={styles.item}
                     key={item.time + item.gender + item.distance}
                >
                    <div className={styles.distance}>{Math.round(item.distance * 100) / 100} km</div>
                    <div className={styles.center}>
                        <div>
                                <span className={[styles.gender, item.gender.toLowerCase() == 'male' ? styles.genderMale : styles.genderFemale].join(' ')}
                                      title={item.gender.toUpperCase()}
                                />
                            &nbsp;
                            <span>{item.name}</span>
                            &nbsp;
                            <span className={[styles.flag, styles['flagX'+ item.nationality_abbr.toLowerCase()]].join(' ')}
                                  title={item.nationality}
                            >{item.nationality_abbr}</span>
                        </div>
                        <div>
                            <span>{secondsToFullTime(item.time)}</span>
                            &nbsp;
                            <span className={[styles.flag, styles['flagX'+ item.location_abbr.toLowerCase()]].join(' ')}
                                  title={item.location}
                            >{item.location_abbr}</span>
                            &nbsp;
                            <span>({item.data})</span>
                        </div>
                    </div>
                    <div className={styles.pick}>
                        <button onClick={() => {props.onPickRecordHandler(item.distance, item.time)}}
                                className={styles.button}
                        >Pick</button>
                    </div>
                </div>
            )
        })
    }

    return (
        <>
            <h1>World Records</h1>
            {renderRecords()}
        </>
    )
}
