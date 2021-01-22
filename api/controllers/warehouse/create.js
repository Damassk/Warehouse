module.exports = {


    friendlyName: 'Create',
    
    
    description: 'Create warehouse.',
    
    
    inputs: {
        name: {
            type: 'string',
            required: true
        },
        sortProduct: {
            type: 'json' ,
            example: '[{"product":"id:string","quantity":"number"}]'
        }
    },
    
    
    exits: {
        success: {
            responseType: 'success',
        },
        badRequest: {
            responseType: 'badRequest'
        }
    },
    
    
    fn: async function (inputs, exits) {
        let {sortProduct = '[]', ...warehouseToCreate} = inputs;
        sortProduct = JSON.parse(sortProduct);
        try {
            let findWarehouse = await Warehouses.findOrCreate({name: warehouseToCreate.name}, warehouseToCreate);
            sortProduct = sortProduct.map(storage => {
                storage.warehouse = findWarehouse.id;
                return storage;
            });
            sortProduct.forEach(async (sortStore) => {
                let {product, quantity} = sortStore;
                await Products.updateFreeQuantity(product, -quantity);
            });
            if (!_.isEmpty(sortProduct)) {
                await Storage.createEach(sortProduct);
            }
            return exits.success(findWarehouse);
        }
        catch (err) {
            return exits.error(err);
        }
    }


};
