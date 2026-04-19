# ov-tabs

Accessible tab list. Items are supplied as a typed array. Keyboard navigation follows the ARIA Authoring Practices Guide: ← / → move between tabs, Home / End jump to first / last, Tab exits the tab list.

## Tag

```html
<ov-tabs .tabs=${[...]}></ov-tabs>
```

## Properties

| Property     | Attribute    | Type                        | Default       | Description                                     |
|--------------|--------------|-----------------------------|---------------|-------------------------------------------------|
| `tabs`       | —            | `TabItem[]`                 | `[]`          | Full list of tab descriptors                    |
| `active`     | `active`     | `string`                    | `''`          | Key of the active tab; defaults to first item   |
| `appearance` | `appearance` | `'underline' \| 'pills'`    | `'underline'` | Visual style of the tab bar                     |
| `fill`       | `fill`       | `boolean`                   | `false`       | Stretch tabs to fill full width                 |

### TabItem type

```ts
interface TabItem {
  key: string;       // unique identifier
  label: string;     // display text
  count?: number;    // optional count badge
  disabled?: boolean;
}
```

## Events

| Event    | Detail                   | Description                                         |
|----------|--------------------------|-----------------------------------------------------|
| `change` | `{ key: string }`        | Fires whenever the active tab changes               |

## Parts

| Part         | Description                          |
|--------------|--------------------------------------|
| `tablist`    | The wrapping `role="tablist"` div    |
| `tab`        | Each tab button                      |
| `tab-active` | Added to the currently active tab    |

## Usage examples

```js
// Define tabs in your component or script
const tabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'activity', label: 'Activity', count: 12 },
  { key: 'settings', label: 'Settings' },
  { key: 'archived', label: 'Archived', disabled: true },
];
```

```html
<!-- Underline appearance (default) -->
<ov-tabs .tabs=${tabs} active="overview"></ov-tabs>

<!-- Pills appearance -->
<ov-tabs .tabs=${tabs} appearance="pills" active="activity"></ov-tabs>

<!-- Full-width tabs -->
<ov-tabs .tabs=${tabs} fill></ov-tabs>

<!-- Listening to changes -->
<ov-tabs
  .tabs=${tabs}
  @change=${(e) => console.log('active tab:', e.detail.key)}
></ov-tabs>
```

## Rules

- `tabs` must be set as a property (`.tabs=${[...]}`), not an attribute — arrays cannot be serialized to HTML attributes.
- `active` defaults to the first non-disabled tab on first render.
- `count` renders a small badge pill next to the tab label; use for unread counts or results.
- The component manages focus for keyboard users — do not override `tabindex` on tab buttons.
