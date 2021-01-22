module.exports = {


    friendlyName: 'Update',
    
    
    description: 'Update product.',
    
    
    inputs: {
        id: {
            type: 'string',
            required: true
        },
        name: {
            type: 'string'
        },
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
        try {
            let {id, ...updateData} = inputs;
            let productUpdated = await Product.updateOne({id: id}).set(updateData);
            if (productUpdated) {
                return exits.success(productUpdated);
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
