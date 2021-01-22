module.exports = {


    friendlyName: 'Update',
    
    
    description: 'Update warehouse.',
    
    
    inputs: {
        id: {
            type: 'string',
            required: true
        },
        name: {
            type: 'string'
        },
        sortProduct: {
            type: 'json' ,
            example: '[{"product":"id:string","quantity":"number"}]'
        }
    },
    
    
    exits: {
        success: {
            responseType: 'success'
        },
        badRequest: {
            responseType: 'badRequest'
        },
        notFound: {
            responseType: 'notFound'
        }
    },
    
    
    fn: async function (inputs, exits) {
        let {sortProduct = '[]', id, ...updateData} = inputs;
        sortProduct = JSON.parse(sortProduct);
        try {
            let updatedWarehouse = await Warehouses.updateOne({id: id}).set(updateData);
            sortProduct = sortProduct.map(storage => {
                storage.warehouse = updatedWarehouse.id;
                return storage;
            });
            sortProduct.forEach(async (sortStore) => {
                let {product, quantity} = sortStore;
                await Products.updateFreeQuantity(product, -quantity);
            });
            if (!_.isEmpty(sortProduct)) {
                await Storage.createEach(sortProduct);
            }
            return exits.success(updatedWarehouse);
        }
        catch (err) {
            return exits.error(err);
        }
    }
};
