export default class FilterFormManager {
    #id;
    #inputCallback = function () {
    };
    #formState = {};


    constructor({
                    id,
                    inputCallback = function () {
                    },
                }) {
        this.#id = id
        this.#inputCallback = inputCallback()
    }

    createForm() {
        const formElement = document.createElement('form');
        formElement.id = this.#id;
        const formHeader = document.createElement('h3');
        formHeader.textContent = 'filter'
        formElement.appendChild(formHeader);
        formElement.appendChild(this.#createSearchInput())
        return formElement
    }

    #createSearchInput() {
        const formGroup = document.createElement('div');
        formGroup.className = 'formGroup';

        const input = document.createElement('input');
        input.id = 'search-input'
        input.type = 'text';
        input.placeholder = 'search';
        input.addEventListener('input', (e) => {
            const inputValue = {}
            inputValue[input.id] = e.target.value
            this.#formState = {...this.#formState, ...inputValue}
            console.log(this.#formState)
        })
        formGroup.appendChild(input);
        return formGroup

    }

}