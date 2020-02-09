import {AxiosResponse, default as Axios} from "axios"

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

export async function getAthletes(): Promise<AxiosResponse<AthleteType[]>> {
    return await Axios.get("/api/athletes.json")
}