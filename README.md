# Components

![status](https://placehold.co/15x15/ff0000/000000/png?text=D) `status: in development`

Contents:

- Description
- Example
- Install
- Run tests

## Description

A lightweight vanilla JavaScript component library for simple DOM element management without external dependencies.

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

Copy the contents of `src` to your project's public folder.

## Run tests

1. Use docker `docker compose up --build`
2. Visit [localhost:8080](http://localhost:8080)
3. Open browser console.
4. Click on a test or examples.
