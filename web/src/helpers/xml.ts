export const minifyXML = (xml: string) =>
  xml
    .replace(/&/g, '&amp;')
    .replace(/>\s+</g, '><')
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()
