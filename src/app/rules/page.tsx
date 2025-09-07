import Layout from '@/components/Layout';

export default function RulesPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-mtg-gold mb-2">Reglas de la Liga</h1>
          <p className="text-gray-300">Commander League Rules</p>
        </div>

        <div className="mtg-card rounded-lg p-8 max-w-4xl mx-auto">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-mtg-gold mb-4">Formato y Estructura</h2>
            <ul className="space-y-2 text-gray-300 mb-6">
              <li>• Cada jugador participa con <strong className="text-white">2 mazos de Commander</strong></li>
              <li>• Mesas siempre de <strong className="text-white">4 jugadores</strong></li>
              <li>• Con 9 jugadores totales: en cada ronda hay <strong className="text-white">2 mesas de 4 y 1 jugador descansa</strong></li>
              <li>• Antes de cada partida se asigna par/impar a cada mazo, se lanza un dado para determinar qué mazo usar</li>
            </ul>

            <h2 className="text-2xl font-bold text-mtg-gold mb-4">Sistema de Puntuación</h2>
            <div className="bg-mtg-gray rounded-lg p-4 mb-6">
              <ul className="space-y-2 text-gray-300">
                <li>• <span className="text-mtg-gold font-bold">1º lugar: +3 puntos</span></li>
                <li>• <span className="text-gray-300 font-bold">2º lugar: +2 puntos</span></li>
                <li>• <span className="text-amber-600 font-bold">3º lugar: +1 punto</span></li>
                <li>• <span className="text-gray-500 font-bold">4º lugar: 0 puntos</span></li>
              </ul>
            </div>

            <h3 className="text-xl font-bold text-white mb-3">Reglas Especiales de Puntuación</h3>
            <ul className="space-y-2 text-gray-300 mb-6">
              <li>• Si el ganador <strong className="text-white">elimina a todos los jugadores activos de un golpe</strong> (cuando hay más de dos jugadores activos), <strong className="text-red-400">solo él obtiene puntos</strong></li>
              <li>• Un jugador que <strong className="text-white">salve de daño letal a un oponente</strong> le sumará <strong className="text-mtg-gold">un único punto</strong> que no puede ganarse nuevamente en la misma partida</li>
              <li>• Solo se contará el save si <strong className="text-white">salvando a este oponente no te salvas a ti mismo</strong></li>
            </ul>

            <h2 className="text-2xl font-bold text-mtg-gold mb-4">Sistema de Baneos</h2>
            <ul className="space-y-2 text-gray-300 mb-6">
              <li>• Tras cada partida, los <strong className="text-white">3 perdedores votan una carta del mazo ganador</strong> para banear</li>
              <li>• La carta debe haber sido <strong className="text-white">usada durante la partida</strong> (cualquier interacción en mesa cuenta)</li>
              <li>• El ganador debe <strong className="text-white">sustituir la carta baneada</strong> antes de su próxima partida</li>
              <li>• Un mazo con <strong className="text-red-400">5 baneos queda retirado</strong> y el jugador debe usar su otro mazo</li>
            </ul>

            <h2 className="text-2xl font-bold text-mtg-gold mb-4">Estructura de la Liga</h2>
            <ul className="space-y-2 text-gray-300 mb-6">
              <li>• <strong className="text-white">9 rondas</strong> en total (temporada regular)</li>
              <li>• Todos los jugadores <strong className="text-white">descansan 1 vez</strong> durante la liga</li>
              <li>• Tras las 9 rondas, los <strong className="text-mtg-gold">4 jugadores con más puntos juegan la final</strong></li>
            </ul>

            <h2 className="text-2xl font-bold text-mtg-gold mb-4">Formato Final</h2>
            <p className="text-gray-300">
              Los 4 mejores jugadores se enfrentan en una mesa final para determinar al campeón de la liga.
              Se mantienen las mismas reglas de puntuación y baneos.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
