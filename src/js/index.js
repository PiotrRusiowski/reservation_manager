import FormManager from "./dom/FormManager";
import '../css/index.css'
import 'bootstrap';

const addReservationForm = document.querySelector('.add-Reservation-Form');
console.log(addReservationForm)
const formManager = new FormManager({
    id: 'my-form',
    formHeaderText: 'Add new product',
    textFields: ['name', 'price', 'category'],
    submitButtonMessage: 'Add',
    // submitCallback: loadProducts
})
const form = formManager.createForm()
addReservationForm.appendChild(form)


