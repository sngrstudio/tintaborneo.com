import 'dotenv/config'
import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: `${process.env.ADMIN_ENDPOINT}/wp/graphql`,
  generates: {
    '.graphql/types.ts': {
      plugins: ['typescript']
    }
  }
}

export default config
