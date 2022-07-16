import ReservationService from "../service/ReservationService";

export default class FormManager {
    #id;
    #formElement = [];
    #submitButtonMessage = 'Send';
    #submitCallback;
    #formHeaderText = '';
    #formState = {};
    #formFields = [];


    constructor({
                    id,
                    textFields = [],
                    submitButtonMessage = 'SEND',
                    submitCallback = function () {
                    },
                    formHeaderText = '',
                    formFields = {}
                }) {
        this.#id = id;
        this.#submitButtonMessage = submitButtonMessage;
        this.#submitCallback = submitCallback;
        this.#formHeaderText = formHeaderText;
        this.#formFields = formFields
    }

    createForm() {
        const formElement = document.createElement('form');
        formElement.id = this.#id;
        this.#formElement = formElement;
        const formHeader = document.createElement('h3');
        formHeader.className = 'mt-3';
        formHeader.textContent = this.#formHeaderText;
        formElement.appendChild(formHeader);

        this.#formFields.forEach((el) => this.#createFormFields(el))

        formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            console.log(this.#formState)
            ReservationService.addReservation(this.#formState);
            this.#submitCallback();

        })
        formElement.appendChild(FormManager.#createSubmitButton(this.#submitButtonMessage));
        return formElement

    }

    #createFormFields(formField) {
        const {type} = formField
        switch (type) {
            case 'number':
                return this.#createTextAndNumberField(formField)
            case 'text':
                return this.#createTextAndNumberField(formField)

        }

    }


    #createTextAndNumberField({labels, type}) {
        return labels.forEach((label) => {
            const idLowerCase = label.toLowerCase();

            const formGroupElement = document.createElement('div');
            formGroupElement.className = 'form-group';


            const labelElement = document.createElement('label');
            labelElement.setAttribute('for', `${idLowerCase}`);
            labelElement.textContent = idLowerCase
            formGroupElement.appendChild(labelElement);

            const inputElement = document.createElement('input');
            inputElement.id = idLowerCase;
            inputElement.type = type;
            inputElement.className = 'form-control'
            formGroupElement.appendChild(inputElement)

            inputElement.addEventListener('input', (e) => {
                const inputValue = {};
                inputValue[idLowerCase] = e.target.value;
                this.#formState = {...this.#formState, ...inputValue}
            })
            this.#formElement.appendChild(formGroupElement)
        })
    }

    static #createSubmitButton(message) {
        const formattedMessage = message.toUpperCase();
        const buttonElement = document.createElement('button');
        buttonElement.className = 'btn btn-success mt-2'
        buttonElement.setAttribute('type', 'submit');
        buttonElement.textContent = formattedMessage;

        return buttonElement;
    }
}
