import Joi from "@hapi/joi";

export const registerValidation = data => {
  const schema = Joi.object({
    firstName: Joi.string()
      .label("First Name")
      .min(3)
      .required(),
    lastName: Joi.string()
      .label("Last Name")
      .min(2)
      .required(),
    email: Joi.string()
      .label("Email")
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .label("Password")
      .min(6)
      .required()
  });
  return schema.validate(data);
};

export const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string()
      .label("Email")
      .min(6)
      .required(),
    password: Joi.string()
      .label("Password")
      .min(6)
      .required()
  });
  return schema.validate(data);
};
