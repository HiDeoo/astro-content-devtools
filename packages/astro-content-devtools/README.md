<div align="center">
  <h1>astro-content-devtools 🔬</h1>
  <p>Browse Astro Content Collections, schemas and entry files directly in your browser.</p>
  <p>
    <a href="https://user-images.githubusercontent.com/494699/228251573-956d8dda-dc9e-483f-8437-52f274838fe1.png" title="Entry data preview in astro-content-devtools">
      <img alt="Entry data preview in astro-content-devtools" src="https://user-images.githubusercontent.com/494699/228251573-956d8dda-dc9e-483f-8437-52f274838fe1.png" width="520" />
    </a>
    <a href="https://user-images.githubusercontent.com/494699/228251736-9ee603b2-2b37-4304-8e60-41019e7121bb.png" title="Schema preview in astro-content-devtools">
      <img alt="Schema preview in astro-content-devtools" src="https://user-images.githubusercontent.com/494699/228251736-9ee603b2-2b37-4304-8e60-41019e7121bb.png" width="520" />
    </a>
  </p>
</div>

<div align="center">
  <a href="https://github.com/HiDeoo/astro-content-devtools/actions/workflows/integration.yml">
    <img alt="Integration Status" src="https://github.com/HiDeoo/astro-content-devtools/actions/workflows/integration.yml/badge.svg" />
  </a>
  <a href="https://github.com/HiDeoo/astro-content-devtools/blob/main/LICENSE">
    <img alt="License" src="https://badgen.net/github/license/HiDeoo/astro-content-devtools" />
  </a>
  <br />
</div>

## Features

Browsing [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) entry files can sometimes be a bit cumbersome, especially when you have a lot of them spread across multiple collections. Same goes for [collection schemas](https://docs.astro.build/en/guides/content-collections/#defining-a-collection-schema) which are written in TypeScript using [Zod](https://github.com/colinhacks/zod) and can be hard to read for non-developers.

The Astro Content Devtools are available through an Astro component using [SolidJS](https://www.solidjs.com) that you can add to your project and that will provide you with a UI to browse your content collections, schemas and entry files directly in your browser.

- 🎈 Floating UI togglable with a button in the corner of the screen to show and hide the devtools.
- 💾 Current state stored in localStorage to remember the toggle state, selected collection and entry file across reloads and navigation.
- 📄 Preview the content of a collection entry, including the frontmatter and the body.
- 🗜️ Filterable list of collection entry files.
- 📏 Responsive and resizable UI.

## Installation

Install the Astro Content Devtools package and its peer dependencies using your favorite package manager, e.g. with [pnpm](https://pnpm.io):

```shell
pnpm add -D astro-content-devtools @astrojs/solid-js solid-js
```

Update your [Astro configuration](https://docs.astro.build/en/guides/configuring-astro/#supported-config-file-types) to apply the SolidJS integration:

```diff
  import { defineConfig } from 'astro/config';
+ import solid from '@astrojs/solid-js';

  export default defineConfig({
    // …
+   integrations: [solid()],
  });
```

Load the Astro Content Devtools component, e.g. in a layout to make it available on all pages, and pass it the collections object from your [content collections configuration](https://docs.astro.build/en/guides/content-collections/#configuring-collections):

```diff
---
+ import { AstroContentDevtools } from 'astro-content-devtools'
+ import { collections } from '../content/config'

  // …
  ---

  <!DOCTYPE html>
  <html lang="en">
    <head>
      <!-- … -->
    </head>
    <body>
      <slot />
+     <AstroContentDevtools collections={collections} />
    </body>
  </html>
```

## License

Licensed under the MIT License, Copyright © HiDeoo.

See [LICENSE](https://github.com/HiDeoo/astro-content-devtools/blob/main/LICENSE) for more information.
