module.exports = {


    friendlyName: 'Remove',
    
    
    description: 'Remove product.',
    
    
    inputs: {
        id: {
            type: 'string',
            required: true
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
            let product = await Products.find(inputs).populate('storage');
            if (!_.isEmpty(product[0].storage)) {
                let storageIds = product[0].storage.map((el) => el.id);
                await Storage.destroy({id: storageIds});
            }
            await Products.destroy({id: inputs.id});
            if (product) {
                return exits.success(product);
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
