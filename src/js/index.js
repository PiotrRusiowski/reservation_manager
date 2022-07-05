import FormManager from "./dom/FormManager";
import '../css/index.css'
import 'bootstrap';
import TableManager from "./dom/TableManager";
import ReservationService from "./service/ReservationService";

const reservationTable = document.querySelector('.reservation-table')
const addReservationForm = document.querySelector('.add-reservation-form');
const tableManager = new TableManager()
const reservationService = new ReservationService()

const loadReservation = () => {
    const oldTable = reservationTable.firstElementChild;
    oldTable && reservationTable.removeChild(oldTable)
    const table = tableManager.createTable(ReservationService.getAllProducts())
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


const form = formManager.createForm()
addReservationForm.appendChild(form)


