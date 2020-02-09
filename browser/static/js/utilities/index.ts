export function formatTimeDigits(val: number): string {
    if(val <= 9) {
        return "0" + val.toString()
    } else {
        return val.toString()
    }
}

export function secondsToFullTime(time: number): string {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time - (hours * 3600)) / 60)
    const seconds = Math.round((time - (minutes * 60) - (hours * 3600)) * 100) / 100

    const formattedSeconds = (hours > 0 || minutes > 0) ? formatTimeDigits(seconds) : seconds
    const formattedMinutes = (hours > 0) ? formatTimeDigits(minutes) : minutes

    let result = "" + formattedSeconds

    if(minutes > 0 || hours > 0) {
        result =  formattedMinutes + ":" + result
    }

    if(hours > 0) {
        result = hours + ":" + result
    }

    return result
}