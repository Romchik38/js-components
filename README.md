# Components

![status](https://placehold.co/15x15/ff0000/000000/png?text=D) `status: in development`

Contents:

- Description
- Example
- Install
- Api
- Run tests

## Description

A lightweight vanilla JavaScript component library for simple DOM element management without external dependencies.

Features:

- Each `Component` internally holds an `HTMLElement`.
- Inside the module you work directly only with `Component`.
- If you need to extend a component’s capabilities for working with an `HTMLElement`, you create a new component that inherits from `Component` and interact with the DOM node inside the class.
- The `Component` extends `EventEmitter`, so you can use `events api`.

## Example

Simple counter like [vue example](https://vuejs.org/guide/introduction.html).

```html
<button id="api-button-count">
    Count is: <span id="api-count">0</span>
</button>
<script type="module">
    import { default as Component } from '/js/components/component.js';
    var button = Component.fromId('api-button-count');
    var counter = Component.fromId('api-count');
    var count = 0;
    button.onEvent('click', () => {
        counter.text(++count);
    });
</script>
```

[Full example here](./test/examples/counter.html). See below how to run tests.

## Install

Installation is not required. Copy the contents of `src` to your project's public folder.

## Api

- [Component](./src/components/component.js) controls a HTMLElement.
- [Component Collection](./src/components/componentCollection.js) - a set of components.
- [Form](./src/components/form.js) - extended component with form submission capability.
- [EventEmitter](./src/utils/eventEmitter.js) - provides the component with the ability to subscribe to and trigger events.

### Component

Contents:

- Create a component,
- Default usage.

#### Create a component

You can create a component in the following ways:

- `construct` method:

    ```js
    var div = document.createElement('div');
    var d = new Component(div);
    ```

- from HTMLElement class `Component.fromClass(className)`
- from HTMLElement name `Component.fromName(name)`
- from HTMLElement id `Component.fromId(id)`
- from parameters:

    ```js
    var component = Component.fromParams(
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
| `appendByClass(className)`    | The Component finds an element by class name and appends itself as a child |
| `appendById(id)`              | The Component finds an element by id and appends itself as a child         |
| `enable()`                    | The component can be accessible                                            |
| `disable()`                   | The component cannot be accessible                                         |
| `onEvent(name, callback)`     | Subscribe to a DOM event                                                   |
| `hide()`                      | Hide the component                                                         |
| `show(type = 'block')`        | Display the component                                                      |
| `text(newText = '')`          | Adds inner text                                                            |
| `onHide(callback)`            | Registers a callback to handle hiding                                      |
| `onShow(callback)`            | Registers a callback to handle showing                                     |
| `getValue()`                  | access value attribute                                                     |
| `setValue(val)`               | update value attribute                                                     |
| `getName()`                   | access name attribute                                                      |
| `setName(val)`                | update name attribute                                                      |

### Component Collection

Contents:

- Create a component collection,
- Default usage.

#### Create a component collection

You can create a component collection in the following ways:

- `construct` method:

    ```js
    var div = document.createElement('div');
    var div2 = document.createElement('div');
    var components = [div1, div2];
    var dc = new ComponentCollection(components);
    ```

- from HTMLElement class `ComponentCollection.fromClass(className)`
- from HTMLElement tag `ComponentCollection.fromTag(tagName)`

#### Default usage of the collection

After creating a component collection, you can use the built-in functions:

| api name                      | description                            |
|-------------------------------|----------------------------------------|
| `disable()`                   | The components cannot be accessible    |
| `enable()`                    | The components can be accessible       |
| `hide()`                      | Hide the components                    |
| `onEvent(name, callback)`     | Subscribe to a DOM event               |
| `onHide(callback)`            | Registers a callback to handle hiding  |
| `onShow(callback)`            | Registers a callback to handle showing |
| `show(type = 'block')`        | Display the components                 |
| `text(newText = '')`          | Adds inner text                        |

### Form

A [Form](./src/components/form.js) is an extended component that provides the following additional capabilities:

- a `submit()` method to control the submission flow.

### EventEmitter

[EventEmitter](./src/utils/eventEmitter.js) is used to subscribe to events and emit events. The `Component` extends `EventEmitter`, so each component can subscribe to another component’s event. You can also execute other module logic when events occur.

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

var button = Component.fromId('id1');
var superButton = SuperButton.fromId('id2');

superButton.on('someEvent', (...args) => {
    // 1. work with event's arguments
    // 2. work with another component
    button.disable();
    // 3. do another work
    console.log('message');
});
```

Api:

| api                   | description                                                                |
|-----------------------|----------------------------------------------------------------------------|
| `clear(name)`         | Delete the event by name, or delete all events if no name was provided     |
| `count(name)`         | Returns the number of registered callbacks or 0                            |
| `emit(name, ...args)` | Runs an event with arguments `args`                                        |
| `listeners(name)`     | Get event's callbacks                                                      |
| `names()`             | Events' names                                                              |
| `on(name, fn)`        | Subscribe a unique callback to the event                                   |
| `once(name, fn)`      | Like `on`, except the event is removed after the first execution           |
| `remove(name, fn)`    | Removes the callback                                                       |

## Run tests

All modules are tested. You can find tests in [test](./test/) dir. To run the tests, follow these steps:

1. Run in the console `docker compose up --build`.
2. Visit [localhost:8080](http://localhost:8080).
3. Select the desired test suite.
4. Open browser console and check tests' status.
