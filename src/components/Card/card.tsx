'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import type { Character } from '../../services/types';
import './card.css';

import { addCard, removeCard } from '../../store/selectedCardsSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

type CardProps = {
  character: Character;
};

export function Card({ character }: CardProps) {
  const { id, name, image } = character;

  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';

  const dispatch = useDispatch();

  const selectedItems = useSelector((state: RootState) =>
    state.selectedCards.selected.some((item) => item.id === id)
  );

  const handleCheckboxChange = () => {
    if (selectedItems) {
      dispatch(removeCard(id));
    } else {
      dispatch(addCard(character));
    }
  };

  return (
    <Link href={`/?page=${page}&details=${id}`}>
      <div className="card" data-testid="card">
        <img className="img" src={image} alt={name} />

        <h3 className="name">{name}</h3>

        <input
          className="checkbox"
          type="checkbox"
          checked={selectedItems}
          onChange={handleCheckboxChange}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </Link>
  );
}
