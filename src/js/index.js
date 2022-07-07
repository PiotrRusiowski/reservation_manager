import FormManager from "./dom/FormManager";
import '../css/index.css'
import 'bootstrap';
import TableManager from "./dom/TableManager";
import ReservationService from "./service/ReservationService";
import FilterFormManager from "./dom/FilterFormManager";


const reservationTable = document.querySelector('.reservation-table')
const addReservationForm = document.querySelector('.add-reservation-form');
const filterReservationForm = document.querySelector('.filters-form')

const loadReservation = () => {
    const oldTable = reservationTable.firstElementChild;
    oldTable && reservationTable.removeChild(oldTable)
    const table = tableManager.createTable(ReservationService.getAllProducts())
    reservationTable.appendChild(table)

}
const deleteReservation = (e) => {
    ReservationService.deleteProduct(Number(e.target.getAttribute('reservationId')));
    loadReservation()
}
const tableManager = new TableManager(deleteReservation)
loadReservation()


const formManager = new FormManager({
    id: 'my-form',
    formHeaderText: 'Add new product',
    textFields: ['name', 'price', 'category'],
    submitButtonMessage: 'Add',
    submitCallback: loadReservation
});

const filterManager = new FilterFormManager({id: 'filter-id'})


const form = formManager.createForm()
const filterForm = filterManager.createForm()
console.log(filterForm)
addReservationForm.appendChild(form)
filterReservationForm.appendChild(filterForm)


