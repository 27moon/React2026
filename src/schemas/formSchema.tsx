import { z } from 'zod';

export const createFormSchema = (countries: string[]) =>
  z
    .object({
      formType: z.enum(['uncontrolled', 'rhf']),
      name: z
        .string()
        .min(1, 'Name is required')
        .refine(
          (v) => v[0] === v[0]?.toUpperCase(),
          'First letter must be uppercase'
        ),
      age: z.coerce.number().min(0, 'Age cannot be negative'),

      email: z.string().refine((email) => {
        const [local, domain] = email.split('@');

        return (
          email.includes('@') && local?.length > 0 && domain?.includes('.')
        );
      }, 'Invalid email'),

      gender: z.string().min(1, 'Gender is required'),

      country: z
        .string()
        .refine(
          (val) => countries.includes(val),
          'The country is not available'
        ),

      password: z.string().min(1, 'Password required'),

      confirmPassword: z.string(),

      terms: z.literal(true, {
        message: 'You must accept terms',
      }),

      image: z
        .instanceof(File)
        .refine(
          (file) => ['image/png', 'image/jpeg'].includes(file.type),
          'Only PNG/JPEG allowed'
        )
        .refine(
          (file) => file.size <= 2 * 1024 * 1024,
          'Image must be under 2MB'
        ),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: 'Passwords must match',
    });
