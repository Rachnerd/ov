# ov-stat

A metric display block showing a label, primary value, optional trend delta, and sublabel. Used in dashboards and summary cards.

## Tag

```html
<ov-stat label="Total revenue" value="$84,200"></ov-stat>
```

## Properties

| Property   | Attribute  | Type                               | Default     | Description                                       |
|------------|------------|------------------------------------|-------------|---------------------------------------------------|
| `label`    | `label`    | `string`                           | `''`        | Small uppercase label above the value             |
| `value`    | `value`    | `string`                           | `''`        | The primary metric value                          |
| `sublabel` | `sublabel` | `string`                           | `''`        | Secondary context text beside the delta           |
| `delta`    | `delta`    | `string`                           | `''`        | Change value (e.g., `"+12%"`, `"-3.4k"`)          |
| `trend`    | `trend`    | `'up' \| 'down' \| 'neutral'`      | `'neutral'` | Controls delta arrow direction and color          |

## Parts

| Part   | Description    |
|--------|----------------|
| `stat` | Root container |

## Usage examples

```html
<!-- Basic -->
<ov-stat label="Total users" value="12,340"></ov-stat>

<!-- With positive delta -->
<ov-stat
  label="Monthly revenue"
  value="$84,200"
  delta="+14.3%"
  trend="up"
  sublabel="vs last month"
></ov-stat>

<!-- With negative delta -->
<ov-stat
  label="Churn rate"
  value="2.1%"
  delta="-0.4%"
  trend="down"
  sublabel="vs last month"
></ov-stat>

<!-- Neutral (no arrow) -->
<ov-stat
  label="Active sessions"
  value="847"
  delta="0%"
  trend="neutral"
  sublabel="no change"
></ov-stat>

<!-- In a stats grid -->
<div class="stats-grid">
  <ov-stat label="Revenue" value="$84,200" delta="+14%" trend="up"></ov-stat>
  <ov-stat label="Users" value="12,340" delta="+320" trend="up"></ov-stat>
  <ov-stat label="Churn" value="2.1%" delta="-0.4%" trend="down"></ov-stat>
</div>
```

## Rules

- `trend="up"` colors the delta green; `trend="down"` colors it red; `trend="neutral"` renders muted.
- `delta` is a display string — format it before passing (e.g., `"+14.3%"` not `14.3`).
- `sublabel` appears beside the delta as secondary context; omit it when the timeframe is obvious from surrounding UI.
