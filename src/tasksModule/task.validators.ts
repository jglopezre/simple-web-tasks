import { body, param, ValidationChain } from "express-validator";

enum AllowedFields {
  TITLE = 'title',
  DESCRIPTION = 'description',
  COMPLETED = 'completed',
}

const allowedFieldsArray: string[] = [
  AllowedFields.TITLE,
  AllowedFields.DESCRIPTION,
  AllowedFields.COMPLETED,
];

export const taskPostValidations: ValidationChain[] = [
  body(AllowedFields.TITLE)
    .notEmpty()
    .withMessage('El título es requerido')
    .isLength({ min: 3 })
    .withMessage('El título debe tener al menos 3 caracteres'),
  
  body(AllowedFields.DESCRIPTION)
    .notEmpty()
    .withMessage('La descripcion es requerida')
    .isLength({ max: 500 })
    .withMessage('La descripción no puede exceder los 500 caracteres'),
  
  body(AllowedFields.COMPLETED)
    .optional()
    .isBoolean()
    .withMessage('completed debe ser boolean'),
];

export const taskUpdateValidation: ValidationChain[] = [
  body(AllowedFields.TITLE)
    .optional()
    .isLength({ min: 3 })
    .withMessage('El título debe tener al menos 3 caracteres'),
  
  body(AllowedFields.DESCRIPTION)
    .optional()
    .isLength({ max: 500 })
    .withMessage('La descripción no puede exceder los 500 caracteres'),
  
  body(AllowedFields.COMPLETED)
    .optional()
    .isBoolean()
    .withMessage('completed debe ser boolean'),
];

export const taskIdValidation: ValidationChain = param('id')
  .matches(/^[a-f0-9]{24}$/)
  .withMessage('El ID debe ser un ObjectId válido (24 caracteres hexadecimales)');

export const taskHasAtLeastOneField: ValidationChain = body().custom((_, { req }) => {
  const hasAtLeastOneField = allowedFieldsArray.some((field) => req.body[field] !== undefined);

  if (!hasAtLeastOneField) throw new Error('La solicitud debe incluir al menos uno de los siguientes campos: title, description, completed.');

  return true;
});

export const taskRejectExtraFields = body().custom((_, { req }) => {
  const extraFields = Object.keys(req.body).filter((field) => !allowedFieldsArray.includes(field));

  if (extraFields.length > 0) {
    throw new Error(`Los siguientes campos no están permitidos: ${extraFields.join(', ')}`);
  }

  return true;
});

