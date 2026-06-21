import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '../../ui/input/Input';
import { Button } from '../../ui/button/Button';
import { SelectField } from '../../ui/selectField/SelectField';
import { CountryField } from '../../ui/countryField/CountryField';
import { PasswordStrengthIndicator } from '../../ui/passwordStrengthIndicator/PasswordStrengthIndicator';

import { createFormSchema } from '../../../schemas/formSchema';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { saveFormData } from '../../../store/formDataSlice';
import { convertFileToBase64 } from '../../../utils/imageConverter';
import type { z } from 'zod';

type RHFFormProps = {
  onClose: () => void;
};

export const RHFForm = ({ onClose }: RHFFormProps) => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector((state) => state.countries.list);

  const schema = createFormSchema(countries);
  type FormValues = z.infer<typeof schema>;

  const [passwordValue, setPasswordValue] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      formType: 'rhf',
      name: '',
      age: '',
      email: '',
      gender: '',
      country: '',
      password: '',
      confirmPassword: '',
      terms: false,
      image: undefined,
    },
  });

  const onSubmit = async (data: FormValues) => {
    const file = data.image?.[0];
    const base64 = file ? await convertFileToBase64(file) : '';

    const payload = {
      ...data,
      age: Number(data.age),
      image: base64,
      formType: 'rhf' as const,
    };

    dispatch(saveFormData(payload));

    reset();
    setPasswordValue('');
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>React Hook Form</h2>

      <Input
        id="name"
        label="Name"
        {...register('name')}
        error={errors.name?.message}
      />

      <Input
        id="age"
        label="Age"
        type="number"
        {...register('age')}
        error={errors.age?.message}
      />

      <Input
        id="email"
        label="Email"
        {...register('email')}
        error={errors.email?.message}
      />

      <SelectField
        id="gender"
        label="Gender"
        options={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
        ]}
        {...register('gender')}
      />

      <CountryField
        id="country"
        label="Country"
        countries={countries}
        {...register('country')}
        error={errors.country?.message}
      />

      <Input
        id="image"
        label="Image"
        type="file"
        error={errors.image?.message as string}
        {...register('image')}
      />

      <Input
        id="password"
        label="Password"
        type="password"
        error={errors.password?.message}
        {...register('password', {
          onChange: (e) => setPasswordValue(e.target.value),
        })}
      />

      <PasswordStrengthIndicator passwordValue={passwordValue} />

      <Input
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message}
      />

      <div>
        <label htmlFor="terms">
          <input type="checkbox" {...register('terms')} />
          Accept Terms
        </label>

        {errors.terms?.message && (
          <p className="error">{errors.terms.message}</p>
        )}
      </div>

      <Button type="submit" disabled={!isValid}>
        Submit
      </Button>
    </form>
  );
};
