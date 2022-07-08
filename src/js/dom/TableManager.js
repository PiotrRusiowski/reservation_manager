export default class TableManager {
    #rowClickCallback;
    #headerRowClickCallback;

    constructor(rowClickCallback, headerRowClickCallback) {
        this.#rowClickCallback = rowClickCallback;
        this.#headerRowClickCallback = headerRowClickCallback;
    }

    createTable(reservations) {
        const tableElement = document.createElement('table');
        tableElement.className = 'table table-striped table-hover';
        const theadElement = this.#createHeader(reservations[0]);
        const tbodyElement = this.#createRows(reservations);
        tableElement.appendChild(theadElement);
        tableElement.appendChild(tbodyElement);
        return tableElement;
    }

    #createHeader(reservation) {
        const headerElementTHEAD = document.createElement('thead');
        const headerElementTR = document.createElement('tr');
        reservation && Object.keys(reservation).forEach(key => {
            const headerElementTH = document.createElement('th');
            const headerElementTHData = document.createTextNode(key);
            headerElementTH.className = `th-${key}`
            headerElementTH.appendChild(headerElementTHData);
            headerElementTH.addEventListener("click", this.#headerRowClickCallback)
            headerElementTR.appendChild(headerElementTH);
        });
        headerElementTHEAD.appendChild(headerElementTR);
        return headerElementTHEAD;
    }

    #createRow(reservation) {
        const rowElementTR = document.createElement('tr');
        rowElementTR.addEventListener('dblclick', this.#rowClickCallback);
        Object.values(reservation).forEach(value => {
            const rowElementTD = document.createElement('td');
            rowElementTD.setAttribute('reservationId', reservation.id);
            rowElementTD.textContent = (String(value))
            rowElementTR.appendChild(rowElementTD);
        });
        return rowElementTR;
    }

    #createRows(reservations) {
        const rowElementTBODY = document.createElement('tbody');
        reservations
            .map(reservation => this.#createRow(reservation))
            .forEach(tr => rowElementTBODY.appendChild(tr));
        return rowElementTBODY;
    }
}
