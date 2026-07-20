import './Dashboard.css';

type Submission = {
  name: string;
  age: number;
  email: string;
  gender: string;
  country: string;
  formType: string;
  image: string;
};

type CardProps = {
  item: Submission;
};

export const Card = ({ item }: Readonly<CardProps>) => {
  const fields = [
    { label: 'Age', value: item.age },
    { label: 'Email', value: item.email },
    { label: 'Gender', value: item.gender },
    { label: 'Country', value: item.country },
    { label: 'Form', value: item.formType },
  ];

  return (
    <div className="card">
      <h3>{item.name}</h3>

      {fields.map((field) => (
        <div key={field.label}>
          <p>{field.label}:</p> {field.value}
        </div>
      ))}

      {item.image && (
        <img
          src={item.image}
          alt={`${item.name} upload`}
          className="card-image"
        />
      )}
    </div>
  );
};
