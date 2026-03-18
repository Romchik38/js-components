'use strict';

import { default as Component } from '/js/components/component.js';

class TestFromId extends Component
{
    getValue() {
        return this.node.value;
    }
}

(function(){
    var testName = 'Test fromId';
    var value = 'Test 1';
    var id = 'id_1';
    // create tested element
    var body = document.getElementsByTagName('body')[0];
    var input = document.createElement('input');
    input.id = id;
    input.value = value;
    body.appendChild(input);
    // create a component
    var i = TestFromId.fromId(id);
    // test value
    if (i.getValue() === value) {
        console.log(testName + ' - passed');
    } else {
        throw Error(testName + ' - expected ' + value + ', found ' + i.getValue());
    }
})();
