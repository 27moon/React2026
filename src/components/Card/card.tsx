import type { FC } from 'react';
import type { Character } from '../../services/api';
import './card.css';

type CardProps = {
  character: Character;
};

export const Card: FC<CardProps> = ({ character }) => {
  const { name, species, image, gender, origin, location } = character;

  return (
    <div className="card" data-testid="card">
      <img className="img" src={image} alt={name}></img>
      <h3 className="name">{name}</h3>
      <p>Species: {species}</p>
      <p>Gender: {gender}</p>
      <p>Location: {location.name}</p>
      <p>Origin: {origin.name}</p>
    </div>
  );
};
