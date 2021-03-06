import Hotel from "../model/Hotel";

export default class HotelService {
    static #hotels = [
        new Hotel(1, 'h1', 200),
        new Hotel(2, 'Hotel zacisze', 200),
        new Hotel(3, 'Motel', 200),
        new Hotel(4, 'Hilton', 200),
    ]
    static #ID = 5

    static getAllHotels() {

        return HotelService.#hotels
    }

    static findHotelByName(name) {
        return HotelService.#hotels.filter((hotel) => hotel.name === name)[0]
    }

}