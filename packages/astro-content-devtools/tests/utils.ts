import { expect, type Page } from '@playwright/test'

export function openDevtools(page: Page) {
  return getToggleLocators(page).open.click()
}

export function closeDevtools(page: Page) {
  return getToggleLocators(page).close.click()
}

export function expectPanelToBeVisible(page: Page, panel: string) {
  return expect(page.getByTestId(`panel-${panel}`)).toBeVisible()
}

export function getToggleLocators(page: Page) {
  return {
    close: page.getByLabel('Close Astro Content Devtools'),
    open: page.getByLabel('Open Astro Content Devtools'),
  }
}

export function getCollectionSelectorLocator(page: Page, collectionName: string) {
  return page.getByRole('button', { name: `Open details for the ${collectionName} collection` })
}

export function getPreviewTypeSelectorLocators(page: Page) {
  return {
    data: page.getByRole('button', { name: 'Open data' }),
    schema: page.getByRole('button', { name: 'Open schema' }),
  }
}

export function getEntrySelectorLocator(page: Page, entrySlug: string) {
  return page.getByRole('button', { name: `Open ${entrySlug}.md` })
}
