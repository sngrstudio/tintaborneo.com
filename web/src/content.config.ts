import { defineCollection } from 'astro:content'
import siteLoader from './loaders/site'
import pagesLoader from './loaders/pages'
import categoriesLoader from './loaders/categories'
import menuLoader from './loaders/menu'

const site = defineCollection({
  loader: siteLoader()
})

const pages = defineCollection({
  loader: pagesLoader()
})

const categories = defineCollection({
  loader: categoriesLoader()
})

const menus = defineCollection({
  loader: menuLoader()
})

export const collections = { site, pages, categories, menus }
