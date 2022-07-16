export default class Reservation {
    constructor(id, hotelName, guestList, price) {
        this.id = id
        this.hotelName = hotelName
        this.guestList = guestList
        this.price = price
    }

    toString() {
        return `${this.id}${this.hotelName}${this.guestList}${this.price}`
    }

    json() {
        return JSON.stringify(this)
    }
}