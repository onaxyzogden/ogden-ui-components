# @ogden/ui-components

Shared React UI components for the OGDEN ecosystem (MILOS, Atlas, Moontrance).

## Install

This package is distributed via GitHub (no npm registry). Pin to a tagged
release for reproducible installs:

```bash
npm install github:onaxyzogden/ogden-ui-components#v0.1.0
```

Peer dependencies you'll need in your app:

```bash
npm install react react-dom react-router-dom lucide-react zustand
```

Compatible with **React 18 and 19**, **Zustand 4 and 5**, **react-router-dom 6 and 7**.

## Usage

Import the bundled CSS once at your app entry:

```js
import '@ogden/ui-components/style.css';
```

Then import components by name:

```jsx
import {
  LevelNavigator,
  MaqasidComparisonWheel,
  IslamicTerm,
} from '@ogden/ui-components';
```

## Components

### LevelNavigator

Carousel-style three-level switcher (DARURIYYAT / HAJIYYAT / TAHSINIYYAT by default).

```jsx
<LevelNavigator
  pillars={[
    { id: 'shahada', label: 'Shahada', route: '/faith/shahada',
      glossaryEntry: { term: 'Shahada', arabic: 'الشهادة', meaning: 'Testimony of faith' } },
    { id: 'salat',   label: 'Salat',   route: '/faith/salat' },
  ]}
  pillarTasks={{
    shahada: [{ id: 't1', title: 'Recite morning adhkar', columnId: 'col_done' }],
    salat:   [{ id: 't2', title: 'Pray Fajr', columnId: 'col_to_do' }],
  }}
  storageKey="faith_active_tab"
/>
```

Required: `pillars`. Pass `pillarTasks` to populate the segmented progress bar.

### MaqasidComparisonWheel

Interactive SVG wheel comparing N pillars under a shared "level color".

```jsx
import { Heart, BookOpen } from 'lucide-react';

<MaqasidComparisonWheel
  centerLabel="FAITH"
  levelColor="#4ab8a8"
  segments={[
    { id: 'shahada', label: 'Shahada', current: 80, route: '/faith/shahada', Icon: Heart },
    { id: 'salat',   label: 'Salat',   current: 45, route: '/faith/salat',   Icon: BookOpen },
  ]}
  pillarWisdom={{
    shahada: { arabic: '...', english: '...', citation: 'Qur\'an 2:255' },
  }}
  nextActions={{ shahada: { core: 'Renew witness daily' } }}
  mithaqDomain="faith"   /* optional: enables daily covenant ritual */
/>
```

The wheel and the LevelNavigator share a hover store (`useWheelHoverStore`) so
hovering a pillar in one lights up the matching pillar in the other.

### IslamicTerm

Hover tooltip wrapper for Arabic/Islamic terms.

```jsx
<IslamicTerm
  entry={{
    term: 'Iman',
    arabic: 'إيمان',
    transliteration: 'īmān',
    meaning: 'Faith — inner conviction expressed in word and deed.',
    source: 'Bukhari 8',
  }}
>
  iman
</IslamicTerm>
```

Pass `tooltipsEnabled={false}` to disable the popup; pass `showDiacritics={false}` to strip harakat.

## Design tokens

Components reference CSS custom properties (e.g. `--surface`, `--text`, `--accent`,
`--space-3`) and fall back to sensible defaults if your app hasn't defined them.
Override at `:root` to re-skin.

## License

MIT — see [LICENSE](./LICENSE).
