/**
 * CustomersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  async find(req, res) {
    try {
      const customers = await Customers.find();
      return res.ok(customers);
    } catch (error) {
      res.serverError(error);
    }
  },
  async create(req, res) {
    const { firstName, lastName, phone, city, address, email } = req.allParams();
    const errors = {};
    if (!firstName.trim()) {
      errors.firstName = 'First Name Field is required';
    } else if (!lastName.trim()) {
      errors.lastName = 'Last Name Field is required';
    } else if (!phone.trim()) {
      errors.phone = 'Phone Number Field is required';
    } else if (!address.trim()) {
      errors.address = 'Address Field is required';
    } else if (!city.trim()) {
      errors.city = 'City Field is required';
    } else if (!email.trim()) {
      errors.email = 'Email Field is required';
    }
    if (Object.keys(errors).length > 0) {
      return res.badRequest(errors);
    }
    try {
      const createdCustomer = await Customers.create({
        firstName,
        lastName,
        phone,
        city,
        address,
        email
      }).fetch();
      return res.ok(createdCustomer);
    } catch (error) {
      res.serverError(error);
    }
  },
  async findOne(req, res) {
    try {
      const { id } = req.params;
      const customer = await Customers.findOne(id);
      if (!customer) {
        return res.notFound(`No Customer was found with the id ${id}`);
      }
      return res.ok(customer);
    } catch (error) {
      return res.serverError(error);
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      const customer = await Customers.findOne(id);
      if (!customer) {
        return res.notFound(`No Customer was found with the id ${id}`);
      }
      await Customers.destroy(id);
      res.ok({msg: 'Successfully deleted user'});
    } catch (error) {
      return res.serverError(error);
    }
  },
  async update(req, res) {
    const { firstName, lastName, phone, city, address, email } = req.allParams();
    try {
      const { id } = req.params;
      const customerToUpdate = {};
      if (firstName) {
        customerToUpdate.firstName = firstName;
      }
      if (lastName) {
        customerToUpdate.lastName = lastName;
      }
      if (phone) {
        customerToUpdate.phone = phone;
      }
      if (city) {
        customerToUpdate.city = city;
      }
      if (address) {
        customerToUpdate.address = address;
      }
      if (email) {
        customerToUpdate.email = email;
      }
      const updatedCustomer = await Customers.update({id}, customerToUpdate);
      res.ok(updatedCustomer);
    } catch (error) {
      res.serverError(error);
    }
  }

};

