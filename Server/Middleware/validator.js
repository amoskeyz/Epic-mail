import joi from 'joi';
import schema from '../Helper/schemas';

class Validate {
  static validateSignup(req, res, next) {
    const {
      firstname, lastname, email, password, phoneNumber,
    } = req.body;

    const user = {
      firstname, lastname, email, password, phoneNumber,
    };

    joi.validate(user, schema.Registerschema, (err) => {
      if (err) {
        return res.status(400).json({
          status: 400,
          error: err,
        });
      }
      return next();
    });
  }
}

export default Validate;