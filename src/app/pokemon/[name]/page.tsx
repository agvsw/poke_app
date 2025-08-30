import Link from "next/link";

interface PageProps {
    params: {
        name: string;
    };
}

interface Ability {
    ability: {
        name: string;
    };
}

interface PokemonDetail {
    name: string;
    sprites: {
        front_default: string;
    };
    base_experience: number;
    height: number;
    abilities: Ability[];
}

type Props = {
    params: Promise<{ name: string }>; // Next.js expects params as Promise
};

export default async function PokemonDetailPage({ params }: Props) {
    const { name } = await params;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemon: PokemonDetail = await res.json();

    return (
        <div className="container mx-auto p-4">
            <Link href="/" className="mb-4 inline-block px-4 py-2 bg-gray-200 rounded-lg">
                ← Back
            </Link>
            <div className="bg-white shadow-xl rounded-xl p-6 text-center">
                <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="mx-auto"
                />
                <h1 className="text-4xl font-bold capitalize">{pokemon.name}</h1>
                <p className="mt-2 text-gray-600">
                    Base Experience: {pokemon.base_experience}
                </p>
                <p className="mt-2">Height: {pokemon.height}</p>

                <h2 className="text-xl font-semibold mt-4">Abilities</h2>
                <ul className="flex flex-wrap justify-center gap-3 mt-2">
                    {pokemon.abilities.map((a, i) => (
                        <li
                            key={i}
                            className="bg-blue-100 px-3 py-1 rounded-full capitalize"
                        >
                            {a.ability.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
