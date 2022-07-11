import Reservation from "../model/Reservation";

export default class ReservationService {
    #sortState = {
        hotelNameReversed: false,
        priceReversed: false
    }

    constructor() {
    }

    static #reservations = [
        new Reservation(1, 'hostel', 10, 4),
        new Reservation(2, 'hostel', 200, 1),
        new Reservation(3, 'BANAN', 7, 2)
    ]

    /*#products = {
        1: new Product(1, 'PRODUCT A', 1000, 'A'),
        2: new Product(2, 'PRODUCT B', 2000, 'B'),
        3: new Product(3, 'PRODUCT C', 3000, 'C')
    }*/

    /*#products = new Map(
        [1, new Product(1, 'PRODUCT A', 1000, 'A')],
        [2, new Product(2, 'PRODUCT B', 2000, 'B')],
        [3, new Product(3, 'PRODUCT C', 3000, 'C')]
    );*/

    static #ID = 4

    static addReservation({name, price, category}) {
        const id = ReservationService.#ID++;
        ReservationService.#reservations.push(new Reservation(id, name, price, category));
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
        // const client = contentful.createClient({
        //     accessToken: 'cJJxb2Fhyuv_4FbjPkqK775QONkUCNs8D-Mhq_LTvyI',
        //     space: 'sqqzspaai3js',
        // })
        //
        // client.getEntries({
        //     content_type: "product",
        // })
        //     .then((res) => console.log(res))
        //     .catch((error) => console.error(error));
        return ReservationService.#reservations
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

    sortReservation(thClassName) {
        switch (thClassName) {
            case 'th-hotelName': {
                return this.#sortLexicalReservation()
            }
            case 'th-price':
                return ReservationService.#numericSortReservation()
            default:
                return ReservationService.#reservations

        }
    }

    static #numericSortReservation() {
        return ReservationService.#reservations.sort((a, b) => a.price - b.price)
    }

    #sortLexicalReservation() {

        console.log(this.#sortState)
        return ReservationService.#reservations.sort((a, b) =>
            a.hotelName.localeCompare(b.hotelName));
    }


}
