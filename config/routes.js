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

  'GET /api/customers': 'CustomersController.find',
  'POST /api/customer': 'CustomersController.create',
  'GET /api/customer/:id': 'CustomersController.findOne',
  'DELETE /api/customer/:id': 'CustomersController.delete',
  'PUT /api/customer/:id': 'CustomersController.update',
};
