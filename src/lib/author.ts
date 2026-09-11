export const AUTHOR = {
  name: 'Pavla Zimmermannová',
  role: 'Zakladatelka a autorka FlyQueens',
  profileUrl: 'https://www.linklady.cz/o-mne',
  bio: 'Pavla stojí za návrhem, obsahem a rozvojem FlyQueens. V online marketingu působí od roku 2015 a při tvorbě webu propojuje SEO, data a srozumitelný obsah. Letecká fakta ověřuje z dohledatelných zdrojů a otevřeně popisuje limity veřejných dat.',
} as const

export const AUTHOR_JSON_LD = {
  '@type': 'Person',
  name: AUTHOR.name,
  url: AUTHOR.profileUrl,
  jobTitle: AUTHOR.role,
}
