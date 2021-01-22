module.exports = {
    
    
    friendlyName: 'Find free quantity',
    
    
    description: 'Find free quantity product.',
    
    
    inputs: {
    
    },
    
    
    exits: {
        success: {
            responseType: 'success'
        },
    },
    
    
    fn: async function (inputs, exits) {
        try {
            let products = await Products.find({freeQuantity: {'>': 0}});
            return exits.success(products);
        }
        catch (err) {
            return exits.error(err);
        }
    }
};
