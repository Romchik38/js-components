'use strict';

import { default as Component } from '/js/components/component.js';

class TestFromName extends Component
{
    getValue() {
        return this.node.value;
    }
}

(function(){
    var testName = 'Test fromName';
    var value = 'Test 1';
    var name = 'name-for-test-from-name';
    // create tested element
    var body = document.getElementsByTagName('body')[0];
    var input = document.createElement('input');
    input.value = value;
    input.name = name;
    body.appendChild(input);
    // create a component
    var i = TestFromName.fromName(name);
    // test value
    if (i.getValue() === value) {
        console.log(testName + ' - passed');
    } else {
        throw Error(testName + ' - expected ' + value + ', found ' + i.getValue());
    }
})();
