import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const isDeployPreview = process.env.CONTEXT === 'deploy-preview'
const isStagingBranchDeploy =
  process.env.CONTEXT === 'branch-deploy' && process.env.BRANCH === 'staging'
const shouldProtectReviewDeploy = isDeployPreview || isStagingBranchDeploy

if (shouldProtectReviewDeploy) {
  const publishDirectory = join(process.cwd(), 'dist')
  const headersPath = join(publishDirectory, '_headers')

  await mkdir(publishDirectory, { recursive: true })
  await writeFile(headersPath, '/*\n  X-Robots-Tag: noindex, nofollow\n', 'utf8')
  console.log(`Wrote non-production review indexing protection to ${headersPath}`)
} else {
  console.log('Skipping review indexing protection for this deploy context.')
}
