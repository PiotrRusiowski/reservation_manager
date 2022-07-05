// import Reservation from "../model/Reservation";
//
// // TODO Dla osob ktore ucza sie backendu zrobic REST API
// export default class ReservationService {
//     static #products = [
//         new Reservation(1, 'TRUSKAWKA', 10, 'A'),
//         new Reservation(2, 'CZERESNIA', 200, 'B'),
//         new Reservation(3, 'BANAN', 7, 'C')
//     ]
//
//     /*#products = {
//         1: new Product(1, 'PRODUCT A', 1000, 'A'),
//         2: new Product(2, 'PRODUCT B', 2000, 'B'),
//         3: new Product(3, 'PRODUCT C', 3000, 'C')
//     }*/
//
//     /*#products = new Map(
//         [1, new Product(1, 'PRODUCT A', 1000, 'A')],
//         [2, new Product(2, 'PRODUCT B', 2000, 'B')],
//         [3, new Product(3, 'PRODUCT C', 3000, 'C')]
//     );*/
//
//     static #ID = 4
//
//     static addReservation({name, price, category}) {
//         const id = ProductService.#ID++;
//         ProductService.#products.push(new Product(id, name, price, category));
//     }
//
//     static deleteProduct(id) {
//         // Szukamy produktow, ktore maja okreslone id - zalozenie jest takie za znajdziemy
//         // tylko jeden unikalny obiekt, ktory ma takie id
//         const filteredProducts = ProductService.#products.filter(p => p.id === id);
//
//         // Jezeli nie udalo sie znalezc produktu o takim id to wtedy masz blad
//         if (filteredProducts.length === 0) {
//             throw new Error(`Cannot find product with id ${id}`);
//         }
//
//         const productToDelete = filteredProducts[0];
//         const idxToDelete = ProductService.#products.indexOf(productToDelete);
//         ProductService.#products.splice(idxToDelete, 1);
//     }
//
//     static getAllProducts() {
//         return ProductService.#products;
//     }
//
//     static filterProducts(expression) {
//         // Ktos moze wpisywac kilka slow kluczowych np podawanych po spacji
//         const expressionElements = expression.split(' ');
//
//         // Podajac np expression o wartosci 'prod a' dostaniemy tablice ['prod', 'a']
//         // Potem bedziemy chcieli kazdy element tej tablicy sprawdzic, czy wystepuje w
//         // naszych produktach,alemoze byc ze produkty sie powwtorza, dlatego zeby finalnie
//         // nam sie nic nie powtorzylo zastosujemy kolekcje Set
//
//         const jsonFilteredProducts = new Set();
//         expressionElements.forEach(expr => ProductService.#products
//             .filter(p => p.toString().toLowerCase().includes(expr.toLowerCase()))
//             .map(p => p.json())
//             .forEach(json => jsonFilteredProducts.add(json))
//         )
//
//         return [...jsonFilteredProducts].map(json => JSON.parse(json))
//     }
//
// }
