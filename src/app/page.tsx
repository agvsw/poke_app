'use client';

import Link from 'next/link';
import { useEffect, useState, useRef, useCallback } from 'react';

interface Pokemon {
  name: string;
  url: string;
}

interface ApiResponse {
  next: string | null;
  results: Pokemon[];
}

export default function HomePage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(
    'https://pokeapi.co/api/v2/pokemon?limit=12'
  );
  const [loading, setLoading] = useState<boolean>(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(async () => {
    if (!nextUrl || loading) return;
    setLoading(true);
    const res = await fetch(nextUrl);
    const data: ApiResponse = await res.json();
    setPokemons((prev) => [...prev, ...data.results]);
    setNextUrl(data.next);
    setLoading(false);
  }, [nextUrl, loading]);

  useEffect(() => {
    // Load initial data only once
    loadMore();
  }, [loadMore]);

  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Pokémon List
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6">
        {pokemons.map((pokemon) => {
          const id = pokemon.url.split('/').filter(Boolean).pop();
          return (
            <Link key={pokemon.name} href={`/pokemon/${pokemon.name}`}>
              <div className="bg-white shadow-md rounded-xl p-4 hover:scale-105 transition-transform cursor-pointer">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                  alt={pokemon.name}
                  className="mx-auto"
                />
                <p className="text-center capitalize font-semibold mt-2">
                  {pokemon.name}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Loader Trigger */}
      <div ref={loaderRef} className="text-center py-6">
        {loading && (
          <span className="text-gray-600 animate-pulse">Loading more...</span>
        )}
      </div>
    </div>
  );
}
