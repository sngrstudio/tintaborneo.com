import 'dotenv/config'
import { writeFile } from 'node:fs/promises'
import { fetchLogo } from '~/data/site'

const downloadLogo = async (slug: string, dir: string) => {
  try {
    // get the data
    const {
      data: { mediaItem: logo },
    } = await fetchLogo(slug)
    if (!logo) throw new Error('Failed to fetch: Object not found in CMS!')

    // get the response
    const response = await fetch(logo.sourceUrl!)
    if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`)

    // define file extension
    const contentType = response.headers.get('content-type')
    let extension = ''
    switch (contentType) {
      case 'image/jpeg':
        extension = '.jpg'
        break
      case 'image/png':
        extension = '.png'
        break
      case 'image/gif':
        extension = '.gif'
        break
      default:
        throw new Error('Unsupported content type')
    }

    // process image file
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // write the file
    await writeFile(`${process.cwd()}/${dir}/${slug}${extension}`, buffer).then(
      () =>
        console.log(
          `'${slug}${extension}' downloaded at '${process.cwd()}/${dir}'`
        )
    )
  } catch (error) {
    console.log(error)
  }
}

downloadLogo('logo', 'src/assets')
downloadLogo('logo-alt', 'src/assets')
