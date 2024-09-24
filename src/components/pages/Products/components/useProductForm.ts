'use client';
import { useI18nJoi } from 'shared/utils';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { IProductPost, IProduct } from 'api/productsApi';
import { pick } from 'lodash';
import { useEffect, useMemo, useRef } from 'react';
import { useTranslations } from 'next-intl';

interface IProps {
  model?: IProduct;
}
export function useProductForm({ model }: IProps) {
  const tProduct = useTranslations('Product');
  const i18nJoi = useI18nJoi();
  const i18nJoiRef = useRef(i18nJoi);
  const schema = useMemo(() => {
    let schemaObject = i18nJoiRef.current.object({
      name: Joi.string().label(tProduct('name')),
      description: Joi.string().allow(null, '').label(tProduct('description')),
      imageFile: Joi.any()
        .label(tProduct('image'))
        .custom((value: FileList, helper) => {
          if (!value?.[0]) {
            return value;
          }

          if (
            !['image/jpg', 'image/jpeg', 'image/png', 'image/gif'].includes(
              value?.[0]?.type?.toLowerCase()
            )
          ) {
            return helper.error('file.type');
          }

          if (value?.[0]?.size > 1048576 * 10) {
            return helper.error('file.size', { size: '10MB' });
          }

          return value;
        }),
    });

    if (!model) {
      schemaObject = schemaObject.append({ imageId: Joi.optional() });
    }

    return schemaObject;
  }, [model, tProduct]);

  const initialValues = useMemo<IProductPost>((): IProductPost => {
    if (!model) {
      return {
        name: null,
        description: null,
        imageFile: null,
        imageId: null,
      };
    }

    const pickedProperties = pick(model, ['name', 'description']);
    return {
      ...pickedProperties,
      imageFile: null,
    };
  }, [model]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    setValue,
    watch,
  } = useForm<IProductPost>({
    mode: 'onTouched',
    resolver: joiResolver(schema),
    defaultValues: initialValues!,
  });

  useEffect(() => {
    reset(initialValues);
  }, [reset, initialValues]);

  return {
    register,
    setValue,
    watch,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    schema,
  };
}
