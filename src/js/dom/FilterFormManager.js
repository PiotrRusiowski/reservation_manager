export default class FilterFormManager {
    #inputCallback;

    constructor(inputCallback) {
        this.#inputCallback = inputCallback
    }

    createForm() {
        const formElement = document.createElement('form');
        // formElement.id = this.#id;
        const formHeader = document.createElement('h3');
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
        input.addEventListener('input', this.#inputCallback
            // const inputValue = {}
            // inputValue[input.id] = e.target.value
            // this.#formState = {...this.#formState, ...inputValue}
            // console.log(this.#formState)
        )
        formGroup.appendChild(input);
        return formGroup

    }

}