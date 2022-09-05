import Hotel from "../model/Hotel";
import sanityClient from "../client/client";
import {log} from "util";

const query = '*[_type == "product"]'
export default class HotelService {
    static #hotels = []
    static #ID = 5

    static getAllHotels() {

        return HotelService.#hotels
    }

    async getHotelsFromServer() {
        await sanityClient.fetch(query).then((hotel) => hotel.map((hotel) => {
            HotelService.#hotels.push(new Hotel(hotel._id, hotel.title, 22))
        }))

    }

    static findHotelByName(name) {
        return HotelService.#hotels.filter((hotel) => hotel.name === name)[0]
    }

}