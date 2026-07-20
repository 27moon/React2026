import { useRef, useState } from 'react';
import { Input } from '../../ui/input/Input';
import { Button } from '../../ui/button/Button';
import { SelectField } from '../../ui/selectField/SelectField';
import { CountryField } from '../../ui/countryField/CountryField';
import { createFormSchema } from '../../../schemas/formSchema';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { PasswordStrengthIndicator } from '../../ui/passwordStrengthIndicator/PasswordStrengthIndicator';
import { convertFileToBase64 } from '../../../utils/imageConverter';
import { saveFormData } from '../../../store/formDataSlice';
import { selectCountriesList } from '../../../store/countriesSlice';
import { GENDER_OPTIONS } from '../../../utils/constants';

type UncontrolledFormProps = {
  onClose: () => void;
};

export const UncontrolledForm = ({ onClose }: UncontrolledFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordValue, setPasswordValue] = useState('');

  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectCountriesList);

  const mutableCountries = countries;
  const schema = createFormSchema(mutableCountries);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const file = formData.get('image') as File;
    const hasFile = file && file.name && file.size > 0;

    const result = schema.safeParse({
      formType: 'uncontrolled',
      name: formData.get('name'),
      age: formData.get('age'),
      email: formData.get('email'),
      gender: formData.get('gender'),
      country: formData.get('country'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      terms: formData.get('terms') === 'on',
      image: hasFile ? [file] : null,
    });

    if (!result.success) {
      const formattedErrors: Record<string, string> = {};

      for (const issue of result.error.issues) {
        const fieldName = issue.path[0] as string;

        if (!formattedErrors[fieldName]) {
          formattedErrors[fieldName] = issue.message;
        }
      }

      setErrors(formattedErrors);
      return;
    }
    setErrors({});

    try {
      const targetFile = result.data.image?.[0] || file;
      const base64Image = await convertFileToBase64(targetFile);

      const finalPayload = {
        ...result.data,
        age: Number(result.data.age),
        image: base64Image,
        formType: 'uncontrolled' as const,
      };

      dispatch(saveFormData(finalPayload));

      formRef.current?.reset();
      setPasswordValue('');
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <h2>Uncontrolled Form</h2>

      <Input id="name" name="name" label="Name" error={errors.name} />
      <Input id="age" name="age" label="Age" type="number" error={errors.age} />
      <Input id="email" name="email" label="Email" error={errors.email} />

      <SelectField
        id="gender"
        name="gender"
        label="Gender"
        options={GENDER_OPTIONS}
      />

      <CountryField
        id="country"
        name="country"
        label="Country"
        countries={countries}
        error={errors.country}
      />

      <Input
        id="image"
        name="image"
        label="Image"
        type="file"
        error={errors.image}
      />

      <Input
        id="password"
        name="password"
        label="Password"
        type="password"
        error={errors.password}
        onChange={(e) => setPasswordValue(e.target.value)}
      />

      <PasswordStrengthIndicator passwordValue={passwordValue} />

      <Input
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        error={errors.confirmPassword}
      />

      <div>
        <label htmlFor="terms">
          <input id="terms" name="terms" type="checkbox" />
          Accept Terms
        </label>
        {errors.terms && <p className="error">{errors.terms}</p>}
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
};
