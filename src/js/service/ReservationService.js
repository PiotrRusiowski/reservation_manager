import Reservation from "../model/Reservation";
import HotelService from "./HotelService";

export default class ReservationService {


    static #reservations = [
        new Reservation(1, 'hostel', 10, 4, 10, '12-10-2022', '12-11-2022'),
        new Reservation(1, 'hostel2', 3, 50, 2, '12-10-2022', '12-11-2022'),

    ]


    static #ID = 4

    static addReservation({guestNumber, hotelName, checkIn, checkOut}) {
        const stayDays = Reservation.getStayDays(checkIn, checkOut);
        const price = Reservation.getTotalPrice(HotelService
            .findHotelByName(hotelName).price, +guestNumber, stayDays);
        const id = ReservationService.#ID++;
        ReservationService.#reservations.push(new Reservation(id, hotelName, guestNumber, stayDays, price, checkIn, checkOut));
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
        return ReservationService.#reservations.map((res, idx) => {
            return new Reservation(idx + 1, res.hotelName, res.guestNumber, res.price, res.stayDays, res.checkIn, res.checkOut)
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
