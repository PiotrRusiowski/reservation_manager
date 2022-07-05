export default class Reservation {
    constructor(id, hotelName, guessList, price) {
        this.id = id
        this.hotelName = hotelName
        this.guessList = guessList
        this.price = price
    }

    toString() {
        return `${this.id}${this.hotelName}${this.guessList}${this.price}`
    }

    json() {
        return JSON.stringify(this)
    }
}