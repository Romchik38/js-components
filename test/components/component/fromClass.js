'use strict';

import { default as Component } from '/js/components/component.js';

class TestFromClass extends Component
{
    getValue() {
        return this.node.value;
    }
}

(function(){
    var testName = 'Test fromClass';
    var value = 'Test 1';
    var className = 'class-for-test-from-class';
    // create tested element
    var body = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    div.value = value;
    div.classList.add(className);
    body.appendChild(div);
    // create a component
    var d = TestFromClass.fromClass(className);
    // test value
    if (d.getValue() === value) {
        console.log(testName + ' - passed');
    } else {
        throw Error(testName + ' - expected ' + value + ', found ' + d.getValue());
    }
})();
