export const formatTimeDigits = (val: number): string => {
    if(val <= 9) {
        return "0" + val.toString()
    } else {
        return val.toString()
    }
}