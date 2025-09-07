'use client';

import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { User, LeaderboardEntry } from '@/types';
import Image from 'next/image';
import { usernames } from '@/utils/constants';

export default function Home() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();

      if (!response.ok) {
        console.error('Error fetching users:', data.error);
        return;
      }

      const leaderboardData: LeaderboardEntry[] = data.users
        .filter((user: User) => usernames[user.username] !== 'Torneo')
        .map((user: User) => {
          const metadata = user.metadata;
          const totalPoints = (metadata.wins * 3) + (metadata.seconds * 2) + (metadata.thirds * 1) + metadata.saves;
          const gamesPlayed = metadata.wins + metadata.seconds + metadata.thirds + metadata.losses;

          return {
            id: user.id,
            username: user.username,
            displayName: metadata.displayName,
            avatarUrl: metadata.avatarUrl,
            totalPoints,
            wins: metadata.wins || 0,
            seconds: metadata.seconds || 0,
            thirds: metadata.thirds || 0,
            saves: metadata.saves || 0,
            losses: metadata.losses || 0,
            gamesPlayed
          };
        })
        .sort((a: LeaderboardEntry, b: LeaderboardEntry) => b.totalPoints - a.totalPoints);

      setLeaderboard(leaderboardData);
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
          <div className="text-mtg-gold">Cargando tabla de posiciones...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-mtg-gold mb-2">Liga MTG Commander</h1>
          <p className="text-gray-300">Tabla de posiciones actual</p>
        </div>

        <div className="mtg-card rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-mtg-gray">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-mtg-gold uppercase tracking-wider">
                    Posición
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-mtg-gold uppercase tracking-wider">
                    Jugador
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-mtg-gold uppercase tracking-wider">
                    Puntos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-mtg-gold uppercase tracking-wider">
                    1º
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-mtg-gold uppercase tracking-wider">
                    2º
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-mtg-gold uppercase tracking-wider">
                    3º
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-mtg-gold uppercase tracking-wider">
                    Saves
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-mtg-gold uppercase tracking-wider">
                    Partidas
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mtg-border">
                {leaderboard.map((player, index) => (
                  <tr key={player.id} className="hover:bg-mtg-gray/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`text-lg font-bold ${index === 0 ? 'text-yellow-400' :
                          index === 1 ? 'text-gray-300' :
                            index === 2 ? 'text-amber-600' : 'text-white'
                          }`}>
                          #{index + 1}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {player.avatarUrl && (
                          <Image className="h-8 w-8 rounded-full mr-3" src={player.avatarUrl} alt="" width={32} height={32} />
                        )}
                        <div>
                          <div>
                            <div className="text-sm font-medium text-white">{player.displayName}</div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-lg font-bold text-mtg-gold">{player.totalPoints}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {player.wins}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {player.seconds}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {player.thirds}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {player.saves}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {player.gamesPlayed}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {leaderboard.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">No hay jugadores registrados aún.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
