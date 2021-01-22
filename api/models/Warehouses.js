/**
 * Warehouse.js
 *
 * @description :: модель для складов
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    attributes: {
        name: {
            type: 'string'
        },
        storage: {
            collection: 'storage',
            via: 'warehouse'
        }
    }
};
