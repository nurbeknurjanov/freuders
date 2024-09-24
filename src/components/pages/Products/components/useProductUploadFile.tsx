import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { files } from 'store';
import { deleteFileThunk, createFileThunk } from 'store/files/thunks';
import { getProductSelector } from 'store/products/selectors';
import { IFile, IFilePost } from 'api/filesApi';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { ObjectSchema } from 'joi';
import { notify } from 'store/common/thunks';
import { useTranslations } from 'next-intl';

interface IProps {
  id?: string;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  schema: ObjectSchema;
  afterFileUploadAndRemove: () => void;
}
export function useProductUploadFile({
  id,
  setValue,
  watch,
  schema,
  afterFileUploadAndRemove,
}: IProps) {
  const tCommon = useTranslations('Common');
  const dispatch = useAppDispatch();

  const product = useAppSelector(getProductSelector);
  const [imageObject, setImageObject] = useState<IFile | null>(null);
  const [percentUploadImage, setPercentUploadImage] = useState(0);
  useEffect(() => {
    if (product?.image) {
      setImageObject(product.image);
    }
  }, [product]);

  const deleteFile = useCallback(
    async (id: string) => {
      const { data } = await dispatch(deleteFileThunk(id));

      if (data) {
        if (data.data?.type === 'image') {
          setImageObject(null);
          //on product create scenario
          if (!product) {
            setValue('imageId', null);
          }
        }

        dispatch(notify(tCommon('successDeleted'), 'success'));
        afterFileUploadAndRemove();
        dispatch(files.createFile.actions.reset());
      }
    },
    [dispatch, afterFileUploadAndRemove, setValue, tCommon, product]
  );

  const uploadFile = useCallback(
    async (fileData: IFilePost) => {
      const { data } = await dispatch(
        createFileThunk(fileData, {
          onUploadProgress(progressEvent) {
            fileData?.data?.type === 'image' &&
              setPercentUploadImage(
                Math.round(
                  (progressEvent.loaded * 100) / (progressEvent.total as number)
                )
              );
          },
        })
      );
      setPercentUploadImage(0);

      if (data) {
        if (data.data?.type === 'image') {
          setImageObject(data);

          //on product create scenario
          if (!product) {
            setValue('imageId', data._id);
          }
        }

        dispatch(notify(tCommon('successUploaded'), 'success'));
        afterFileUploadAndRemove();
      }
    },
    [dispatch, setValue, product, afterFileUploadAndRemove, tCommon]
  );

  const imageFileValue = watch('imageFile');
  useEffect(() => {
    if (imageFileValue?.[0]) {
      const validated = schema.validate({ imageFile: imageFileValue });
      if (!validated.error) {
        if (id) {
          uploadFile({
            modelName: 'Product',
            modelId: id,
            data: {
              type: 'image',
            },
            fileField: imageFileValue,
          });
        } else {
          uploadFile({
            fileField: imageFileValue,
            //we must identify type for preview
            data: {
              type: 'image',
            },
          });
        }
      }
    }
  }, [dispatch, id, uploadFile, imageFileValue, schema]);

  useEffect(
    () => () => {
      dispatch(files.deleteFile.actions.reset());
      dispatch(files.createFile.actions.reset());
    },
    [dispatch]
  );

  return {
    percentUploadImage,
    imageObject,
    deleteFile,
  };
}
