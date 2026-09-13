export const AUTHOR = {
  name: 'Pavla Zimmermannová',
  role: 'Zakladatelka a autorka FlyQueens',
  profileUrl: 'https://www.linklady.cz/o-mne',
  bio: 'Deset let jsem pracovala ve společnosti EDUARD – MODEL ACCESSORIES. Právě tam jsem si zamilovala letadla i létání. Dnes tuhle lásku propojuji se zkušenostmi z online marketingu a stojím za obsahem i rozvojem FlyQueens.',
} as const

export const AUTHOR_JSON_LD = {
  '@type': 'Person',
  name: AUTHOR.name,
  url: AUTHOR.profileUrl,
  jobTitle: AUTHOR.role,
  description: AUTHOR.bio,
}
