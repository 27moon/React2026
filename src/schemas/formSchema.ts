import { z } from 'zod';

export const createFormSchema = (countries: string[]) =>
  z
    .object({
      formType: z.enum(['uncontrolled', 'rhf']),

      name: z
        .string()
        .min(1, 'Name is required')
        .refine((v) => v[0] === v[0]?.toUpperCase(), {
          message: 'First letter must be uppercase',
        }),

      age: z
        .string()
        .min(1, 'Age is required')
        .refine((v) => /^\d+$/.test(v), {
          message: 'Only numbers allowed',
        })
        .refine((v) => Number(v) >= 0, {
          message: 'Age cannot be negative',
        }),

      email: z
        .string()
        .min(1, 'Email is required')
        .refine((email) => email.includes('@'), {
          message: 'Email must contain @',
        })
        .refine(
          (email) => {
            const [local, domain] = email.split('@');
            return !!local && !!domain?.includes('.');
          },
          {
            message: 'Invalid email format',
          }
        ),

      gender: z.string().min(1, 'Gender is required'),

      country: z.string().refine((val) => countries.includes(val), {
        message: 'Country must be selected',
      }),

      password: z.string().min(1, 'Password is required'),

      confirmPassword: z.string().min(1, 'Confirm password is required'),

      terms: z.boolean().refine((v) => v === true, {
        message: 'You must accept terms',
      }),

      image: z
        .custom<FileList>()
        .refine((files) => files && files.length > 0, {
          message: 'Image is required',
        })
        .refine(
          (files) => {
            const file = files?.[0];
            return (
              file &&
              ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)
            );
          },
          {
            message: 'Only PNG/JPEG allowed',
          }
        )
        .refine(
          (files) => {
            const file = files?.[0];
            return file && file.size <= 2 * 1024 * 1024;
          },
          {
            message: 'Image must be under 2MB',
          }
        ),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: 'Passwords must match',
    });
