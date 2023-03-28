import { expect, type Page, test } from '@playwright/test'

import {
  expectPanelToBeVisible,
  getCollectionSelectorLocator,
  getEntrySelectorLocator,
  getPreviewTypeSelectorLocators,
  openDevtools,
} from './utils.js'

test('display entries', async ({ page }) => {
  await page.goto('/')
  await openDevtools(page)
  await getCollectionSelectorLocator(page, 'docs').click()
  await getPreviewTypeSelectorLocators(page).data.click()

  await expectPanelToBeVisible(page, 'entries')

  const entries = ['doc-1.md', 'doc-2.md', 'doc-3.md']

  const selectors = page.getByRole('button', { name: /^Open [\w-]+\.md$/ })
  const selectorsCount = await selectors.count()

  expect(selectorsCount).toBe(entries.length)

  for (let i = 0; i < selectorsCount; i++) {
    expect(await selectors.nth(i).textContent()).toBe(entries[i])
  }
})

test('select an entry', async ({ page }) => {
  await page.goto('/')
  await openDevtools(page)
  await getCollectionSelectorLocator(page, 'docs').click()
  await getPreviewTypeSelectorLocators(page).data.click()

  let selector = getEntrySelectorLocator(page, 'doc-1')

  expect(await selector.getAttribute('aria-pressed')).toBe('false')

  await selector.click()

  await expectEntryToBeSelected(page, 'doc-1')

  selector = getEntrySelectorLocator(page, 'doc-3')

  expect(await selector.getAttribute('aria-pressed')).toBe('false')

  await selector.click()

  await expectEntryToBeSelected(page, 'doc-3')
})

async function expectEntryToBeSelected(page: Page, entrySlug: string) {
  expect(await getEntrySelectorLocator(page, entrySlug).getAttribute('aria-pressed')).toBe('true')

  return page.waitForFunction((expectedEntrySlug) => {
    return JSON.parse(localStorage.getItem('astroContentDevtoolsActiveEntrySlug') ?? '') === expectedEntrySlug
  }, entrySlug)
}
