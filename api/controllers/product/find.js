module.exports = {
    
    
    friendlyName: 'Find',
    
    
    description: 'Find product.',
    
    
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
            let products = await Products.find(inputs).populate('storage');
            return exits.success(products);
        }
        catch (err) {
            return exits.error(err);
        }
    }
};
