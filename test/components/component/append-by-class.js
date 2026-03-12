'use strict';

import { default as Component } from '/js/components/component.js';

class TestAppendByClass extends Component
{
    getValue() {
        return this.node.value;
    }
}

(function(){
    var testName = 'Test appendByClass';
    var value = 'Test 1';
    var className = 'some-class';
    // create tested element
    var body = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    div.value = value;
    div.classList.add(className);
    body.appendChild(div);
    // create a component
    var d = new TestAppendByClass(document.createElement('div'));
    d.appendByClass(className);
    // test value
    if (div.firstElementChild.value === d.getValue()) {
        console.log(testName + ' - passed');
    } else {
        console.error({
            testName,
            'expected ': d,
            'found': div.firstElementChild
        });
    }
})();
