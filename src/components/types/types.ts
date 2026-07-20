type BaseForm = {
  formType: 'uncontrolled' | 'rhf';
  name: string;
  email: string;
  gender: string;
  country: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

export type FormValues = BaseForm & {
  age: string;
  image: FileList;
};

export type FormSubmission = Omit<BaseForm, 'confirmPassword'> & {
  age: number;
  image: string;
};
