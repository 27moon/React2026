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

      age: z
        .string()
        .min(1, 'Age must be provided')
        .regex(/^-?\d+$/, 'Only numbers')
        .transform((val) => Number(val))
        .refine((num) => num >= 0, 'Age cannot be negative'),

      email: z
        .string()
        .min(1, 'Email must be provided')

        .refine((email) => {
          const parts = email.split('@');
          return parts.length === 2;
        }, 'Email must contain exactly one @')

        .refine((email) => {
          const [localPart] = email.split('@');
          return localPart.length > 0;
        }, 'Email local part cannot be empty')

        .refine((email) => {
          const [, domainPart] = email.split('@');
          return domainPart && domainPart.includes('.');
        }, 'Email domain must contain a dot'),

      gender: z.string().min(1, 'Gender is required'),

      country: z
        .string()
        .refine((val) => countries.includes(val), 'Country is required'),

      password: z.string().min(1, 'Password must be provided'),

      confirmPassword: z.string().min(1, 'Please confirm the password'),

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
