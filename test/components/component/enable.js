'use strict';

import { default as Component } from '/js/components/component.js';

(function(){
    var testName = 'Test enable';
    // create tested element
    var body = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    body.appendChild(div);
    // create a component
    var d = new Component(div);
    // test enable
    d.enable();
    if (div.disabled === false) {
        console.log(testName + ' - passed');
    } else {
        throw Error(testName + ' - expected true' + ', found ' + div.disabled);
    }
})();
