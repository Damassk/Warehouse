module.exports = {
    
    
    friendlyName: 'Create',
    
    
    description: 'Create product.',
    
    
    inputs: {
        storageIds: {
            type: 'string',
            required: true,
            example: 'string,string,string'
        },
        warehouse: {
            type: 'string'
        }
    },
    
    
    exits: {
        success: {
            responseType: 'success'
        },
        badRequest: {
            responseType: 'badRequest'
        }
    },
    
    
    fn: async function (inputs, exits) {
        let {storageIds , warehouse} = inputs;
        try {
            storageIds = storageIds.split(',');
            if (warehouse) {
                await Warehouses.addToCollection(warehouse, 'storage', storageIds);
            }
            else {
                let storageData = await Storage.find({id: storageIds});
                storageData.forEach(async storage => {
                    await Products.updateFreeQuantity(storage.product, storage.quantity);
                });
                await Storage.destroy({id: storageIds});
            }
            return exits.success({});
        }
        catch (err) {
            return exits.error(err);
        }
        
    }
};
