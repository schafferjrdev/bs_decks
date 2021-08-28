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
