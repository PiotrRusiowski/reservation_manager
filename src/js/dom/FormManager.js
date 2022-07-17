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
                this.#createTextAndNumberField(formField)
                break
            case 'text':
                this.#createTextAndNumberField(formField)
                break
            case 'select':
                this.#createSelectField(formField)
        }

    }


    #createTextAndNumberField({labels, type}) {
        return labels.forEach((label) => {
            const idLowerCase = label.charAt(0).toLowerCase() + label.slice(1)
            const formGroupElement = FormManager.#createFormGroupElement();

            const labelElement = document.createElement('label');
            labelElement.setAttribute('for', `${idLowerCase}`);
            labelElement.textContent = idLowerCase
            formGroupElement.appendChild(labelElement);

            const inputElement = document.createElement('input');
            inputElement.id = idLowerCase;
            inputElement.type = type;
            inputElement.className = 'form-control'
            formGroupElement.appendChild(inputElement)

            inputElement.addEventListener('input', (e) => this.#setState(e, idLowerCase))
            this.#formElement.appendChild(formGroupElement)
        })
    }

    #createSelectField({label, options}) {
        const formGroupElement = FormManager.#createFormGroupElement();
        this.#formElement.appendChild(formGroupElement)

        const selectElement = document.createElement('select');
        selectElement.id = label
        selectElement.className = 'form-control'
        formGroupElement.appendChild(selectElement)
        options.forEach((option) => {
            const optionElement = document.createElement('option')
            optionElement.textContent = option
            return selectElement.appendChild(optionElement);
        })
        selectElement.addEventListener('change', (e) => this.#setState(e, label))
        return formGroupElement

    }

    static #createSubmitButton(message) {
        const formattedMessage = message.toUpperCase();
        const buttonElement = document.createElement('button');
        buttonElement.className = 'btn btn-success mt-2'
        buttonElement.setAttribute('type', 'submit');
        buttonElement.textContent = formattedMessage;

        return buttonElement;
    }

    static #createFormGroupElement() {
        const formGroupElement = document.createElement('div');
        formGroupElement.className = 'form-group';
        return formGroupElement;

    }

    #setState(e, name) {
        const inputValue = {};
        inputValue[name] = e.target.value;
        this.#formState = {...this.#formState, ...inputValue}
    }
}
