import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { searchCharacterById, type Character } from '../../services/api';
import { Loader } from '../Loader/loader';

export const DetailsBlock = () => {
  const [searchParams] = useSearchParams();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(false);
  const detailsId = searchParams.get('details');
  const navigate = useNavigate();

  useEffect(() => {
    if (!detailsId) {
      setCharacter(null);
      return;
    }
    const id = Number(detailsId);

    if (!Number.isInteger(id) || id < 1) {
      setCharacter(null);
      return;
    }

    async function fetchCharacter() {
      setLoading(true);
      try {
        const data = await searchCharacterById(Number(detailsId));

        setCharacter(data);
      } catch (error) {
        console.error('Failed to fetch character:', error);
        setCharacter(null);
      } finally {
        setLoading(false);
      }
    }

    fetchCharacter();
  }, [detailsId]);

  const handleCloseShowCard = () => {
    searchParams.delete('details');
    navigate({ search: searchParams.toString() });
  };

  if (!detailsId) return null;
  if (loading) return <Loader />;
  if (!character) return <div>Character not found.</div>;

  return (
    <div>
      <button onClick={handleCloseShowCard}>Close</button>
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} />
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
      <p>Origin: {character.origin.name}</p>
      <p>Location: {character.location.name}</p>
    </div>
  );
};
