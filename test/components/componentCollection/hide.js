'use strict';

import { default as ComponentCollection } from '/js/components/componentCollection.js';
import { default as Component } from '/js/components/component.js';

(function(){
    var testName = 'Test hide';
    // create tested element
    var body = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    div.style.display = 'block';
    var div2 = document.createElement('div');
    div2.style.display = 'block';
    body.appendChild(div);
    body.appendChild(div2);
    // create a component
    var components = [
        new Component(div),
        new Component(div2)
    ];
    var dc = new ComponentCollection(components);
    dc.hide();
    // test value
    if (
        div.style.display === 'none' &&
        div2.style.display === 'none'
    ) {
        console.log(testName + ' - passed');
    } else {
        throw Error(testName + ' - expected none, found ' + div.style.display + ', ' + div2.style.display);
    }
})();