import FormManager from "./dom/FormManager";
import '../css/index.css'
import * as bootstrap from 'bootstrap';
import TableManager from "./dom/TableManager";
import ReservationService from "./service/ReservationService";
import FilterFormManager from "./dom/FilterFormManager";

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
const tableManager = new TableManager({
    rowClickCallback: deleteReservation,
    sortKey: 'id',
    columns: {
        'id': {type: 'number', label: 'ID'},
        'hotelName': {type: 'string', label: 'Hotel Name'},
        'price': {type: 'number', label: 'price'},
        'guessList': {type: 'number', label: 'guestList'},
    },

})

const loadReservation = () => {
    // removeOldTable()
    const table = tableManager.createTable(ReservationService.getAllProducts())
    reservationTable.appendChild(table)
}

const deleteReservation = (e) => {
    ReservationService.deleteProduct(Number(e.target.getAttribute('reservationId')));
    loadReservation()
}
const filterReservations = (e) => {
    removeOldTable()
    const table = tableManager.createTable(ReservationService.filterReservations(e.target.value))
    reservationTable.appendChild(table)
}


loadReservation()

const formManager = new FormManager({
    id: 'my-form',
    formHeaderText: 'Add new product',
    textFields: ['name', 'price', 'category'],
    submitButtonMessage: 'Add',
    submitCallback: loadReservation
});

const filterManager = new FilterFormManager(filterReservations)


const form = formManager.createForm()
const filterForm = filterManager.createForm()
addReservationForm.appendChild(form)
filterReservationForm.appendChild(filterForm)


