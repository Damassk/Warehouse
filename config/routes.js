/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

    /***************************************************************************
    *                                                                          *
    * Make the view located at `views/homepage.ejs` your home page.            *
    *                                                                          *
    * (Alternatively, remove this and add an `index.html` file in your         *
    * `assets` directory)                                                      *
    *                                                                          *
    ***************************************************************************/

    '/': { view: 'pages/homepage' },


    /***************************************************************************
    *                              Warehouse                                   *
    ***************************************************************************/

    'POST /api/v1/warehouse/create': { action: 'warehouse/create' },
    'PUT /api/v1/warehouse/update': { action: 'warehouse/update' },
    'DELETE /api/v1/warehouse/remove': { action: 'warehouse/remove' },
    'GET /api/v1/warehouse/find': { action: 'warehouse/find' },
    
    /***************************************************************************
     *                              Product                                    *
     ***************************************************************************/

    'POST /api/v1/product/create': { action: 'product/create' },
    'PUT /api/v1/product/update': { action: 'product/update' },
    'DELETE /api/v1/product/remove': { action: 'product/remove' },
    'GET /api/v1/product/find': { action: 'product/find' },
    'GET /api/v1/product/findFree': { action: 'product/find-free' },
    'PUT /api/v1/product/move': { action: 'product/move' },
};
