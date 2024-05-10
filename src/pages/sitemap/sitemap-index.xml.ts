import type { APIRoute } from 'astro'
import type { Category } from '~/data/graphql'
import { fetchCategories } from '~/data/taxonomies'

export const GET: APIRoute = async ({ site }) => {
  const {
    data: { categories: categoriesData },
  } = await fetchCategories()
  const categories = categoriesData?.nodes.filter((c: Category) => !c.parentId)

  const xml = `
    <?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="style.xsl"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${categories
        ?.map(
          (entry) => `
        <sitemap>
          <loc>${site?.origin}/sitemap/${entry.slug}.xml</loc>
        </sitemap>
      `
        )
        .join('')}
    </sitemapindex>  
  `.replace(/\s+/g, '')

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'X-Robots-Tag': 'noindex, follow',
    },
  })
}
