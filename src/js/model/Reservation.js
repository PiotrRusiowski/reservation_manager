export default class Reservation {
    constructor(id, hotelName, guestNumber, price, daysNumber) {
        this.id = id
        this.hotelName = hotelName
        this.guestNumber = guestNumber
        this.price = price
        this.daysNumber = daysNumber
    }

    toString() {
        return `${this.id}${this.hotelName}${this.guestNumber}${this.price}`
    }

    json() {
        return JSON.stringify(this)
    }
}