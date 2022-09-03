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

        this.#formFields.forEach((el) => this.#createFormFields(el));

        formElement.addEventListener('submit', (e) => {
            e.preventDefault()
            this.#submitCallback(this.#formState);
        });
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
                break
            case 'date':
                this.#createTextAndNumberField(formField)
        }

    };


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
            inputElement.required = true;
            formGroupElement.appendChild(inputElement)

            inputElement.addEventListener('input', (e) => this.setState(e.target.value, idLowerCase))
            this.#formElement.appendChild(formGroupElement)
        })
    }


    #createSelectField({label, options}) {
        const formGroupElement = FormManager.#createFormGroupElement();
        this.#formElement.appendChild(formGroupElement)

        const selectElement = document.createElement('select');
        selectElement.id = label
        selectElement.className = 'form-control form-select'
        selectElement.required = true;
        formGroupElement.appendChild(selectElement);
        const optionSelected = document.createElement('option');
        optionSelected.selected = true;
        optionSelected.textContent = 'Please select hotel'
        selectElement.appendChild(optionSelected)
        options.forEach((hotel) => {
            const optionElement = document.createElement('option')
            optionElement.className = 'hotel-option'
            optionElement.textContent = hotel.info()
            optionElement.setAttribute('hotel-id', `${hotel.id}`)
            selectElement.addEventListener('change', (e) => {
                this.setState(hotel.name, label)
            })
            return selectElement.appendChild(optionElement);
        });

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

    #formValidation(e) {

    }

    setState(e, name) {
        console.log(this.#formState)
        const inputValue = {};
        inputValue[name] = e
        return this.#formState = {...this.#formState, ...inputValue}

    }

    getFormState() {
        return this.#formState
    }
}
