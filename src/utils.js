import iconv from 'iconv-lite'

export function convert(text) {
  function pad(s) {
    while (s.length < 3) s = '0' + s
    return s
  }
  const result = text.split('\n\n\n').map((e, i) => ({
    uuid: 'bsic_' + pad('' + (i + 1)),
    image: `http://www.magicjebb.com.br/bs_images/009_bsic/BSIC_${pad(
      '' + (i + 1),
    )}.png`,
    data: e,
    collection: 'bsic',
  }))
  return JSON.stringify(result)
}

export const CARD_ED = [
  '001_bsum',
  '002_bset',
  '004_bspo',
  '006_bsmi',
  '009_bsic',
]

export const CARD_TYPES = {
  Suporte: '#488370',
  Cenário: '#536b82',
  Personagem: '#896063',
  'Personagem - EV': '#896063',
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

export const TYPES_BG = {
  Suporte: '15% 30%',
  Cenário: 'left center',
  Personagem: '15% 30%',
  Habilidade: '15% 30%',
}

export const uniqueCards = (arr) =>
  JSON.stringify(
    arr.filter((item, index, array) => {
      const lastIndex = array.reduce((acc, curr, i) => {
        if (curr.data === item.data) {
          return i
        }
        return acc
      }, -1)

      return index === lastIndex
    }),
  )

export function base64Encode(str) {
  const buffer = iconv.encode(str, 'utf8')
  return buffer.toString('base64')
}

export function base64Decode(encodedString) {
  // Decodifica a string base64 em um buffer
  const decodedBuffer = Buffer.from(encodedString, 'base64')

  // Converte o buffer em uma string JSON
  const decodedString = iconv.decode(decodedBuffer, 'utf8')

  // Analisa a string JSON de volta para um objeto
  return JSON.parse(decodedString)
}

// https://images.weserv.nl/?url=
