module.exports = {
    
    
    friendlyName: 'Find',
    
    
    description: 'Find warehouse.',
    
    
    inputs: {
        id: {
            type: 'string'
        }
    },
    
    
    exits: {
        success: {
            responseType: 'success'
        },
    },
    
    
    fn: async function (inputs, exits) {
        try {
            let warehouses = await Warehouses.find(inputs).populate('storage');
            return exits.success(warehouses);
        }
        catch (err) {
            return exits.error(err);
        }
    }
};
