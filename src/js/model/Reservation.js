import dayjs from "dayjs";


export default class Reservation {
    constructor(id, hotelName, guestNumber, price, stayDays, checkIn, checkOut) {
        this.id = id
        this.hotelName = hotelName
        this.guestNumber = guestNumber
        this.price = price
        this.stayDays = stayDays
        this.checkIn = checkIn
        this.checkOut = checkOut


    }


    static getTotalPrice(price, guestNumber, daysNumber) {
        return price * guestNumber * daysNumber
    }


    static getStayDays(checkIn, checkOut) {
        const date1 = dayjs(checkOut)
        return date1.diff(checkIn, 'd')
    }

    toString() {
        return `${this.id}${this.hotelName}${this.guestNumber}${this.price}`
    }

    json() {
        return JSON.stringify(this)
    }
}