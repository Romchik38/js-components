'use strict';

import { default as ComponentCollection } from '/js/components/componentCollection.js';

class TestFromClass extends ComponentCollection
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
    var testName = 'Test fromClass';
    var testName2 = 'Test fromClass with wrong value';
    var value1 = 1;
    var value2 = 2;
    var className = 'some-class-for-from-class';
    var expectedErrorMessage = 'Elements with class name wrong not present';
    // create tested element
    var body = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    div.value = value1;
    div.classList.add(className);
    var div2 = document.createElement('div');
    div2.value = value2;
    div2.classList.add(className);
    body.appendChild(div);
    body.appendChild(div2);
    // create a component
    var dc = TestFromClass.fromClass(className);
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
    // test wrong class name
    var wasThrown = false;
    try {
        ComponentCollection.fromClass('wrong');
    } catch(e) {
        if (e.message === expectedErrorMessage) {
            wasThrown = true;
            console.log(testName2 + ' - passed');
        } else {
            throw new Error(testName2 + ' - expected error ' + expectedErrorMessage + ', found ' + e.message);
        }
    }
    if (wasThrown === false) {
        throw new Error(testName2 + ' - expected error on wrong class name, but it passed');
    }
})();
