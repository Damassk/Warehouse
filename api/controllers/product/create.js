module.exports = {


    friendlyName: 'Create',
  
  
    description: 'Create product.',
  
  
    inputs: {
        name: {
            type: 'string',
            required: true
        },
        quantity: {
            type: 'number',
            required: true
        },
        sortProduct: {
            type: 'json',
            example: '[{"warehouse":"id:string","quantity":"number"}]'
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
        let {sortProduct = '[]', ...productToCreate} = inputs;
        sortProduct = JSON.parse(sortProduct);
        let freeQuantityCounter = sortProduct.reduce((sum, el) => sum + el.quantity, 0);
        productToCreate.freeQuantity = productToCreate.quantity - freeQuantityCounter;
        Products.findOrCreate({name: productToCreate.name}, productToCreate).exec(async (err, findProduct, isCreated) => {
            if (err) {
                return exits.error(err);
            }
            else {
                try {
                    sortProduct = sortProduct.map(storage => {
                        storage.product = findProduct.id;
                        return storage;
                    });
                    if (!_.isEmpty(sortProduct)) {
                        await Storage.createEach(sortProduct);
                    }
                    if (isCreated) {
                        return exits.success(findProduct);
                    }
                    else {
                        let product = await Products.updateOne({name: productToCreate.name}).set({
                            quantity: findProduct.quantity + productToCreate.quantity,
                            freeQuantity: findProduct.freeQuantity + productToCreate.freeQuantity
                        });
                        return exits.success(product);
                    }
                }
                catch (err) {
                    return exits.error(err);
                }
            }
        });
    }
};
