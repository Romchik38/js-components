'use strict';

import { default as Component } from '/js/components/component.js';

class TestAppendById extends Component
{
    getValue() {
        return this.node.value;
    }
}

(function(){
    var testName = 'Test appendById';
    var value = 'Test 1';
    var id = 'id-for-test-append-by-id';
    // create tested element
    var body = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    div.value = value;
    div.id = id;
    body.appendChild(div);
    // create a component
    var d = new TestAppendById(document.createElement('div'));
    d.appendById(id);
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
