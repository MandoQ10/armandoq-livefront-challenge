import { Link } from "react-router";
import Card from "../Card/Card";
import { splitStringByDash } from '~/utils/splitStringByDash';

function PokemonCard({pokemon}) {
  const formattedPokemonName = splitStringByDash(pokemon.name);
  return (
    <Link
      className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
      to={`/pokemon/${pokemon.name}`}
    >
      <Card>
        <div className="flex flex-col min-w-sm items-center">
          <img height="96" width="96" src={pokemon.sprites.front_default} alt={`Image of ${formattedPokemonName}`} />
          <div className="text-black break-words text-center w-full">{ formattedPokemonName }</div>
        </div>
      </Card>
    </Link>
  )
}
export default PokemonCard;