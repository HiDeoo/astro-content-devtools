import { expect, test } from '@playwright/test'

import { expectPanelToBeVisible, getCollectionSelectorLocator, openDevtools } from './utils.js'

test('display a schema', async ({ page }) => {
  await page.goto('/')
  await openDevtools(page)
  await getCollectionSelectorLocator(page, 'docs').click()

  await expectPanelToBeVisible(page, 'schema')

  const schema = ['title', 'string', 'required', 'description', 'string', 'required']

  const schemaEntries = page.getByTestId('panel-schema').locator('div > div > div')
  const schemaEntriesCount = await schemaEntries.count()

  for (let i = 0; i < schemaEntriesCount; i++) {
    expect(await schemaEntries.nth(i).textContent()).toBe(schema[i])
  }
})
