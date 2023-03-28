import { expect, type Page, test } from '@playwright/test'

import { type PreviewType } from '../src/libs/previewType.js'

import {
  expectPanelToBeVisible,
  getCollectionSelectorLocator,
  getPreviewTypeSelectorLocators,
  openDevtools,
} from './utils.js'

test('display preview types', async ({ page }) => {
  await page.goto('/')
  await openDevtools(page)
  await getCollectionSelectorLocator(page, 'docs').click()

  await expectPanelToBeVisible(page, 'previewType')

  const { data, schema } = getPreviewTypeSelectorLocators(page)

  await expect(schema).toBeVisible()
  expect(await schema.getAttribute('aria-pressed')).toBe('true')

  await expect(data).toBeVisible()
  expect(await data.getAttribute('aria-pressed')).toBe('false')
})

test('select a preview type', async ({ page }) => {
  await page.goto('/')
  await openDevtools(page)
  await getCollectionSelectorLocator(page, 'docs').click()

  await expectPreviewTypeToBeSelected(page, 'schema')

  const { data } = getPreviewTypeSelectorLocators(page)

  await data.click()

  await expectPreviewTypeToBeSelected(page, 'data')
})

async function expectPreviewTypeToBeSelected(page: Page, previewType: PreviewType) {
  expect(await getPreviewTypeSelectorLocators(page)[previewType].getAttribute('aria-pressed')).toBe('true')

  return page.waitForFunction((expectedPreviewType) => {
    return JSON.parse(localStorage.getItem('astroContentDevtoolsActivePreviewType') ?? '') === expectedPreviewType
  }, previewType)
}
