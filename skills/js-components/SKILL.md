---
name: js-components
description: Use when working with the js-components library — wrapping DOM elements in Component, handling events, building collections, or constructing URLs. Triggers include creating or extending Component/ComponentCollection/Form, wiring DOM or custom events via EventEmitter, and building URLs with urlbuilder.
---

# js-components

## Overview

A lightweight, zero-dependency vanilla JS library. Source lives in `src/` — copy it to your project's public folder. No build step required.

```
src/
  components/component.js           # Core DOM wrapper (extends EventEmitter)
  components/componentCollection.js # Operates on multiple Components
  components/form.js                # Component + form submit()
  utils/eventEmitter.js             # Pub/sub event system
  urlbuilder/createUrlBuilder.js    # URL builder factory
  urlbuilder/target.js              # Standard path builder
  urlbuilder/dynamicTarget.js       # Swappable root segment
  urlbuilder/query.js               # Query parameter value object
```

## Component

### Create

```js
import Component from '/js/components/component.js';

new Component(htmlElement)                              // from existing HTMLElement
Component.fromId('my-id')                              // by id (throws if not found)
Component.fromClass('my-class')                        // by class — must be exactly one match
Component.fromName('my-name')                          // by name attribute — must be exactly one match
Component.fromParams('div', { class: 'box' }, 'text') // create new element from params
```

### API

| Method | Description |
|---|---|
| `appendByClass(className)` | Appends self as child of element with class |
| `appendById(id)` | Appends self as child of element with id |
| `enable()` / `disable()` | Sets `node.disabled` |
| `show(type?)` / `hide()` | Toggles display (default `'block'`) |
| `onShow(cb)` / `onHide(cb)` | Custom show/hide callbacks — receive `HTMLElement` as argument |
| `text(str?)` | Sets `innerText`; call without argument to clear |
| `getValue()` / `setValue(val)` | Reads/writes `node.value` |
| `getName()` / `setName(val)` | Reads/writes `node.name` |
| `dataset(name)` | Reads `node.dataset[name]` — throws if attribute missing |
| `onEvent(name, cb)` | Subscribes to a DOM event on `node`; multiple callbacks allowed |

### Gotchas

**`dataset` uses camelCase** — HTML `data-user-id` → `dataset('userId')`:
```js
// <div data-user-id="42"></div>
component.dataset('userId'); // '42'
```

**`onEvent` with `function()` — `this` is the Component instance:**
```js
button.onEvent('click', function() {
    this.disable(); // `this` = button component
});
```

**`onEvent` with arrow function — `this` is NOT the component; use the variable instead:**
```js
button.onEvent('click', () => {
    button.disable();
});
```

**Multiple callbacks on the same event are supported:**
```js
btn.onEvent('click', () => doA());
btn.onEvent('click', () => doB()); // both fire on click
```

### Extending Component

Subclass to add behaviour. Access the DOM node via `this.node`. Static factory methods work on subclasses.

```js
class Counter extends Component {
    increment() {
        const next = Number(this.node.innerText) + 1;
        this.node.innerText = next;
        this.emit('incremented', next);
    }
}

const counter = Counter.fromId('counter'); // returns Counter instance
counter.on('incremented', (value) => console.log('count:', value));
```

## EventEmitter

`Component` extends `EventEmitter`. Use `on`/`emit` for cross-component signals; use `onEvent` for native DOM events.

| Method | Description |
|---|---|
| `on(name, fn)` | Subscribe — same `fn` reference added only once (Set) |
| `once(name, fn)` | Subscribe — auto-removes after first call |
| `emit(name, ...args)` | Fire event |
| `remove(name, fn)` | Remove a specific callback |
| `clear(name?)` | Remove all callbacks for event; omit arg to clear all events |
| `count(name)` | Number of registered callbacks |
| `names()` | Array of registered event names |
| `listeners(name)` | Returns a Set copy of callbacks |

**`on` deduplicates by reference** — registering the same function twice has no effect:
```js
const fn = () => doSomething();
ee.on('event', fn);
ee.on('event', fn); // still only one callback
ee.emit('event');   // doSomething() called once
```

## ComponentCollection

`ComponentCollection.fromClass` collects **all** elements with that class (unlike `Component.fromClass` which requires exactly one).

```js
import ComponentCollection from '/js/components/componentCollection.js';

new ComponentCollection([component1, component2])  // array of Component instances
ComponentCollection.fromClass('item')              // all elements with class
ComponentCollection.fromTag('button')              // all elements with tag
```

Mirrors single-component API: `enable`, `disable`, `show`, `hide`, `text`, `onEvent`, `onShow`, `onHide`.

**In `onEvent`, `this` inside a `function()` callback refers to the individual `Component`**, not the collection:
```js
collection.onEvent('click', function() {
    this.text('clicked'); // `this` = the clicked Component
});
```

**Extending — access items via `this.components`:**
```js
class MyCollection extends ComponentCollection {
    getValues() {
        return [...this.components].map(c => c.getValue());
    }
}
```

## Form

```js
import Form from '/js/components/form.js';

const form = Form.fromId('my-form');
form.submit(); // triggers node.submit()
```

## Cross-module communication with CustomEvents

When modules cannot import each other, use `document` as a message bus.

```js
// Publisher — dispatch inside a subclass method
class Submodule extends Component {
    dispatch(payload) {
        document.dispatchEvent(new CustomEvent('myEvent', { detail: payload }));
    }
}
const button = Submodule.fromId('btn');
let count = 0;
button.onEvent('click', () => button.dispatch(++count));

// Subscriber — separate <script type="module">
document.addEventListener('myEvent', (e) => {
    counter.text(e.detail);
});
```

## URLBuilder

```js
import urlbuilder from '/js/urlbuilder/createUrlBuilder.js';
import target from '/js/urlbuilder/target.js';
import Query from '/js/urlbuilder/query.js';

const ub = urlbuilder(target, 'https', 'example.com'); // absolute
const ub2 = urlbuilder(target);                        // relative

ub(['articles']);                                      // https://example.com/articles
ub(['articles'], [new Query('page', '2')]);            // https://example.com/articles?page=2
ub(['articles'], [], 'section-1');                     // https://example.com/articles#section-1
ub(['articles'], [new Query('order', 'desc'), new Query('page', '2')], 'top');
// https://example.com/articles?order=desc&page=2#top
```

Query parameters are URL-encoded automatically. No need to call `encodeURIComponent`.

**`dynamicTarget`** — swaps the first path segment at call time:
```js
import dynamicTarget from '/js/urlbuilder/dynamicTarget.js';
const ub = urlbuilder(dynamicTarget('api'));
ub(['root', 'users']); // /api/users
ub(['root', 'posts']); // /api/posts
```
