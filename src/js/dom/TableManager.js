export default class TableManager {
    #rowClickCallback;
    #sortOrder = -1;
    #sortKey = ''
    #columns = {};
    #rows = [];

    #tableElement;

    //#headerRowClickCallback;


    constructor(options) {
        this.#rowClickCallback = options.rowClickCallback;
        this.#sortKey = options.sortKey || '';
        this.#columns = options.columns || {};
        this.#rows = options.rows || []

        this.sort(this.#sortKey)
    }

    sort(key) {
        this.#sortKey = key;

        console.log(this.#columns, key)

        switch (this.#columns[key].type) {
            case 'string':
                this.#rows = [...this.#rows].sort((a, b) => this.#sortOrder === 1 ?
                    a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]))
                break
            case 'number':
                this.#rows = [...this.#rows].sort((a, b) => this.#sortOrder === 1 ? a[key] - b[key] : b[key] - a[key])
        }
    }

    changeSort(key) {
        if (key === this.#sortKey) {
            this.#sortOrder = (this.#sortOrder === 1) ? -1 : 1;
        }
        this.#sortKey = key;

        this.sort(key);
        console.log(this.#sortKey, this.#sortOrder, this.#rows)
        //
        const tbodyElement = this.#createRows(this.#rows);

        const oldTbody = this.#tableElement.querySelector('tbody');
        oldTbody && this.#tableElement.removeChild(oldTbody)

        this.#tableElement.appendChild(tbodyElement);
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
            // headerElementTH.setAttribute('data-key', column);
            headerElementTH.appendChild(headerElementTHData);

            headerElementTH.addEventListener("click", () => this.changeSort(key))

            headerElementTR.appendChild(headerElementTH);
        });
        headerElementTHEAD.appendChild(headerElementTR);
        return headerElementTHEAD;
    }

    #createRow(row) {
        const rowElementTR = document.createElement('tr');
        rowElementTR.addEventListener('dblclick', this.#rowClickCallback);
        Object.values(row).forEach(value => {
            const rowElementTD = document.createElement('td');
            rowElementTD.setAttribute('reservationId', row.id);
            rowElementTD.textContent = (String(value))
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
}
