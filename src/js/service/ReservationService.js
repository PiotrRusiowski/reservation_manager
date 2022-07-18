import Reservation from "../model/Reservation";

export default class ReservationService {


    constructor() {
    }

    static #reservations = [
        new Reservation(1, 'hostel', 10, 4, 10),
        new Reservation(2, 'hostel', 200, 1, 2),
        new Reservation(3, 'BANAN', 7, 2, 4)
    ]


    static #ID = 4

    static addReservation({price, guestNumber, hotelName, daysNumber}) {
        console.log({price, guestNumber, hotelName})
        const id = ReservationService.#ID++;
        ReservationService.#reservations.push(new Reservation(id, hotelName, price, guestNumber, daysNumber));
    }

    static deleteProduct(id) {
        const filteredProducts = ReservationService.#reservations.filter((r) => r.id === id)
        if (filteredProducts.length === 0) {
            throw new Error(`Cannot find product with id ${id}`);
        }
        const productToDelete = filteredProducts[0];
        const idxToDelete = ReservationService.#reservations.indexOf(productToDelete);
        ReservationService.#reservations.splice(idxToDelete, 1);
    }

    static getAllProducts() {
        return ReservationService.#reservations.map(({hotelName, guestNumber, price, daysNumber}, idx) => {
            return new Reservation(idx + 1, hotelName, guestNumber, price, daysNumber)
        })
    };

    static filterReservations(expression) {
        const expressionElements = expression.split(' ');
        const jsonFilteredProducts = new Set();
        expressionElements.forEach(expr => ReservationService.#reservations
            .filter(p => p.toString().toLowerCase().includes(expr.toLowerCase()))
            .map(p => p.json())
            .forEach(json => jsonFilteredProducts.add(json))
        )

        return [...jsonFilteredProducts].map(json => JSON.parse(json))
    }


}
