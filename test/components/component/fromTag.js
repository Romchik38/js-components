'use strict';

import { default as Component } from '/js/components/component.js';

class TestFromTag extends Component
{
    getValue() {
        return this.node.value;
    }
}

(function(){
    var testName = 'Test fromTag';
    var testName2 = 'Test fromTag with wrong param';
    var testName3 = 'Test fromTag with not found tag';
    var testName4 = 'Test fromTag with more than one tag';
    var value = 'Test 1';
    var tagName = 'tag-for-test-from-tag';
    var notFoundTagName = 'tag-for-test-from-tag-not-found';
    var manyTagName = 'tag-for-test-from-tag-many';
    var expectedErrorMessage = 'Param tagName is invalid';
    var expectedNotFoundMessage = 'element ' + notFoundTagName + ' not found';
    var expectedManyMessage = 'element ' + manyTagName + ' is more than one';
    // create tested element
    var body = document.getElementsByTagName('body')[0];
    var element = document.createElement(tagName);
    element.value = value;
    body.appendChild(element);
    // create a component  
    var c = TestFromTag.fromTag(tagName);
    // test value
    if (c.getValue() === value) {
        console.log(testName + ' - passed');
    } else {
        throw Error(testName + ' - expected ' + value + ', found ' + c.getValue());
    }
    // test wrong param type
    var wasThrown = false;
    try {
        Component.fromTag({});
    } catch(e) {
        if (e.message === expectedErrorMessage) {
            wasThrown = true;
            console.log(testName2 + ' - passed');
        } else {
            throw new Error(testName2 + ' - expected error ' + expectedErrorMessage + ', found ' + e.message);
        }
    }
    if (wasThrown === false) {
        throw new Error(testName2 + ' - expected error on wrong param, but it passed');
    }
    // test not found tag
    var notFoundThrown = false;
    try {
        Component.fromTag(notFoundTagName);
    } catch(e) {
        if (e.message === expectedNotFoundMessage) {
            notFoundThrown = true;
            console.log(testName3 + ' - passed');
        } else {
            throw new Error(testName3 + ' - expected error ' + expectedNotFoundMessage + ', found ' + e.message);
        }
    }
    if (notFoundThrown === false) {
        throw new Error(testName3 + ' - expected error on not found tag, but it passed');
    }
    // test more than one tag
    var many1 = document.createElement(manyTagName);
    var many2 = document.createElement(manyTagName);
    body.appendChild(many1);
    body.appendChild(many2);
    var manyThrown = false;
    try {
        Component.fromTag(manyTagName);
    } catch(e) {
        if (e.message === expectedManyMessage) {
            manyThrown = true;
            console.log(testName4 + ' - passed');
        } else {
            throw new Error(testName4 + ' - expected error ' + expectedManyMessage + ', found ' + e.message);
        }
    }
    if (manyThrown === false) {
        throw new Error(testName4 + ' - expected error on more than one tag, but it passed');
    }
})();
