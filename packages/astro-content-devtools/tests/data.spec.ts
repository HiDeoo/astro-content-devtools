import { expect, test } from '@playwright/test'

import {
  expectPanelToBeVisible,
  getCollectionSelectorLocator,
  getEntrySelectorLocator,
  getPreviewTypeSelectorLocators,
  openDevtools,
} from './utils.js'

test('display data', async ({ page }) => {
  await page.goto('/')
  await openDevtools(page)
  await getCollectionSelectorLocator(page, 'docs').click()
  await getPreviewTypeSelectorLocators(page).data.click()
  await getEntrySelectorLocator(page, 'doc-1').click()

  await expectPanelToBeVisible(page, 'data')

  expect(await page.getByText(/^ID/).textContent()).toMatch(/doc-1\.md$/)
  expect(await page.getByText(/^Slug/).textContent()).toMatch(/doc-1$/)

  const frontmatter = ['title: "Doc 1 Title"', 'description: "Description of Doc 1"']

  const frontmatterEntries = page.getByTestId('panel-data').getByRole('listitem')
  const frontmatterEntriesCount = await frontmatterEntries.count()

  for (let i = 0; i < frontmatterEntriesCount; i++) {
    expect(await frontmatterEntries.nth(i).textContent()).toBe(frontmatter[i])
  }

  await expect(page.getByText(/^Doc 1$/)).toBeVisible()
})
