import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import LoaderComponent from '../LoaderComponent/LoaderComponent.jsx';
import {
  updateUserProfile,
  uploadUserPhoto,
} from '../../redux/auth/operations.js';
import {
  selectIsLoading,
  selectUser,
  selectIsLoadingPhoto,
  selectUserPhoto,
} from '../../redux/auth/selectors.js';
import avatarDefault from '../../assets/avatarDefault.png';
import sprite from '../../assets/sprite.svg';

import css from './FormSettings.module.css';

const FormSetting = ({ handleClose }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const avatar = useSelector(selectUserPhoto);
  const [waterIntake, setWaterIntake] = useState(0);
  const isLoading = useSelector(selectIsLoading);
  const isLoadingPhoto = useSelector(selectIsLoadingPhoto);

  const schema = yup.object({
    name: yup
      .string()
      .min(2, 'Назва має містити не менше 2 символів')
      .max(60, 'Максимальна кількість символів імені 60')
      .required('Імя обовязково'),
    weight: yup
      .number()
      .min(0)
      .max(300, 'Вага значення менше 300')
      .typeError('Має бути числом'),
    dailyActiveTime: yup
      .number()
      .min(0)
      .max(12, 'Час активного спорту')
      .typeError('Має бути числом'),
    dailyWaterConsumption: yup
      .number()
      .min(0)
      .max(8, 'Добове споживання води максимум 8 л')
      .typeError('Має бути числом'),
  });

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: user.email,
      gender: user.gender,
      name: user.name,
      weight: user.weight,
      dailyActiveTime: user.dailyActiveTime,
      dailyWaterConsumption: user.dailyWaterConsumption,
    },
    mode: 'onChange',
  });

  const watchWeight = watch('weight');

  const watchGender = watch('gender');
  const watchActiveTime = watch('dailyActiveTime');

  useEffect(() => {
    let calcWaterIntake;
    const weight = parseInt(watchWeight || 0);
    const activeTime = parseInt(watchActiveTime || 0);
    if (watchGender === 'woman') {
      calcWaterIntake = weight * 0.03 + activeTime * 0.4;
    } else {
      calcWaterIntake = weight * 0.04 + activeTime * 0.6;
    }
    setWaterIntake(Math.min(parseFloat(calcWaterIntake), 8).toFixed(2));
  }, [watchActiveTime, watchGender, watchWeight]);

  const onSubmit = (data) => {
    // eslint-disable-next-line no-unused-vars
    const { photo, ...compareUser } = user;

    const isEndSpaceReg = /\s$/;
    if (isEndSpaceReg.test(data.name)) {
      data.name = data.name.trim();
    }

    const compareUserOrdered = Object.keys(compareUser)
      .sort()
      .reduce((obj, key) => {
        obj[key] = compareUser[key];
        return obj;
      }, {});

    const dataOrdered = Object.keys(data)
      .sort()
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {});

    if (JSON.stringify(compareUserOrdered) !== JSON.stringify(dataOrdered)) {
      // eslint-disable-next-line no-unused-vars
      const { email, ...payload } = data;
      dispatch(updateUserProfile(payload)).then(({ error }) => {
        if (!error) {
          handleClose();
        }
      });
    } else {
      handleClose();
    }
  };

  const handleAvatarChange = (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    if (file) {
      formData.append('avatar', file);
      dispatch(uploadUserPhoto(formData));
    }
  };

  const handleOnChange = (field) => (e) => {
    let value = e.target.value;
    const regex = /^(\d+(\.\d{0,3})?|\.\d{1,3})$/;
    if (value === '' || regex.test(value)) {
      field.onChange(value);
    }
  };

  const handleOnFocus = (field) => () => {
    if (field.value === 0) {
      field.onChange('');
    }
  };

  const handleOnBlur = (field) => () => {
    if (field.value === '') {
      field.onChange(0);
    } else if (field.value.startsWith('.')) {
      field.onChange('0' + field.value);
    }
  };

  return (
    <>
      <div className={css.userAvatar}>
        {!isLoadingPhoto ? (
          <img src={avatar || `${avatarDefault}`} alt="User photo" />
        ) : (
          <div className={css.loader}>
            <LoaderComponent />
          </div>
        )}
        <label>
          <div className={css.uploadContainer}>
            <svg className={css.icon}>
              <use xlinkHref={`${sprite}#icon-upload`}></use>
            </svg>
            <span className={css.ordinaryText}>Завантажити фото</span>
          </div>
          <input
            className={css.hideBtn}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
          />
          {errors.avatar && <p>{errors.avatar.message}</p>}
        </label>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={css.userSettingForm}>
        <div className={css.genderContainer}>
          <label className={css.genderIdentity}>
            <span className={css.boldText}>Ваша стать</span>
            <div className={css.radioContainer}>
              <input
                type="radio"
                id="woman"
                className={css.radioInput}
                {...register('gender')}
                value="woman"
                checked={watchGender === 'woman'}
              />
              <label htmlFor="woman" className={css.ordinaryText}>
                Жіноче
              </label>

              <input
                type="radio"
                id="man"
                className={css.radioInput}
                {...register('gender')}
                value="man"
                checked={watchGender === 'man'}
              />
              <label htmlFor="man" className={css.ordinaryText}>
                Чоловіче
              </label>
            </div>
            {errors.gender && (
              <p className={css.errorMessage}>{errors.gender.message}</p>
            )}
          </label>
        </div>

        <div className={css.userPreferences}>
          <div className={css.formNameEmail}>
            <label>
              <span className={css.boldText}>Ваше ім'я</span>
              <Controller
                render={({ field }) => (
                  <input
                    {...field}
                    className={css.inputBox}
                    placeholder="Користувач"
                    onChange={(e) => {
                      let value = e.target.value;
                      const regex = /^\s|\s{2}$/;
                      if (!regex.test(value)) {
                        field.onChange(value);
                      }
                    }}
                  />
                )}
                name="name"
                control={control}
              />

              {errors.name && (
                <p className={css.errorMessage}>{errors.name.message}</p>
              )}
            </label>

            <label>
              <span className={css.boldText}>Пошта</span>
              <input
                disabled
                {...register('email')}
                className={css.inputBox}
                placeholder={'placeholderEmail'}
              />
            </label>

            <div className={css.formula}>
              <p className={css.boldText}>Моя щоденна норма</p>
              <div className={css.formulaDescription}>
                <p className={css.ordinaryText}>
                  <span>Для жінок: </span>
                  <span className={css.formulaExpression}>
                    V=(M*0,03) + (T*0,4)
                  </span>
                </p>
                <p className={css.ordinaryText}>
                  <span>Для чоловіків: </span>
                  <span className={css.formulaExpression}>
                    V=(M*0,04) + (T*0,6)
                  </span>
                </p>
              </div>
              <p className={css.ordinaryText}>
                <span className={css.formulaExpression}>*&nbsp;</span>
                <span className={css.formulaDescriptionText}>
                  * V - об'єм водної норми в літрах на день, М - ваша вага, Т -
                  час активних занять спортом або іншої активної діяльності (у
                  разі відсутності встановіть 0)
                </span>
              </p>
              <p className={css.ordinaryText}>
                <span className={css.temporarySymbol}>!&nbsp;</span>
                Активний час (години)
              </p>
            </div>
          </div>

          <div className={css.formWeightTime}>
            <label>
              <span className={css.ordinaryText}>Ваша вага (кг):</span>
              <Controller
                name="weight"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className={css.inputBox}
                    onChange={handleOnChange(field)}
                    onFocus={handleOnFocus(field)}
                    onBlur={handleOnBlur(field)}
                  />
                )}
              />
              {errors.weight && (
                <p className={css.errorMessage}>{errors.weight.message}</p>
              )}
            </label>

            <label>
              <span className={css.ordinaryText}>
                Час активних занять спортом:
              </span>
              <Controller
                name="dailyActiveTime"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className={css.inputBox}
                    onChange={handleOnChange(field)}
                    onFocus={handleOnFocus(field)}
                    onBlur={handleOnBlur(field)}
                  />
                )}
              />

              {errors.dailyActiveTime && (
                <p className={css.errorMessage}>
                  {errors.dailyActiveTime.message}
                </p>
              )}
            </label>

            <div className={css.consumeWater}>
              <p className={css.ordinaryText}>
                Потрібна кількість води в літрах на день: &nbsp;
                <span className={css.userNorma}>
                  {isNaN(waterIntake) ? 0 : waterIntake}&nbsp;L
                </span>
              </p>

              <label>
                <span className={css.boldText}>
                  Запишіть, скільки води ви вип'єте:
                </span>
                <Controller
                  name="dailyWaterConsumption"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className={css.inputBox}
                      onChange={handleOnChange(field)}
                      onFocus={handleOnFocus(field)}
                      onBlur={handleOnBlur(field)}
                    />
                  )}
                />
                {errors.dailyWaterConsumption && (
                  <p className={css.errorMessage}>
                    {errors.dailyWaterConsumption.message}
                  </p>
                )}
              </label>
            </div>
          </div>
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className={`${css.submitBtn} ${css.boldTextBtn}`}
        >
          Зберегти
          {isLoading && (
            <div className={css.loaderWrapper}>
              <LoaderComponent height={56} width={56} />
            </div>
          )}
        </button>
      </form>
    </>
  );
};

export default FormSetting;
