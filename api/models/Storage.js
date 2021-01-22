/**
 * Storage.js
 *
 * @description :: модель для хранения, описывающая сколько какой продукции и на каком складе хранится
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    attributes: {
        quantity: {
            type: 'number',
            defaultsTo: 0
        },
        product: {
            model: 'products'
        },
        warehouse: {
            model: 'warehouses'
        }
    }
};
