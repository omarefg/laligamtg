'use client';

import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Round, User } from '@/types';
import { usernames } from '@/utils/constants';

export default function RoundsPage() {
  const [rounds, setRounds] = useState<Round[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRounds();
  }, []);

  const fetchRounds = async () => {
    try {
      const response = await fetch('/api/users');
      const responseData = await response.json();

      if (!response.ok) {
        console.error('Error fetching users:', responseData);
        return;
      }

      // Deofuscar los datos
      const { deobfuscate: deobfuscateDataClient } = await import('@/utils/obfuscation');
      const data = deobfuscateDataClient<{ users: User[] }>(responseData.data);

      if (!data) {
        console.error('Error al deofuscar datos');
        return;
      }

      const rounds = data.users.find((u: User) => usernames[u.username] == 'Torneo')?.metadata?.rounds || [];
      rounds.sort((a: Round, b: Round) => a.roundNumber - b.roundNumber);

      setRounds(rounds);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const joinStrings = (users: string[]) => {
    return users.join(', ')
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-mtg-gold">Cargando resultados...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-mtg-gold mb-2">Resultados de Rondas</h1>
          <p className="text-gray-300">Historial de todas las partidas</p>
        </div>

        {rounds.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">No hay rondas registradas aún.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {rounds.map((round) => (
              <div key={round.roundNumber} className="mtg-card rounded-lg p-6">
                <h2 className="text-2xl font-bold text-mtg-gold mb-4">
                  Ronda {round.roundNumber}
                </h2>

                <div className="grid gap-4 md:grid-cols-2">
                  {round.tables.map((table, tableIndex) => (
                    <div key={tableIndex} className="bg-mtg-gray rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-white mb-3">
                        Mesa {tableIndex + 1}
                      </h3>

                      <div className="mb-3 pb-2 border-b border-mtg-border">
                        <span className="text-gray-400 text-sm">
                          📅 {round.date ? new Date(round.date + 'T00:00:00').toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          }) : 'por definir'}
                        </span>
                      </div>

                      <div className="mb-4">
                        <span className="text-gray-400 text-sm font-medium">Jugadores:</span>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {table.players.map((player, playerIndex) => (
                            <span key={playerIndex} className="bg-mtg-dark px-2 py-1 rounded text-sm text-white">
                              {player}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-yellow-400 font-medium">🥇 1º lugar:</span>
                          <span className="text-white">{joinStrings(table.winner)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 font-medium">🥈 2º lugar:</span>
                          <span className="text-white">{joinStrings(table.second)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-amber-600 font-medium">🥉 3º lugar:</span>
                          <span className="text-white">{joinStrings(table.third)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-red-600 font-medium">Pierden:</span>
                          <span className="text-white">{joinStrings(table.losses)}</span>
                        </div>

                        {table.bannedCards && table.bannedCards.length > 0 && (
                          <div className="mt-3 pt-2 border-t border-mtg-border">
                            <span className="text-red-400 font-medium">Cartas baneadas:</span>
                            <div className="mt-1 text-sm text-gray-300">
                              {joinStrings(table.bannedCards)}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {round.bye && (
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-mtg-border">
                    <span className="text-gray-400 font-medium">Descansa:</span>
                    <span className="text-white">{joinStrings([round.bye])}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
