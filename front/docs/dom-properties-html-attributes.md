# DOM properties vs. HTML attributes: what doesn't map 1:1

An **attribute** is text written in the markup (or read via
`getAttribute()`/`setAttribute()`) — always a string. A **property** is a
field on the live DOM object (`element.foo`) — can be any type (array,
object, boolean, function). For most standard HTML, the two are kept in
sync automatically ("reflection"): setting the attribute updates the
property and vice versa. This doc is about the cases where that mapping
breaks down — specifically the direction relevant to Angular's
`[x]` vs `[attr.x]` binding choice: **attributes with no corresponding
property**, plus a few adjacent gotchas worth knowing so you don't
over-generalize the rule.

## Attributes with no corresponding property

### Custom / non-standard / made-up attributes

The general rule: a property equivalent only exists for an attribute if
some spec defines one. An attribute you invented yourself — `<div
foo="bar">` — has no `div.foo`; it only exists via `getAttribute('foo')`.
This is the "real," unconditional case of a missing property.

### `data-*` attributes (indirect access, not a same-named property)

`data-user-id="42"` has no `element.dataUserId` property directly, but it
is accessible through the `.dataset` object: `element.dataset.userId`.
So it's not truly "no property" — just no *same-named* property; the
mapping goes through an intermediary object instead.

### ARIA attributes (`aria-*`, `role`) — historically none, now inconsistent

For a long time, `aria-*` attributes and `role` had **no** JS property at
all — `getAttribute`/`setAttribute` was the only way to touch them. This
is why so much existing code (including this codebase) sets them via
Angular's `[attr.aria-*]` binding rather than `[aria-*]`.

That's changing: the `ARIAMixin` interface (part of the Accessible Rich
Internet Applications spec) has added real IDL properties —
`element.role`, `element.ariaLabel`, `element.ariaCurrent`,
`element.ariaExpanded`, etc. — and modern engines have been rolling out
support. But since support isn't uniformly old enough to rely on across
every browser you might need to support, and `[attr.aria-*]` still works
everywhere unconditionally, **treat ARIA as attribute-only in practice**
unless you've specifically checked your target browser matrix. This is
exactly why `user-item-carousel.html` uses
`[attr.aria-current]="i === currentIndex()"` and
`[attr.aria-label]="'Go to photo ' + (i + 1)"` rather than the property
form.

### SVG attributes that map to `SVGAnimatedX` wrappers, not plain values

Some SVG attributes (e.g. `viewBox`, `x1`/`y1` on `<line>`) do have a
corresponding property, but it isn't a plain value — it's an
`SVGAnimatedLength`/`SVGAnimatedRect`/etc. object with `.baseVal`/
`.animVal` sub-properties. Functionally this behaves like "no simple
property to bind to," which is why SVG attribute bindings in Angular
templates commonly go through `[attr.x]` too.

## Adjacent gotcha #1: same info, different name

Not "missing" — just don't assume the property name matches the attribute
name. These attributes are reflected, just under a different JS-safe
identifier (`class` and `for` are reserved-ish words, others got
camelCased to match JS convention):

| Attribute | Property |
|---|---|
| `class` | `className` (also `classList`) |
| `for` | `htmlFor` |
| `colspan` | `colSpan` |
| `rowspan` | `rowSpan` |
| `readonly` | `readOnly` |
| `maxlength` | `maxLength` |
| `tabindex` | `tabIndex` |
| `contenteditable` | `contentEditable` |
| `crossorigin` | `crossOrigin` |

## Adjacent gotcha #2: property exists but doesn't mirror the attribute

- **`value` on `<input>`/`<textarea>`**: the `value` *property* tracks the
  live, current, user-editable value. The `value` *attribute* only sets
  the **initial** value — once the user types, the attribute stays frozen
  at whatever it started as. If you want the attribute's value later,
  read `element.defaultValue`, not `element.value`.
- **`checked` on checkboxes/radios**: same split — `checked` property is
  live state, `defaultChecked` property mirrors the attribute.
- **`open` on `<details>`/`<dialog>`**: the browser itself
  adds/removes this attribute in response to user interaction (expanding
  a `<details>`, calling `.showModal()`), so it behaves more like live
  state than static configuration — a known wart in the platform.
- **`nonce`**: the reverse direction of the usual asymmetry, for security
  reasons. `element.nonce` (property) holds the real value, but
  `getAttribute('nonce')` deliberately returns an empty string once the
  node is inserted into the document — so a script can't read another
  script's CSP nonce by inspecting the DOM/attribute.

## Reverse case: properties with no attribute at all

Some properties are pure live DOM state and were never expressible as
static markup in the first place: `offsetWidth`, `offsetHeight`,
`parentNode`, `children`, `textContent`, and `indeterminate` (the
third checkbox state — there's no `indeterminate` HTML attribute, only
the JS property). Nothing to bind via `[attr.x]` here; these only ever
make sense as `[x]`/property reads.

## Practical takeaway for this codebase

- Default to plain property binding `[x]="expr"` — it's the common case
  and lets you pass real typed values (arrays, booleans, objects) to
  component inputs and DOM properties alike.
- Reach for `[attr.x]="expr"` specifically for: ARIA attributes/`role`,
  SVG attributes, and any genuinely custom/non-standard attribute that
  has no JS property to target.
- Don't assume "attribute name ≠ property name" means "no property" —
  check the adjacent-gotcha table above first (`class`/`for`/`colspan`
  etc. all have properties, just renamed).

## Sources

- [HTML attributes vs DOM properties — Jake Archibald](https://jakearchibald.com/2024/attributes-vs-properties/)
- [Attribute reflection — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Reflected_attributes)
- [HTML attribute reference — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes)
- [`Element: ariaLabel` property — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/ariaLabel)
- [`ARIAMixin` interface mixin — WebIDLpedia](https://dontcallmedom.github.io/webidlpedia/names/ARIAMixin.html)
