import React from 'react';
import { useProductModalCreate } from './useProductModalCreate';
import { TextField } from '@mui/material';
import { Button, LinearProgressWithLabel } from 'shared/ui';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRef } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { FileModalDelete } from 'components/pages/Files';

export type IProps = {
  onClose: () => void;
  afterCreate: () => void;
};

export const ProductModalCreate: React.FC<IProps> = ({
  onClose,
  afterCreate,
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  //const formRef = useRef<HTMLFormElement>(null); //for direct assign
  const {
    tCommon,
    tProductsPage,
    tProduct,
    createProductState,
    register,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    submitForm,
    percentUploadImage,
    imageObject,
    deleteFile,
    selectedFileIdToDelete,
    setSelectedFileIdToDelete,
    onCloseWrapper,
  } = useProductModalCreate({
    onClose,
    afterCreate,
  });

  return (
    <>
      <Dialog open onClose={onCloseWrapper}>
        <DialogTitle>{tProductsPage('create')}</DialogTitle>
        <DialogContent>
          {createProductState.isFetching ? (
            <CircularProgress sx={{ mx: 'auto', mb: 2, display: 'block' }} />
          ) : (
            <form
              ref={formRef}
              onSubmit={e => {
                e.preventDefault();
                handleSubmit(submitForm)(e);
              }}
            >
              <TextField
                label={tProduct('name')}
                error={!!errors['name']}
                helperText={errors['name']?.message}
                {...register('name')}
              />

              <TextField
                label={tProduct('description')}
                error={!!errors['description']}
                helperText={errors['description']?.message}
                multiline
                minRows={2}
                maxRows={4}
                {...register('description')}
              />

              <input {...register('imageId')} type="hidden" />

              {imageObject ? (
                <Card sx={{ mb: 1 }}>
                  <CardContent
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <img src={imageObject.url} width={200} />
                    <DeleteIcon
                      color={'error'}
                      sx={{ cursor: 'pointer' }}
                      onClick={() =>
                        setSelectedFileIdToDelete(imageObject._id!)
                      }
                    />
                  </CardContent>
                </Card>
              ) : (
                <TextField
                  type={'file'}
                  label={tProduct('image')}
                  error={!!errors['imageFile']}
                  FormHelperTextProps={{
                    component: 'div',
                  }}
                  helperText={
                    errors['imageFile']?.message ?? (
                      <LinearProgressWithLabel
                        variant="determinate"
                        value={percentUploadImage}
                      />
                    )
                  }
                  {...register('imageFile')}
                />
              )}
            </form>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseWrapper}>{tCommon('close')}</Button>
          <Button
            variant={'contained'}
            onClick={() => {
              formRef.current?.requestSubmit();
            }}
            disabled={!isDirty || !isValid}
            autoFocus
            loading={createProductState.isFetching}
            sx={{ minWidth: 120 }}
          >
            {tCommon('create')}
          </Button>
        </DialogActions>
      </Dialog>
      {selectedFileIdToDelete && (
        <FileModalDelete
          id={selectedFileIdToDelete}
          onClose={() => setSelectedFileIdToDelete(null)}
          customDeleteFile={() => deleteFile(selectedFileIdToDelete)}
        />
      )}
    </>
  );
};
