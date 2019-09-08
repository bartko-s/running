import {AxiosPromise, default as Axios} from "axios"

type AthleteType = {
    distance: number
    time: number
    location_abbr: string
    location: string
    data: number
    gender: "male" | "female"
    name: string
    nationality: string
    nationality_abbr: string
}

export const getAthletes = (): AxiosPromise<AthleteType[]> => {
    return Axios.get("/api/athletes.json")
}