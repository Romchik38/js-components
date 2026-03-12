'use strict';

import { default as Component } from '/js/components/component.js';

(function(){
    var testName = 'Test disable';
    // create tested element
    var body = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    div.disabled = false;
    body.appendChild(div);
    // create a component
    var d = new Component(div);
    // test disable
    d.disable();
    if (div.disabled === true) {
        console.log(testName + ' - passed');
    } else {
        throw Error(testName + ' - expected true' + ', found ' + div.disabled);
    }
})();
