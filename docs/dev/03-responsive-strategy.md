# Responsive strategy

City Voice does not have one layout that reflows across screen sizes. Below 1024px and at 1024px and above are two distinct presentations of the same product, switched at the `da-desktop` breakpoint (`_breakpoints.scss`). Components, copy, and sometimes structure differ between the two; only the underlying message stays the same.

## Mobile (< 1024px)

Full-immersive, app-like. Full-screen sections, content revealed progressively, minimal chrome. Navigation is `NavMobile`, a draggable radial menu triggered by a floating button rather than a persistent header.

## Desktop (≥ 1024px)

Editorial, closer to modern popular press. A persistent header (`HeaderApp`) replaces `NavMobile`, which is hidden entirely above the breakpoint. Layouts widen into columns, and copy is not simply the mobile text at a larger size: several components carry separate desktop paragraphs written for a slower, more discursive reading style. See `home.html`/`home.scss` and `stories-list.html`/`stories-list.scss` for examples for two versions of the same section.

## What this means for new components

A new feature is not done when it works on one breakpoint. Expect to write two versions of user-facing copy when the content is more than a label, and to check whether a component needs a distinct desktop treatment rather than a scaled-down mobile one.

## Open question: NavMobile

The radial menu is a prototype. It works today and is wired to the real routes and auth state, but the pattern itself has not been validated as the right long-term navigation for the app-like mobile experience. Revisit before treating its structure as fixed.

## Nav drag bounds

The mobile nav can be dragged. Bounds are computed once per drag in
`computeOffsetBounds()`, as offsets in the same coordinate system as
`dragX`/`dragY`, then clamped with two `Math.min`/`Math.max` calls. Keeping
bounds and position in one coordinate system avoids converting between viewport
coordinates and the applied transform on every move.

`MIN_VISIBLE_RATIO` is measured against `.social-clock`, the 14rem radial
container, not the 3.5rem trigger that is actually visible at rest. Most of that
container is transparent, so the ratio does not map to visible pixels: 0.55 was
picked empirically to keep the trigger reachable. Measuring the trigger instead
would require decoupling the measured element from the transformed one. That
work is deferred: the drag interaction itself is not confirmed, and reworking
the geometry for a feature that may be removed is not worth the cost.
