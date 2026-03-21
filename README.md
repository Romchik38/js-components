# Components

`status` ![status](https://placehold.co/50x18/41ab2e/000000/png?text=ready) `version` ![version](https://placehold.co/25x18/538ad4/000000/png?text=1.0.0)

Contents:

- Description
- Example
- Install
- Component API
- Other utils
- Run tests
- Code quality

## Description

A lightweight vanilla JavaScript component library for simple DOM element management without external dependencies.

Features:

- Each `Component` internally holds an `HTMLElement`.
- Inside the module, you work only with `Component`.
- If you need to extend a component’s capabilities for working with an `HTMLElement`, create a new component that inherits from `Component` and interact with the DOM node inside that class.
- The `Component` extends `EventEmitter`, so you can use the events API.

## Example

Simple counter, similar to the [Vue example](https://vuejs.org/guide/introduction.html).

```html
<!-- HTML -->
<button id="api-button-count">
    Count is: <span id="api-count">0</span>
</button>
<script type="module">
    import { default as Component } from '/js/components/component.js';
    const button = Component.fromId('api-button-count');
    const counter = Component.fromId('api-count');
    const count = 0;
    button.onEvent('click', () => {
        counter.text(++count);
    });
</script>
```

[Full example here](./test/examples/counter.html). See below how to run tests.

## Install

Installation is not required. Copy the contents of `src` to your project's public folder.

## Component API

- [Component](./src/components/component.js) controls an HTMLElement.
- [Component Collection](./src/components/componentCollection.js) - a set of components.
- [Form](./src/components/form.js) - extended component with form submission capability.
- [EventEmitter](./src/utils/eventEmitter.js) - provides the component with the ability to subscribe to and trigger events.

### Component

Contents:

- Create a component
- Default usage

#### Create a component

You can create a component in the following ways:

- `construct` method:

    ```js
    const div = document.createElement('div');
    const d = new Component(div);
    ```

- from HTMLElement class `Component.fromClass(className)`
- from HTMLElement name `Component.fromName(name)`
- from HTMLElement id `Component.fromId(id)`
- from parameters:

    ```js
    const component = Component.fromParams(
        'div',
        {
            class: 'some-class'  // class is an attribute name
        },
        'some inner text'
    );  
    ```

#### Default usage

After creating a component, you can use the built-in functions:

| api name                      | description                                                                |
|-------------------------------|----------------------------------------------------------------------------|
| `appendByClass(className)`    | Finds an element by class name and appends itself as a child.              |
| `appendById(id)`              | Finds an element by id and appends itself as a child.                      |
| `enable()`                    | Makes the component accessible.                                            |
| `dataset(name)`               | Gets a data attribute.                                                     |
| `disable()`                   | Makes the component inaccessible.                                          |
| `onEvent(name, callback)`     | Subscribes to a DOM event.                                                 |
| `hide()`                      | Hides the component.                                                       |
| `show(type = 'block')`        | Displays the component.                                                    |
| `text(newText = '')`          | Sets inner text.                                                           |
| `onHide(callback)`            | Registers a callback to handle hiding.                                     |
| `onShow(callback)`            | Registers a callback to handle showing.                                    |
| `getValue()`                  | Accesses the value attribute.                                              |
| `setValue(val)`               | Updates the value attribute.                                               |
| `getName()`                   | Accesses the name attribute.                                               |
| `setName(val)`                | Updates the name attribute.                                                |

### Component Collection

Contents:

- Create a component collection
- Default usage

#### Create a component collection

You can create a component collection in the following ways:

- `construct` method:

    ```js
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const elements = [div1, div2];
    const dc = new ComponentCollection(elements);
    ```

- from HTMLElement class `ComponentCollection.fromClass(className)`
- from HTMLElement tag `ComponentCollection.fromTag(tagName)`

#### Default usage of the collection

After creating a component collection, you can use the built-in functions:

| api name                      | description                            |
|-------------------------------|----------------------------------------|
| `disable()`                   | Makes the components inaccessible.     |
| `enable()`                    | Makes the components accessible.       |
| `hide()`                      | Hides the components.                  |
| `onEvent(name, callback)`     | Subscribes to a DOM event.             |
| `onHide(callback)`            | Registers a callback to handle hiding. |
| `onShow(callback)`            | Registers a callback to handle showing.|
| `show(type = 'block')`        | Displays the components.               |
| `text(newText = '')`          | Adds inner text.                       |

### Form

A [Form](./src/components/form.js) is an extended component that provides the following additional capabilities:

- a `submit()` method to control the submission flow.

### EventEmitter

[EventEmitter](./src/utils/eventEmitter.js) is used to subscribe to and emit events. The `Component` extends `EventEmitter`, so each component can subscribe to another component’s events. You can also execute other module logic when events occur.

Example:

```js
// Creation of an extended component
class SuperButton extends Component {
    someFunction() {
        // internal logic
        this.emit('someEvent', ...args);
        // internal logic
    }
}

const button = Component.fromId('id1');
const superButton = SuperButton.fromId('id2');

superButton.on('someEvent', (...args) => {
    // 1. work with event's arguments
    // 2. work with another component
    button.disable();
    // 3. do another work
    console.log('message');
});
```

API:

| api                   | description                                                                                   |
|-----------------------|-----------------------------------------------------------------------------------------------|
| `clear(name)`         | Deletes the event by name, or deletes all events if no name is provided.                      |
| `count(name)`         | Returns the number of registered callbacks.                                                   |
| `emit(name, ...args)` | Emits an event with the provided arguments.                                                   |
| `listeners(name)`     | Returns the event's callbacks.                                                                |
| `names()`             | Returns the names of registered events.                                                       |
| `on(name, fn)`        | Subscribes a unique callback to the event.                                                    |
| `once(name, fn)`      | Subscribes a callback that is removed after the first execution.                              |
| `remove(name, fn)`    | Removes a callback from an event.                                                             |

## Other utils

Contents:

- [URL builder](./src/urlbuilder/urlbuilder.js) — helps build URLs from path parts, query parameters, and optional fragments.

### URL builder

Urlbuilder is an utilite to build URLs from path parts, query parameters and fragment.

1. Create urbuilder instance
2. Form an URL
3. Full Example
4. Additional

#### 1. Create urbuilder instance

First. The `urbuilder` need a `target` to form the path. You can choose from 2 constiants:

- `target` - build a standart path.
- `dynamicTarget(dynamicRoot)` - used to swap a special root segment. Based on `target`.

Second. You can pass optional parameters `scheme` and `authority` to form an absolute url.

Finaly. To create an urlbuilder instance run the function constructor `urlbuilder(target, 'https', 'example.com')`.

```js
import urlbuilder from '/js/urlbuilder/urlbuilder.js';
import target from '/js/urlbuilder/target.js';

// Absolute URL
const ub = urlbuilder(target, 'https', 'example.com');

// Relative URL
const ub2 = urlbuilder(target);
```

#### 2. Form an URL

Once you created an urlbuilder instance, you can start to form urls:

- Create simple URL
- Create URL with queries
- Create URL with fragment

##### Create simple URL

```js
const parts = ['articles'];
const url = ub(parts); // 'https://example.com/articles'
```

##### Create URL with queries

If you need query params, follow next steps:

```js
import Query from '/js/urlbuilder/query.js';

const parts = ['articles'];
const queries = [new Query('order', 'desc'), new Query('page', '2')];
const url = ub(parts, queries); // 'https://example.com/articles?order=desc&page=2'
```

##### Сreate URL with fragment

```js
const parts = ['articles'];
const url = ub(parts, [], 'table-1'); // 'https://example.com/articles#table-1'
```

#### 3. Full Example

```js
import urlbuilder from '/js/urlbuilder/urlbuilder.js';
import target from '/js/urlbuilder/target.js';
import Query from '/js/urlbuilder/query.js';

const ub = urlbuilder(target, 'https', 'example.com');
const query1 = new Query('order', 'desc');
const query2 = new Query('page', '2');
const url = ub(['articles'], [query1, query2], 'header1'); // 'https://example.com/articles?order=desc&page=2#header1'
```

#### 4. Additional

- Use `dynamicTarget` to swap a special root segment:

    ```js
    import dynamicTarget from '/js/urlbuilder/dynamicTarget.js';

    const dynamic = dynamicTarget('api');
    const ub = urlbuilder(dynamic);

    ub(['root', 'users']); // '/api/users'
    ```

- You don't need to encode query parameters, urlbuilder does it itself.

## Run tests

All modules are tested. You can find tests in [test](./test/) dir. To run the tests, follow these steps:

1. Run in the console `docker compose up --build`.
2. Visit [localhost:8080](http://localhost:8080).
3. Select the desired test suite.
4. Open browser console and check tests' status.

## Code quality

- 68 tests in the [test](./test/) directory.
- The code is checked by ESLint. See [.eslintrc.json](./.eslintrc.json) for more details.
