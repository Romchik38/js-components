# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**Lint:**
```bash
npm run lint           # lint with warnings
npm run lint:strict    # lint with zero warnings allowed
```

**Run tests:**
1. `docker compose up --build`
2. Open [localhost:8080](http://localhost:8080)
3. Select a test suite and open the browser console to see results.

There is no automated test runner — tests run in the browser only.

## Architecture

A lightweight, no-dependency, vanilla JS library. All source is in `src/` and is meant to be copied directly into a project's public folder (no bundler or build step).

### Module layout

```
src/
  utils/eventEmitter.js          # Base event system (Map of Set)
  components/component.js        # Core DOM wrapper, extends EventEmitter
  components/componentCollection.js  # Manages multiple Components
  components/form.js             # Component subclass with form submit()
  urlbuilder/
    createUrlBuilder.js          # Factory: returns a URL-building function
    target.js                    # Standard path builder
    dynamicTarget.js             # Path builder that swaps a root segment
    query.js                     # Query parameter value object
```

### Key design decisions

- **`Component` wraps a single `HTMLElement`** (`this.node`). You should never touch the DOM node directly from outside a component; instead subclass `Component` and add methods there.
- **`Component` extends `EventEmitter`** — components can emit custom events to each other, decoupling inter-component communication from DOM events.
- **DOM events vs. custom events**: `onEvent(name, cb)` listens to native DOM events on `this.node`; `on(name, cb)` / `emit(name, ...args)` are the EventEmitter API for cross-component signals.
- **Static factory methods** (`fromId`, `fromClass`, `fromName`, `fromParams`) are the preferred way to create components from existing DOM elements.
- **`ComponentCollection`** mirrors the single-component API for operating on multiple elements at once (e.g. `disable()`, `hide()`).

### Testing pattern

Tests live in `test/` and mirror the source tree. Each test file is a self-contained IIFE that imports from `/js/...` (served by nginx from `src/`). Pass/fail is reported via `console.log` / thrown `Error`. The `test/index.html` page links all test suites.

### ESLint

`eslint:recommended` + `plugin:jsdoc/recommended`. JSDoc is required for all `FunctionDeclaration` and `MethodDefinition` entries. The `test/` directory is excluded from linting.
