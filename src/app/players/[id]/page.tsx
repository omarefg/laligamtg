'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/components/Layout';
import { UserMetadata } from '@/types';

export default function PlayerPage() {
  const params = useParams();
  const [player, setPlayer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchPlayer();
    }
  }, [params.id]);

  const fetchPlayer = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      
      if (!response.ok) {
        console.error('Error fetching users:', data.error);
        return;
      }

      const user = data.users.find((u: any) => u.id === params.id);
      if (user) {
        setPlayer(user);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-mtg-gold">Cargando jugador...</div>
        </div>
      </Layout>
    );
  }

  if (!player) {
    return (
      <Layout>
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold text-white mb-4">Jugador no encontrado</h1>
          <p className="text-gray-400">El jugador que buscas no existe.</p>
        </div>
      </Layout>
    );
  }

  const metadata = player.metadata as UserMetadata;
  const totalPoints = (metadata.wins * 3) + (metadata.seconds * 2) + (metadata.thirds * 1) + metadata.saves;
  const gamesPlayed = metadata.wins + metadata.seconds + metadata.thirds + metadata.losses;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header del jugador */}
        <div className="mtg-card rounded-lg p-6">
          <div className="flex items-center space-x-4">
            {metadata.avatarUrl && (
              <img 
                src={metadata.avatarUrl} 
                alt={metadata.displayName}
                className="w-16 h-16 rounded-full"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold text-mtg-gold">{metadata.displayName}</h1>
              <p className="text-gray-400">@{player.username}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Estadísticas */}
          <div className="mtg-card rounded-lg p-6">
            <h2 className="text-2xl font-bold text-mtg-gold mb-4">Estadísticas</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Puntos totales:</span>
                <span className="text-mtg-gold font-bold text-xl">{totalPoints}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Partidas jugadas:</span>
                <span className="text-white">{gamesPlayed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Victorias (1º):</span>
                <span className="text-white">{metadata.wins}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Segundos lugares:</span>
                <span className="text-white">{metadata.seconds}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Terceros lugares:</span>
                <span className="text-white">{metadata.thirds}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Saves realizados:</span>
                <span className="text-white">{metadata.saves}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Derrotas (4º):</span>
                <span className="text-white">{metadata.losses}</span>
              </div>
              {gamesPlayed > 0 && (
                <div className="flex justify-between pt-2 border-t border-mtg-border">
                  <span className="text-gray-300">Ratio de victoria:</span>
                  <span className="text-white">{((metadata.wins / gamesPlayed) * 100).toFixed(1)}%</span>
                </div>
              )}
            </div>
          </div>

          {/* Commanders */}
          <div className="mtg-card rounded-lg p-6">
            <h2 className="text-2xl font-bold text-mtg-gold mb-4">Commanders</h2>
            {metadata.commanders && metadata.commanders.length > 0 ? (
              <div className="space-y-2">
                {metadata.commanders.map((commander, index) => (
                  <div key={index} className="bg-mtg-gray rounded p-3">
                    <span className="text-white font-medium">{commander}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No hay commanders registrados.</p>
            )}
          </div>
        </div>

        {/* Cartas baneadas */}
        <div className="mtg-card rounded-lg p-6">
          <h2 className="text-2xl font-bold text-mtg-gold mb-4">Cartas Baneadas</h2>
          {metadata.bannedCards && metadata.bannedCards.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {metadata.bannedCards.map((card, index) => (
                <div key={index} className="bg-mtg-gray rounded p-3 border-l-4 border-red-500">
                  <span className="text-white font-medium">{card}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No hay cartas baneadas aún.</p>
          )}
        </div>

        {/* Historial de rondas */}
        <div className="mtg-card rounded-lg p-6">
          <h2 className="text-2xl font-bold text-mtg-gold mb-4">Historial de Partidas</h2>
          {metadata.rounds && metadata.rounds.length > 0 ? (
            <div className="space-y-4">
              {metadata.rounds.map((round, index) => (
                <div key={index} className="bg-mtg-gray rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Ronda {round.roundNumber}
                  </h3>
                  {round.tables.map((table, tableIndex) => {
                    const playerPosition = 
                      table.winner === player.id ? '1º lugar' :
                      table.second === player.id ? '2º lugar' :
                      table.third === player.id ? '3º lugar' : '4º lugar';
                    
                    const positionColor = 
                      playerPosition === '1º lugar' ? 'text-mtg-gold' :
                      playerPosition === '2º lugar' ? 'text-gray-300' :
                      playerPosition === '3º lugar' ? 'text-amber-600' : 'text-gray-500';

                    return (
                      <div key={tableIndex} className="text-sm">
                        <span className={`font-medium ${positionColor}`}>
                          {playerPosition}
                        </span>
                        <span className="text-gray-400 ml-2">
                          Mesa {tableIndex + 1}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No hay historial de partidas.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
