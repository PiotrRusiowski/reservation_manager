export default class TableManager {
    #rowClickCallback;
    #sortOrder = -1;
    #sortKey = ''
    #columns = {};
    #rows = [];
    #tableElement;

    constructor({rowClickCallback, sortKey, columns, rows}) {
        this.#rowClickCallback = rowClickCallback;
        this.#sortKey = sortKey || '';
        this.#columns = columns || {};
        this.#rows = rows || [];
    }

    #sort(key) {
        this.#sortKey = key;
        switch (this.#columns[key].type) {
            case 'string':
                this.#rows = [...this.#rows].sort((a, b) => this.#sortOrder === 1 ?
                    a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]))
                break
            case 'number':
                this.#rows = [...this.#rows].sort((a, b) => {
                    return this.#sortOrder === 1 ?
                        a[key] - b[key] : b[key] - a[key]
                })
        }
    }

    #changeSort(key) {
        if (key === this.#sortKey) {
            this.#sortOrder = this.#sortOrder === 1 ? -1 : 1;
        }
        this.#sortKey = key;
        this.#sort(key);
        this.#reloadTable()
    }

    createTable(rows) {
        this.#rows = rows
        const tableElement = document.createElement('table');
        tableElement.className = 'table table-striped table-hover';
        const theadElement = this.#createHeader();
        const tbodyElement = this.#createRows(rows);
        tableElement.appendChild(theadElement);
        tableElement.appendChild(tbodyElement);
        this.#tableElement = tableElement;
        return tableElement;
    }

    #createHeader() {
        const headerElementTHEAD = document.createElement('thead');
        const headerElementTR = document.createElement('tr');
        Object.keys(this.#columns).forEach(key => {
            const column = this.#columns[key]

            const headerElementTH = document.createElement('th');
            const headerElementTHData = document.createTextNode(column.label);
            headerElementTH.appendChild(headerElementTHData);

            headerElementTH.addEventListener("click", () => this.#changeSort(key))

            headerElementTR.appendChild(headerElementTH);
        });
        headerElementTHEAD.appendChild(headerElementTR);
        return headerElementTHEAD;
    }

    #createRow(row) {
        const rowElementTR = document.createElement('tr');
        rowElementTR.addEventListener('click', this.#rowClickCallback);
        Object.values(row).forEach((value,) => {
            console.log()
            const rowElementTD = document.createElement('td');
            rowElementTD.setAttribute('reservationId', row.id);
            rowElementTD.textContent = (String(value));

            rowElementTR.appendChild(rowElementTD);
        });
        return rowElementTR;
    }

    #createRows(rows) {
        const rowElementTBODY = document.createElement('tbody');
        rows
            .map(row => this.#createRow(row))
            .forEach(tr => rowElementTBODY.appendChild(tr));
        return rowElementTBODY;
    }

    #reloadTable() {
        const tbodyElement = this.#createRows(this.#rows);
        const oldTbody = this.#tableElement.querySelector('tbody');
        oldTbody && this.#tableElement.removeChild(oldTbody)
        this.#tableElement.appendChild(tbodyElement);
    }
}
