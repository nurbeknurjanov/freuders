import React, { FC } from 'react';
import { IPsychologist, SEX_ENUM } from 'api/psychologistsApi';
import styles from './psychologist.module.scss';
import { useTranslations } from 'next-intl';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import NoPhotoMan from '../../../../../../public/no_photo_man.svg';
import NoPhotoWoman from '../../../../../../public/no_photo_woman.svg';

require('dayjs/locale/ru');
dayjs.extend(relativeTime);

export const PsychologistView: FC<IPsychologist> = ({
  name,
  sex,
  age,
  photoUrl,
  defaultSubjectName,
  subjectsCount,
  lastActivityTime,
  rating,
}) => {
  const tPsychologistPage = useTranslations('PsychologistPage');

  dayjs.locale('ru');

  const defaultPhoto =
    sex === SEX_ENUM.MALE ? <NoPhotoMan /> : <NoPhotoWoman />;

  return (
    <div className={styles.psychologistContent}>
      <div className={styles.imgContainer}>
        <div className={styles.rating}>
          <div>рейтинг</div>
          <span>{rating}</span>
        </div>
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={name}
            onError={event => {
              event.currentTarget.src =
                sex === SEX_ENUM.MALE
                  ? '../../../../../../public/no_photo_man.svg'
                  : '../../../../../../public/no_photo_woman.svg';
            }}
          />
        ) : (
          defaultPhoto
        )}
      </div>
      <div className={styles.descriptionContainer}>
        <div className={styles.title}>
          {name}, {age}
          {!!styles.online && <i className={styles.online} />}
        </div>
        <div className={styles.themes}>
          {defaultSubjectName}
          {!!subjectsCount && (
            <span>
              {' '}
              и еще {tPsychologistPage('themesCount', { count: subjectsCount })}
            </span>
          )}
        </div>
        <div className={styles.onlineStatus}>
          {tPsychologistPage('onlineStatus', {
            gender: sex === SEX_ENUM.MALE ? 'male' : 'female',
          })}{' '}
          {dayjs(lastActivityTime).fromNow()}
        </div>
      </div>
    </div>
  );
};
