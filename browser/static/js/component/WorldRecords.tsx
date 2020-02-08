import React from 'react';
import {useEffect, useState} from 'react';
import {getAthletes} from "../api"
import {secondsToFullTime} from "../utilities"

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

export const WorldRecords = (props: Props) => {
    const [loading, setLoading] = useState(initialState.loading);
    const [athletes, setAthletes] = useState(initialState.athletes);

    useEffect( () => {
        (async () => {
            const result = await getAthletes();
            setAthletes(result.data);
            setLoading(false);
        })()
    }, []);

    const renderRecords = () => {
        if(loading) {
            return '...loading'
        }

        return athletes.map((item) => {
            return (
                <div className="world-record__item"
                     key={item.time + item.gender + item.distance}
                >
                    <div className="world-record__distance">{Math.round(item.distance * 100) / 100} km</div>
                    <div className="world-record__center">
                        <div>
                                <span className={"world-record__gender world-record__gender--" + item.gender.toLowerCase()}
                                      title={item.gender.toUpperCase()}
                                />
                            &nbsp;
                            <span>{item.name}</span>
                            &nbsp;
                            <span className={"world-record__flag world-record__flag--" + item.nationality_abbr.toLowerCase()}
                                  title={item.nationality}
                            >{item.nationality_abbr}</span>
                        </div>
                        <div>
                            <span>{secondsToFullTime(item.time)}</span>
                            &nbsp;
                            <span className={"world-record__flag world-record__flag--" + item.location_abbr.toLowerCase()}
                                  title={item.location}
                            >{item.location_abbr}</span>
                            &nbsp;
                            <span>({item.data})</span>
                        </div>
                    </div>
                    <div className="world-record__pick">
                        <button onClick={() => {props.onPickRecordHandler(item.distance, item.time)}}
                                className="button"
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
