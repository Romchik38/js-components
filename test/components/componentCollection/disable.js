'use strict';

import { default as ComponentCollection } from '/js/components/componentCollection.js';
import { default as Component } from '/js/components/component.js';

// class TestConstruct extends ComponentCollection
// {
//     getValues() {
//         var values = [];
//         for (const component of this.components) {
//             values.push(component.getValue());
//         }
//         return values;
//     }
// }

(function(){
    var testName = 'Test disable';
    // create tested element
    var body = document.getElementsByTagName('body')[0];
    var div = document.createElement('input');
    div.setAttribute('type', 'text');
    div.disabled = false;
    var div2 = document.createElement('input');
    div2.setAttribute('type', 'text');
    div2.disabled = false;
    body.appendChild(div);
    body.appendChild(div2);
    // create a component
    var components = [
        new Component(div),
        new Component(div2)
    ];
    var ic = new ComponentCollection(components);
    ic.disable();
    // test value
    if (
        div.disabled === true &&
        div2.disabled === true
    ) {
        console.log(testName + ' - passed');
    } else {
        throw Error(testName + ' - expected true, found ' + div.disabled + ', ' + div2.disabled);
    }
})();
