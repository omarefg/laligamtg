'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import { supabase } from '@/lib/supabase';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user && user.email?.includes('xephyro')) {
      setIsLoggedIn(true);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Por simplicidad, solo validamos que el username sea 'xephyro'
      if (username !== 'xephyro') {
        setError('Usuario no autorizado');
        return;
      }

      // En una implementación real, aquí validarías contra Supabase
      // Por ahora simulamos el login exitoso
      setIsLoggedIn(true);
    } catch (err) {
      setError('Error de autenticación');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <Layout>
        <div className="max-w-md mx-auto">
          <div className="mtg-card rounded-lg p-8">
            <h1 className="text-2xl font-bold text-mtg-gold mb-6 text-center">
              Admin Panel
            </h1>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 bg-mtg-gray border border-mtg-border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-mtg-gold"
                  placeholder="xephyro"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-mtg-gray border border-mtg-border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-mtg-gold"
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && (
                <div className="text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mtg-gold rounded-md py-2 px-4 font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </button>
            </form>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-mtg-gold">Panel de Administración</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="mtg-card rounded-lg p-6">
            <h2 className="text-xl font-bold text-mtg-gold mb-4">Acciones Rápidas</h2>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 bg-mtg-gray rounded-md hover:bg-mtg-border transition-colors">
                <div className="text-white font-medium">Agregar Nueva Ronda</div>
                <div className="text-gray-400 text-sm">Registrar resultados de mesas</div>
              </button>
              <button className="w-full text-left px-4 py-3 bg-mtg-gray rounded-md hover:bg-mtg-border transition-colors">
                <div className="text-white font-medium">Banear Cartas</div>
                <div className="text-gray-400 text-sm">Agregar cartas al ban list</div>
              </button>
              <button className="w-full text-left px-4 py-3 bg-mtg-gray rounded-md hover:bg-mtg-border transition-colors">
                <div className="text-white font-medium">Editar Jugador</div>
                <div className="text-gray-400 text-sm">Modificar stats y commanders</div>
              </button>
            </div>
          </div>

          <div className="mtg-card rounded-lg p-6">
            <h2 className="text-xl font-bold text-mtg-gold mb-4">Estado de la Liga</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Rondas completadas:</span>
                <span className="text-white">0 / 9</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Jugadores activos:</span>
                <span className="text-white">9</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Partidas jugadas:</span>
                <span className="text-white">0</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mtg-card rounded-lg p-6">
          <h2 className="text-xl font-bold text-mtg-gold mb-4">Próximas Características</h2>
          <div className="text-gray-400 space-y-2">
            <p>• Formulario para agregar resultados de rondas</p>
            <p>• Editor de metadata de usuarios</p>
            <p>• Gestión de cartas baneadas</p>
            <p>• Generador automático de emparejamientos</p>
            <p>• Exportar datos de la liga</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
