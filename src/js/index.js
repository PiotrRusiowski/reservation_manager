import FormManager from "./dom/FormManager";
import '../css/index.css'
import * as bootstrap from 'bootstrap';
import TableManager from "./dom/TableManager";
import ReservationService from "./service/ReservationService";
import FilterFormManager from "./dom/FilterFormManager";
import HotelService from "./service/HotelService";

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

const reservationTable = document.querySelector('.reservation-table');
const addReservationForm = document.querySelector('.add-reservation-form');
const filterReservationForm = document.querySelector('.filters-form');
const reservationServie = new ReservationService()

const removeOldTable = () => {
    const oldTable = reservationTable.firstElementChild;
    return oldTable && reservationTable.removeChild(oldTable)
    console.log("remove")
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
        hotelName: {type: 'string', label: 'Hotel Name'},
        guestNumber: {type: 'number', label: 'guestNumber'},
        daysNumber: {type: 'number', label: 'daysNumber'},
        price: {type: 'number', label: 'price'},


    },

});
const filterManager = new FilterFormManager(filterReservations)

const formManager = new FormManager({
    id: 'my-form',
    formHeaderText: 'Add new reservation',
    formFields: [
        {type: 'number', labels: ['guestNumber', 'daysNumber']},
        {
            type: 'select',
            label: 'hotelName',
            options: new HotelService.getAllHotels(),
        },
        {type: 'date', labels: ['checkIn', 'checkOut']}

    ],
    submitButtonMessage: 'Add',
    submitCallback: ({hotelName, guestNumber, daysNumber}) => {
        ReservationService.addReservation
        (formManager.setState(HotelService.findHotelByName(hotelName)
            .getTotalPrice(+guestNumber, +daysNumber), 'price'));

        loadReservation()
    }
});


loadReservation()


const form = formManager.createForm()
const filterForm = filterManager.createForm()
addReservationForm.appendChild(form)
filterReservationForm.appendChild(filterForm)


