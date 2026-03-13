'use strict';

import { default as Component } from '/js/components/component.js';

(function(){
    var testName = 'Test text';
    var value = 'Test 1';
    // create tested element
    var body = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    body.appendChild(div);
    // create a component
    var d = new Component(div);
    d.text(value);
    // test text
    if (div.innerText === value) {
        console.log(testName + ' - passed');
    } else {
        throw Error(testName + ' - expected ' + value + ', found ' + div.innerText);
    }
})();
