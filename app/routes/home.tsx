import { useEffect, useState } from "react";
import { pokemonApi } from '../api/pokemon/pokemonApi';
import DropDown from "~/components/DropDown/DropDown";
import PokemonCard from "~/components/PokemonCard/PokemonCard";
import Button from "~/components/Button/Button";
import axios from "axios";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pokemon Generations" },
    { name: "description", content: "Welcome to Pokemon Generations!" },
  ];
}

export default function Home() {
  const [generationList, setGenerationList] = useState([]);
  const [pokemonInGeneration, setPokemonInGeneration] = useState([]);
  const [pokemonToDisplay, setPokemonToDisplay] = useState([]);
  const [displayCount, setDisplayCount] = useState(20);
  const [selectedGenerationUrl, setSelectedGenerationUrl] = useState('');
  const [fetchedUrls, setFetchedUrls] = useState(new Set());
  const [isLoadingRequest, setIsLoadingRequest] = useState(false);
  const [isLoadingMorePokemon, setIsLoadingMorePokemon] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoadingRequest(true);

    axios.get('https://pokeapi.co/api/v2/generation')
      .then((response) => {
        setGenerationList(response.data.results);
        setSelectedGenerationUrl(response.data.results[0].url);
        setIsLoadingRequest(false);
      })
      .catch((error) => {
        setIsLoadingRequest(false);
        setError(error?.message || "Failed to fetch generations");
      });
  }, []);

  useEffect(() => {
    if (!selectedGenerationUrl) return;
    setIsLoadingRequest(true);
    setPokemonToDisplay([]);
    setFetchedUrls(new Set());

    const fetchPokemon = async () => {
      await pokemonApi('GET', selectedGenerationUrl).then((data) => {
        setIsLoadingRequest(false);
        if (data.pokemon_species.length === 0) {
          setPokemonInGeneration([]);
        } else {
          setPokemonInGeneration(data.pokemon_species);
        }
      });
    };

    fetchPokemon();
  }, [selectedGenerationUrl]);

  useEffect(() => {
    const fetchIndividualPokemon = async (url) => {
      if (!fetchedUrls.has(url)) {
        await pokemonApi('GET', url).then(async (data) => {
          setPokemonToDisplay((prev) => [...prev, data]);
          setFetchedUrls((prev) => new Set(prev).add(url));
        });
      }
    };

    const paginatedPokemon = pokemonInGeneration.slice(0, displayCount);

    if (paginatedPokemon.length > 0) {
      let fetchCount = 0;
      const totalPokemon = paginatedPokemon.length;

      paginatedPokemon.forEach((pokemon) => {
        const pokemonUrl = pokemon.url.replace("-species", "");
        fetchIndividualPokemon(pokemonUrl).then(() => {
          fetchCount += 1;
          if (fetchCount === totalPokemon) {
            setIsLoadingMorePokemon(false);
          }
        });
      });
    } else {
      setIsLoadingMorePokemon(false);
    }
  }, [pokemonInGeneration, displayCount]);

  const loadMore = () => {
    setIsLoadingMorePokemon(true);
    setDisplayCount((prev) => prev + 20);
  };

  const showMorePokemon = () => {
    return displayCount <= pokemonInGeneration.length;
  };

  if (isLoadingRequest) {
    return <div>Loading Generations...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex-1 flex flex-col items-center gap-6 min-h-0">
      <DropDown
        label="Select a Generation"
        options={generationList}
        optionLabelKey={'name'}
        optionValueKey={'url'}
        onChange={val => {
          setDisplayCount(20);
          setSelectedGenerationUrl(val);
        }}
      />

      {isLoadingRequest || pokemonToDisplay.length === 0 ? (
        <p>Loading Pokémon...</p>
      ) : pokemonToDisplay.length === 0 && !isLoadingRequest ? (
        <p>No Pokémon Found</p>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-row flex-wrap justify-center gap-4">
            {pokemonToDisplay.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
          <div>
            <Button
              label={showMorePokemon() ? 'Load More Pokemon' : 'No More Pokemon'}
              isDisabled={!showMorePokemon()}
              isLoading={isLoadingMorePokemon}
              onClick={loadMore}
            />
          </div>
        </div>
      )}

    </div>
  );
}
