'use strict';

import { default as ComponentCollection } from '/js/components/componentCollection.js';
import { default as Component } from '/js/components/component.js';

(function(){
    var testName = 'Test disable';
    // create tested element
    var body = document.getElementsByTagName('body')[0];
    var div = document.createElement('input');
    div.setAttribute('type', 'text');
    div.disabled = true;
    var div2 = document.createElement('input');
    div2.setAttribute('type', 'text');
    div2.disabled = true;
    body.appendChild(div);
    body.appendChild(div2);
    // create a component
    var components = [
        new Component(div),
        new Component(div2)
    ];
    var ic = new ComponentCollection(components);
    ic.enable();
    // test value
    if (
        div.disabled === false &&
        div2.disabled === false
    ) {
        console.log(testName + ' - passed');
    } else {
        throw Error(testName + ' - expected false, found ' + div.disabled + ', ' + div2.disabled);
    }
})();
