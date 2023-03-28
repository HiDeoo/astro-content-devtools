import { expect, type Page, test } from '@playwright/test'

import { expectPanelToBeVisible, getCollectionSelectorLocator, openDevtools } from './utils.js'

test('display collections', async ({ page }) => {
  await page.goto('/')
  await openDevtools(page)

  await expectPanelToBeVisible(page, 'collections')

  const collections = ['debug', 'docs', 'posts', 'types']

  const selectors = page.getByRole('button', { name: /^Open details for the \w+ collection$/ })
  const selectorsCount = await selectors.count()

  expect(selectorsCount).toBe(collections.length)

  for (let i = 0; i < selectorsCount; i++) {
    expect(await selectors.nth(i).textContent()).toBe(collections[i])
  }
})

test('select a collection', async ({ page }) => {
  await page.goto('/')
  await openDevtools(page)

  let selector = getCollectionSelectorLocator(page, 'docs')

  expect(await selector.getAttribute('aria-pressed')).toBe('false')

  await selector.click()

  await expectCollectionToBeSelected(page, 'docs')

  selector = getCollectionSelectorLocator(page, 'posts')

  expect(await selector.getAttribute('aria-pressed')).toBe('false')

  await selector.click()

  await expectCollectionToBeSelected(page, 'posts')
})

async function expectCollectionToBeSelected(page: Page, collectionName: string) {
  expect(await getCollectionSelectorLocator(page, collectionName).getAttribute('aria-pressed')).toBe('true')

  return page.waitForFunction((expectedCollectionName) => {
    return JSON.parse(localStorage.getItem('astroContentDevtoolsActiveCollectionName') ?? '') === expectedCollectionName
  }, collectionName)
}
