import FormManager from "./dom/FormManager";
import '../css/index.css'
import 'bootstrap';
import TableManager from "./dom/TableManager";
import ReservationService from "./service/ReservationService";
import FilterFormManager from "./dom/FilterFormManager";


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

console.log(process.env.USER_ID)
const deleteReservation = (e) => {
    ReservationService.deleteProduct(Number(e.target.getAttribute('reservationId')));
    loadReservation()
}
const filterReservations = (e) => {
    removeOldTable()
    const table = tableManager.createTable(ReservationService.filterReservations(e.target.value))
    reservationTable.appendChild(table)
}
const sortReservation = (e) => {
    removeOldTable()
    const table = tableManager.createTable(reservationServie.sortReservation(e.target.className))
    reservationTable.appendChild(table)
}

const tableManager = new TableManager(deleteReservation, sortReservation)
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


