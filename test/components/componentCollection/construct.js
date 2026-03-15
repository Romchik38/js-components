'use strict';

import { default as ComponentCollection } from '/js/components/componentCollection.js';
import { default as Component } from '/js/components/component.js';

class TestConstruct extends ComponentCollection
{
    getValues() {
        var values = [];
        for (const component of this.components) {
            values.push(component.getValue());
        }
        return values;
    }
}

(function(){
    var testName = 'Test construct';
    var value1 = 1;
    var value2 = 2;
    // create tested element
    var body = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    div.value = value1;
    var div2 = document.createElement('div');
    div2.value = value2;
    body.appendChild(div);
    body.appendChild(div2);
    // create a component
    var components = [
        new Component(div),
        new Component(div2)
    ];
    var dc = new TestConstruct(components);
    var values = dc.getValues();
    // test value
    if (
        values[0] === value1 &&
        values[1] === value2
    ) {
        console.log(testName + ' - passed');
    } else {
        throw Error(testName + ' - expected ' + value1 + ', ' + value2 + ', found ' + values.toString());
    }
})();
