import ReservationService from "../service/ReservationService";

export default class FormManager {
    #id;
    #textFields = [];
    #submitButtonMessage = 'Send';
    #submitCallback;
    #formHeaderText = '';
    #formState = {};
    #formFields


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
        this.#textFields = textFields;
        this.#submitButtonMessage = submitButtonMessage;
        this.#submitCallback = submitCallback;
        this.#formHeaderText = formHeaderText;
        this.#formFields = formFields
    }

    createForm() {
        console.log(this.#formFields)

        return this.#createFormElement()
        // UWAZAJ NA ID BO BYC MOZE TRZEBA BEDZIE BARDZIEJ ZADBACO ICH UNIKALNOSC
        // this.#formFields.forEach(formField => console.log(this.#createFormField(formField)))
        // formElement.appendChild(this.#createTextAndNumberField({type: 'text', labels: ['czar']}))

    }

    #createFormElement() {
        console.log('dz9a')
        const formElement = document.createElement('form');
        formElement.id = this.#id;

        const formHeader = document.createElement('h3');
        formHeader.className = 'mt-3';
        formHeader.textContent = this.#formHeaderText;
        formElement.appendChild(formHeader);
        formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            // TODO Przeniesc w przyszlosci ta linie do submitCallback
            console.log('-----------------------------------------------------------')
            console.log(this.#formState)
            console.log('-----------------------------------------------------------')
            ReservationService.addReservation(this.#formState);
            this.#submitCallback();

        })
        formElement.appendChild(FormManager.#createSubmitButton(this.#submitButtonMessage));
        console.log(formElement)
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

    #createTextField(id) {
        const idLowerCase = id.toLowerCase();

        const formGroupElement = document.createElement('div');
        formGroupElement.className = 'form-group';


        const labelElement = document.createElement('label');
        labelElement.setAttribute('for', `${idLowerCase}`);
        labelElement.textContent = idLowerCase
        formGroupElement.appendChild(labelElement);

        const inputElement = document.createElement('input');
        inputElement.id = idLowerCase;
        inputElement.type = 'text';
        inputElement.className = 'form-control'
        formGroupElement.appendChild(inputElement)

        inputElement.addEventListener('input', (e) => {
            const inputValue = {};
            inputValue[idLowerCase] = e.target.value;
            this.#formState = {...this.#formState, ...inputValue}
        })
        console.log(formGroupElement)
        return formGroupElement;

    }


    #createTextAndNumberField({type, labels}) {
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
            console.log(formGroupElement)
            return formGroupElement;
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
