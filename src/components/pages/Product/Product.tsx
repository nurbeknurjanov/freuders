'use client';
import React, { FC } from 'react';
import styles from './product.module.scss';
import { useProduct } from './useProduct';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { DATE_FORMAT } from 'shared/utils';
import { withPageWrapper } from 'shared/hocs';
import Loading from 'app/[locale]/loading';
import { ProductModalDelete } from 'components/pages/Products';
import { useSetPageData } from 'shared/hooks';
import { Button, ButtonLink, Link } from 'shared/ui';
import { useParams } from 'next/navigation';
import { ProductPageProps } from 'app/[locale]/products/[id]/page';

const columns: GridColDef[] = [
  {
    field: 'label',
    headerName: 'Label',
    flex: 1,
  },
  {
    field: 'value',
    headerName: 'Value',
    flex: 2,
    renderCell: params => {
      return params.value;
    },
  },
];

let Product: FC = () => {
  const { id } = useParams<ProductPageProps['params']>();

  const {
    tCommon,
    tProduct,
    tProductPage,
    tProductsPage,
    model,
    getProductState,
    showModal,
    setShowModal,
    router,
    productsPermissions,
  } = useProduct();
  const title = model?.name!;

  useSetPageData(
    title,
    [
      {
        label: tProductsPage('title'),
        href: '/products',
      },
      title,
    ],
    <>
      {productsPermissions.canUpdateProduct && (
        <ButtonLink href={`/products/${id}/update`} size={'small'}>
          {tProductPage('update')}
        </ButtonLink>
      )}

      {productsPermissions.canDeleteProduct && (
        <Button
          variant={'contained'}
          size={'small'}
          color={'error'}
          onClick={() => setShowModal({ type: 'delete', id })}
        >
          {tProductPage('delete')}
        </Button>
      )}
    </>
  );

  const rows: { label: string; value: string | React.ReactNode }[] = [];
  if (model) {
    rows.push({
      label: tCommon('id'),
      value: model._id,
    });
    rows.push({
      label: tProduct('name'),
      value: model.name,
    });
    rows.push({
      label: tProduct('description'),
      value: model.description,
    });
    rows.push({
      label: tCommon('createdAt'),
      value: dayjs(model.createdAt).format(DATE_FORMAT),
    });
    rows.push({
      label: tCommon('updatedAt'),
      value: dayjs(model.updatedAt).format(DATE_FORMAT),
    });

    if (model.image) {
      rows.push({
        label: tCommon('image'),
        value: (
          <Link href={model.image.url} target={'_blank'} sx={{ fontSize: 0 }}>
            <img src={model.image.url} width={300} />
          </Link>
        ),
      });
    }
  }

  if (!getProductState.isFetched || getProductState.isFetching) {
    return <Loading />;
  }

  return (
    <div className={styles.productContent}>
      <DataGrid
        columnHeaderHeight={0}
        getRowHeight={params => {
          if (params.id === tCommon('image')) return 'auto';
        }}
        hideFooter
        rows={rows}
        columns={columns}
        getRowId={el => el.label}
        paginationMode={'client'}
        sortingMode={'client'}
      />

      {showModal?.type === 'delete' && (
        <ProductModalDelete
          id={showModal.id}
          onClose={() => setShowModal(null)}
          afterDelete={() => router.push('/products')}
        />
      )}
    </div>
  );
};

Product = withPageWrapper(Product);

export { Product };
