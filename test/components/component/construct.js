'use strict';

import { default as Component } from '/js/components/component.js';

class TestConstruct extends Component
{
    getValue() {
        return this.node.value;
    }
}

(function(){
    var testName = 'Test construct';
    var value = 'Test 1';
    // create tested element
    var body = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    div.value = value;
    body.appendChild(div);
    // create a component
    var d = new TestConstruct(div);
    // test value
    if (d.getValue() === value) {
        console.log(testName + ' - passed');
    } else {
        throw Error(testName + ' - expected ' + value + ', found ' + d.getValue());
    }
})();
