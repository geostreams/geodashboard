// @flow
import { timeDays, timeYears } from 'd3'

export const getBinType = (startDate: Date, endDate: Date): string => {
    const diffYears = timeYears(startDate, endDate).length
    const diffDays = timeDays(startDate, endDate).length
    let binType = 'day'
    if (diffYears > 10) {
        binType = 'year'
    } else if (diffYears > 2) {
        binType = 'month'
    } else if (diffDays > 3 && diffDays <= 14) {
        binType = 'hour'
    }

    return binType
}
