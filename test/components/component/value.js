'use strict';

import { default as Component } from '/js/components/component.js';

(function(){
    var testNameGet = 'Test get value';
    var testNameSet = 'Test set value';
    var value = 'Test 1';
    // create tested element
    var body = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    body.appendChild(div);
    // create a component
    var d = new Component(div);
    d.setValue(value);
    // test text
    if (d.getValue() === value) {
        console.log(testNameGet + ' - passed');
        console.log(testNameSet + ' - passed');
    } else {
        throw Error(testNameGet + '/' + testNameSet + ' - expected ' + value + ', found ' + d.getValue());
    }
})();
