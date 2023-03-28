import assert from 'node:assert'

import { expect, type Page, test } from '@playwright/test'

import { closeDevtools, getToggleLocators, openDevtools } from './utils.js'

test('toggle the devtools', async ({ page }) => {
  await page.goto('/')

  await expectDevtoolsToBeOpened(page, false)

  await openDevtools(page)

  await expectDevtoolsToBeOpened(page, true)

  await closeDevtools(page)

  await expectDevtoolsToBeOpened(page, false)
})

test('resize the devtools', async ({ page }) => {
  await page.goto('/')
  await openDevtools(page)

  await expectDevtoolsToBeOpened(page, true)
  expectDevtoolsHeightToBe(page, 500)

  await resizeDevtools(page, 'up', 100)

  await expectDevtoolsToBeOpened(page, true)
  await expectDevtoolsHeightToBe(page, 600)

  await resizeDevtools(page, 'down', 200)

  await expectDevtoolsToBeOpened(page, true)
  await expectDevtoolsHeightToBe(page, 400)

  await resizeDevtools(page, 'down', 350)

  await expectDevtoolsToBeOpened(page, false)
})

function getResizeHandleLocator(page: Page) {
  return page.getByTestId('resize-handle')
}

async function resizeDevtools(page: Page, direction: 'up' | 'down', offset: number) {
  const resizeHandle = getResizeHandleLocator(page)
  const resizeHandleBoundingBox = await resizeHandle.boundingBox()
  assert(resizeHandleBoundingBox)

  await resizeHandle.hover()
  await page.mouse.down()
  await page.mouse.move(
    resizeHandleBoundingBox.x,
    resizeHandleBoundingBox.y + offset * (direction === 'up' ? -1 : 1) + 2
  )
  await page.mouse.up()
}

async function expectDevtoolsToBeOpened(page: Page, opened: boolean) {
  const { close, open } = getToggleLocators(page)

  const visibleLocator = opened ? close : open
  const hiddenLocator = opened ? open : close

  await expect(hiddenLocator).not.toBeVisible()
  await expect(visibleLocator).toBeVisible()

  return page.waitForFunction((expectedOpened) => {
    return JSON.parse(localStorage.getItem('astroContentDevtoolsIsOverlayOpened') ?? '') === expectedOpened
  }, opened)
}

async function expectDevtoolsHeightToBe(page: Page, height: number) {
  const devtoolsBoundingBox = await page.getByLabel('Astro Content Devtools', { exact: true }).boundingBox()
  assert(devtoolsBoundingBox)

  expect(devtoolsBoundingBox.height).toBe(height)

  await page.waitForFunction((expectedHeight) => {
    return JSON.parse(localStorage.getItem('astroContentDevtoolsOverlayHeight') ?? '') === expectedHeight
  }, height)
}
