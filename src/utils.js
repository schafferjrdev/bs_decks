function pad(s) {
  while (s.length < 3) s = '0' + s
  return s
}

''.split('\n\n\n').map((e, i) => ({
  uuid: 'bsum_' + pad('' + (i + 1)),
  image: `http://www.magicjebb.com.br/bs_images/001_bsum/BSUM_${pad(
    '' + (i + 1),
  )}.png`,
  data: e,
  collection: 'bsum',
}))

export const CARD_TYPES = {
  Suporte: '#488370',
  Cenário: '#536b82',
  Personagem: '#896063',
  'Habilidade - N/A': '#57595b',
  'Habilidade - {AG}': '#ae7f5e',
  'Habilidade - {AD}': '#009642',
  'Habilidade - {AE}': '#d6ac07',
  'Habilidade - {EL}': '#7f764f',
  'Habilidade - {GE}': '#aab924',
  'Habilidade - {LA}': '#0062a3',
  'Habilidade - {RE}': '#a10b10',
  'Habilidade - {SF}': '#904929',
  'Habilidade - {TC}': '#9b5992',
  'Habilidade - {TE}': '#5a3b85',
  'Habilidade - {VO}': '#6cb4d2',
}
