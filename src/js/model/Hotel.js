export default class Hotel {
    constructor(id, name, price) {
        this.id = id
        this.name = name;
        this.price = price;
    }

    info() {
        return `'${this.name}' - cost per day: ${this.price}pln`
    }

}