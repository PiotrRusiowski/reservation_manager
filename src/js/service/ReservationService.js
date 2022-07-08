import Reservation from "../model/Reservation";

// TODO Dla osob ktore ucza sie backendu zrobic REST API
export default class ReservationService {
    static #reservations = [
        new Reservation(1, 'TRUSKAWKA', 10, 'A'),
        new Reservation(2, 'CZERESNIA', 200, 'B'),
        new Reservation(3, 'BANAN', 7, 'C')
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
        return ReservationService.#reservations;
    }

    static filterReservations(expression) {
        // Ktos moze wpisywac kilka slow kluczowych np podawanych po spacji
        const expressionElements = expression.split(' ');

        // Podajac np expression o wartosci 'prod a' dostaniemy tablice ['prod', 'a']
        // Potem bedziemy chcieli kazdy element tej tablicy sprawdzic, czy wystepuje w
        // naszych produktach,alemoze byc ze produkty sie powwtorza, dlatego zeby finalnie
        // nam sie nic nie powtorzylo zastosujemy kolekcje Set

        const jsonFilteredProducts = new Set();
        expressionElements.forEach(expr => ReservationService.#reservations
            .filter(p => p.toString().toLowerCase().includes(expr.toLowerCase()))
            .map(p => p.json())
            .forEach(json => jsonFilteredProducts.add(json))
        )

        return [...jsonFilteredProducts].map(json => JSON.parse(json))
    }

    static sortLexicalReservation() {
        let isReverse = false
        const sortReservation = ReservationService.#reservations.sort((a, b) =>
            a.hotelName.localeCompare(b.hotelName));
        if (!isReverse) {
            return sortReservation
        } else
            sortReservation.reverse()
    }

}
