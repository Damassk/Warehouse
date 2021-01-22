/**
 * Products.js
 *
 * @description :: модель для продуктов
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    attributes: {
        name: {
            type: 'string'
        },
        quantity: {
            type: 'number',
            defaultsTo: 0
        },
        freeQuantity: {
            type: 'number',
            defaultsTo: 0
        },
        storage: {
            collection: 'storage',
            via: 'product'
        }
    },
    
    updateFreeQuantity: async function (id, inc) {
        const ObjectId = require('bson-objectid');
        let db = Products.getDatastore().manager;
        let collection = db.collection('products');
        collection.updateOne({_id: new ObjectId(id)}, {$inc: {freeQuantity: inc}}, (err, result) => {
            if (err) {
                throw new Error(err.message);
            }
            else {
                return result;
            }
        });
    }
};
