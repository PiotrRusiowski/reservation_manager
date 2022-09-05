import FormManager from "./dom/FormManager";
import '../css/index.css'
import * as bootstrap from 'bootstrap';
import TableManager from "./dom/TableManager";
import ReservationService from "./service/ReservationService";
import FilterFormManager from "./dom/FilterFormManager";
import HotelService from "./service/HotelService";
import Reservation from "./model/Reservation";
import dayjs from "dayjs"
import sanityClient from "./client/client";
import {log} from "util";

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

const reservationTable = document.querySelector('.reservation-table');
const addReservationForm = document.querySelector('.add-reservation-form');
const filterReservationForm = document.querySelector('.filters-form');
const getBtn = document.querySelector('.getBtn');
const hotelService = new HotelService()
const reservationServie = new ReservationService()

// getBtn.addEventListener("click", () => {
//     sanityClient
//         .create({
//             title: "bike",
//             id: "asd",
//         })
//         .then((res) => {
//             console.log(`Bike was created, document ID is ${res._id}`);
//         });
// });

const removeOldTable = () => {
    const oldTable = reservationTable.firstElementChild;
    return oldTable && reservationTable.removeChild(oldTable)
}
const loadReservation = () => {
    removeOldTable()
    const table = tableManager.createTable(ReservationService.getAllProducts())
    reservationTable.appendChild(table)
}
const deleteReservation = (e) => {
    removeOldTable()
    ReservationService.deleteProduct(Number(e.target.getAttribute('reservationId')));
    loadReservation()
}

const filterReservations = (e) => {
    removeOldTable()
    const table = tableManager.createTable(ReservationService.filterReservations(e.target.value))
    reservationTable.appendChild(table)
}

const tableManager = new TableManager({
    rowClickCallback: deleteReservation,
    sortKey: 'id',
    columns: {
        id: {type: 'number', label: 'ID'},
        hotelName: {type: 'string', label: 'HotelName'},
        guestNumber: {type: 'number', label: 'guestNumber'},
        stayDays: {type: 'number', label: 'stayDays'},
        price: {type: 'number', label: 'price'},
        checkIn: {type: 'number', label: 'checkIn'},
        checkOut: {type: 'number', label: 'checkOut'}
    },

});
const filterManager = new FilterFormManager(filterReservations)

const formManager = new FormManager({
    id: 'my-form',
    formHeaderText: 'Add new reservation',
    formFields: [
        {type: 'number', labels: ['guestNumber']},
        {
            type: 'select',
            label: 'hotelName',
            options: new HotelService.getAllHotels(),
        },
        {type: 'date', labels: ['checkIn', 'checkOut']}

    ],

    submitButtonMessage: 'Add',
    submitCallback: () => {
        console.log(formManager.getFormState())
        ReservationService.addReservation(formManager.getFormState())
        loadReservation()
    }


});
getBtn.addEventListener('click', () => {
    console.log(hotelService.getHotelsFromServer(formManager))
})


loadReservation()


const formLoading = async () => {
    await hotelService.getHotelsFromServer()
    return formManager.createForm()
}
const form = formLoading().then((el) => {
    addReservationForm.appendChild(el)
})
const filterForm = filterManager.createForm()

filterReservationForm.appendChild(filterForm)


