'use strict';

import { default as Component } from '/js/components/component.js';

(function(){
    var testName = 'Test onEvent';
    var value = 'Test 1';
    var clicked = false;
    // create tested element
    var body = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    div.value = value;
    body.appendChild(div);
    // create a component
    var d = new Component(div);
    // test value
    d.onEvent('click', () =>{
        clicked = true;
    });
    div.click();
    if (clicked === true) {
        console.log(testName + ' - passed');
    } else {
        throw Error(testName + ' - expected true' + 'found ' + clicked);
    }
})();
