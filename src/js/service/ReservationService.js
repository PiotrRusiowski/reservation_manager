import Reservation from "../model/Reservation";

export default class ReservationService {


    constructor() {
    }

    static #reservations = [
        new Reservation(1, 'hostel', 10, 4),
        new Reservation(2, 'hostel', 200, 1),
        new Reservation(3, 'BANAN', 7, 2)
    ]


    static #ID = 4

    static addReservation({name, price, guestList, hotelName}) {
        console.log(hotelName)
        const id = ReservationService.#ID++;
        ReservationService.#reservations.push(new Reservation(id, hotelName, price, guestList));
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

        return ReservationService.#reservations.map((el, idx) =>
            new Reservation(idx + 1, el.hotelName, el.guestList, el.price))
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
