export const usernames = {
  'omarefg92+torneo': 'Torneo',
  'omarefg92+xephyro': 'Xephyro',
  'omarefg92+negro': 'Negro',
  'omarefg92+richard': 'Richard',
  'omarefg92+teran': 'Teran',
  'omarefg92+borux': 'Borux',
  'omarefg92+mauro': 'Mauro',
  'omarefg92+gueta': 'Gueta',
  'omarefg92+goldor': 'Goldor',
} as const

export type Username = typeof usernames[keyof typeof usernames];

export type SupabaseUserName = keyof typeof usernames;