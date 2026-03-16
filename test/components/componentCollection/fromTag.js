'use strict';

import { default as ComponentCollection } from '/js/components/componentCollection.js';

class TestFromTag extends ComponentCollection
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
    var testName = 'Test fromTag';
    var testName2 = 'Test fromTag with wrong value';
    var value1 = 1;
    var value2 = 2;
    var tagName = 'div1';
    var expectedErrorMessage = 'Param tagName is invalid';
    // create tested element
    var body = document.getElementsByTagName('body')[0];
    var div = document.createElement(tagName);
    div.value = value1;
    var div2 = document.createElement(tagName);
    div2.value = value2;
    body.appendChild(div);
    body.appendChild(div2);
    // create a component
    var d1c = TestFromTag.fromTag(tagName);
    var values = d1c.getValues();
    // test value
    if (
        values[0] === value1 &&
        values[1] === value2
    ) {
        console.log(testName + ' - passed');
    } else {
        throw Error(testName + ' - expected ' + value1 + ', ' + value2 + ', found ' + values.toString());
    }
    // test wrong class name
    var wasThrown = false;
    try {
        ComponentCollection.fromTag({});
    } catch(e) {
        if (e.message === expectedErrorMessage) {
            wasThrown = true;
            console.log(testName2 + ' - passed');
        } else {
            throw new Error(testName2 + ' - expected error ' + expectedErrorMessage + ', found ' + e.message);
        }
    }
    if (wasThrown === false) {
        throw new Error(testName2 + ' - expected error on wrong tag name, but it passed');
    }
})();
