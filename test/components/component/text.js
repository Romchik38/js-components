'use strict';

import { default as Component } from '/js/components/component.js';

(function(){
    var testName = 'Test text';
    var testName2 = 'Test text default (clearing)';
    var value = 'Test 1';
    // create tested element
    var body = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    body.appendChild(div);
    // create a component
    var d = new Component(div);
    // test text
    d.text(value);
    if (div.innerText === value) {
        console.log(testName + ' - passed');
    } else {
        throw Error(testName + ' - expected ' + value + ', found ' + div.innerText);
    }
    // test text default (clear)
    d.text();
    if (div.innerText === '') {
        console.log(testName2 + ' - passed');
    } else {
        throw Error(testName2 + ' - expected nothing, found ' + div.innerText);
    }
})();
