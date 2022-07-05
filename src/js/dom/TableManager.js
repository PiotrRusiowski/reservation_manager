export default class TableManager {
    #rowClickCallback;

    constructor(rowClickCallback) {
        this.#rowClickCallback = rowClickCallback;
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
            headerElementTH.appendChild(headerElementTHData);
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
            // const rowElementTDText = document.createTextNode(String(value));
            rowElementTD.textContent = (String(value))
            // rowElementTD.appendChild(rowElementTDText)
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
