import Joi from 'joi';
import { useTranslations } from 'next-intl';

export const useI18nJoi = () => {
  const tValidation = useTranslations('Validation');
  return Joi.defaults(schema => {
    /*return schema.messages({
          "string.email": tValidation("email", { label: "{{#label}}" }),
        });*/
    return schema.options({
      messages: {
        'string.empty': tValidation('string.empty', { label: '{{#label}}' }),
        'string.base': tValidation('string.base', { label: '{{#label}}' }),
        'string.email': tValidation('string.email', { label: '{{#label}}' }),
        'string.min': tValidation('string.min', {
          label: '{{#label}}',
          limit: '{{#limit}}',
        }),

        'number.base': tValidation('number.base', { label: '{{#label}}' }),

        'any.only': tValidation('any.only', { label: '{{#label}}' }),
        'any.custom': tValidation('any.custom', { label: '{{#label}}' }),

        'file.type': tValidation('file.type'),
        'file.size': tValidation('file.size', { size: '{{#size}}' }),
      },
    });
  });
};
