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
        'id': {type: 'number', label: 'ID'},
        'hotelName': {type: 'string', label: 'Hotel Name'},
        'price': {type: 'number', label: 'price'},
        'guestList': {type: 'number', label: 'guestList'},
    },

});
const filterManager = new FilterFormManager(filterReservations)

const formManager = new FormManager({
    id: 'my-form',
    formHeaderText: 'Add new product',
    formFields: [
        {type: 'number', labels: ['price']},
        {type: 'text', labels: ['name', 'surname', 'guestList']},
        {type: 'select', options: ['hotel 1', 'hotel 2', 'hotel 3', 'hotel 4']}

    ],
    submitButtonMessage: 'Add',
    submitCallback: loadReservation
});


loadReservation()


const form = formManager.createForm()
console.log(form)
const filterForm = filterManager.createForm()
addReservationForm.appendChild(form)
filterReservationForm.appendChild(filterForm)


