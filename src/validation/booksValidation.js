import Joi from "joi";

export const bookValidationSchema = Joi.object({
  bookCover: Joi.string().required(),
  bookPdf: Joi.string().required(),
  title: Joi.string().required(),
  author: Joi.string().max(30).required(),
  category: Joi.string()
    .valid("AI", "Web development", "Mobile development")
    .required(),
  publicationDate: Joi.date().required(),
  ISBN: Joi.string().required(),
});
