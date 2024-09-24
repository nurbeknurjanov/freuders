'use client';
import React, { FC } from 'react';
import styles from './psychologists.module.scss';
import { usePsychologists } from './usePsychologists';
import { PsychologistsFilters, PsychologistView } from './components';
import { withPageWrapper } from 'shared/hocs';
import { useSetPageData } from 'shared/hooks';
import { Button } from 'shared/ui';
import EmptyIcon from '../../../../public/empty_search_icon.svg';

let Psychologists: FC = () => {
  const {
    tPsychologistsPage,
    getPsychologistsState,
    pagination,
    setPagination,
    filters,
    setFilters,
  } = usePsychologists();

  useSetPageData(tPsychologistsPage('title'), [tPsychologistsPage('title')]);

  const { accumulatedItems, data, isFetching } = getPsychologistsState;

  return (
    <>
      <PsychologistsFilters filters={filters} setFilters={setFilters} />
      <div className={styles.hr} />
      {accumulatedItems.length ? (
        <div className={styles.psychologistsContent}>
          {accumulatedItems.map(el => (
            <PsychologistView key={el.name} {...el} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <EmptyIcon />
          <div>К сожалению, нет анкет с такими параметрами</div>
        </div>
      )}

      {data?.items?.length === 12 && (
        <div className={styles.loadMore}>
          <Button
            variant={'contained'}
            loading={isFetching}
            onClick={() => {
              setPagination({
                pageNumber: pagination.pageNumber + 1,
                pageSize: pagination.pageSize,
              });
            }}
          >
            Показать еще
          </Button>
        </div>
      )}
    </>
  );
};

Psychologists = withPageWrapper(Psychologists);

export { Psychologists };
