'use strict';

import { default as Component } from '/js/components/component.js';

(function(){
    var testNameGet = 'Test get name';
    var testNameSet = 'Test set name';
    var value = 'Test 1';
    // create tested element
    var body = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    body.appendChild(div);
    // create a component
    var d = new Component(div);
    d.setName(value);
    // test name
    if (d.getName() === value) {
        console.log(testNameGet + ' - passed');
        console.log(testNameSet + ' - passed');
    } else {
        throw Error(testNameGet + '/' + testNameSet + ' - expected ' + value + ', found ' + d.getName());
    }
})();
