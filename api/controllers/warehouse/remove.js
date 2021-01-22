module.exports = {


    friendlyName: 'Remove',
    
    
    description: 'Remove warehouse.',
    
    
    inputs: {
        id: {
            type: 'string',
            required: true
        },
        warehouse: {
            type: 'string',
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
        let {id, warehouse} = inputs;
        try {
            let warehouseToRemove = await Warehouses.findOne({id: id}).populate('storage');
            let storageIds = warehouseToRemove.storage.map(storage => storage.id);
            if (warehouse && storageIds.length > 0) {
                await Warehouses.addToCollection(warehouse, 'storage', storageIds);
            }
            else {
                warehouseToRemove.storage.forEach(async (storage) => {
                    let {product, quantity} = storage;
                    await Products.updateFreeQuantity(product, +quantity);
                });
                await Storage.destroy({id: storageIds});
            }
            await Warehouses.destroy({id: id});
            if (warehouseToRemove) {
                return exits.success(warehouseToRemove);
            }
            else {
                return exits.notFound();
            }
        }
        catch (err) {
            return exits.error(err);
        }
    }
};
