'use strict';

import { default as Component } from '/js/components/component.js';

(function(){
    var testName = 'Test fromParams';
    var className = 'some-class-for-from-params';
    var testedTag = 'div';
    var testedClass = 'tested-class-for-params';
    var testedText = 'tested text for-params'
    // create tested element
    var body = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    div.classList.add(className);
    body.appendChild(div);
    // create a component
    var d = Component.fromParams(
        testedTag,
        {
            class: testedClass
        },
        testedText
    );  
    d.appendByClass(className);
    var firstElem = div.firstElementChild;
    // test text
    if (firstElem.innerText === testedText) {
        console.log(testName + ' text - passed');
    } else {
        throw Error(testName + ' expected ' + testedText + ', found' + firstElem.innerText);
    }
    // test tag name
    var firstElemTagName = firstElem.tagName.toLowerCase();
    if (firstElemTagName === testedTag) {
        console.log(testName + ' tag name - passed');
    } else {
        throw Error(testName + ' expected ' + testedTag + ', found' + firstElemTagName);
    }
    // test tag class
    if (firstElem.className === testedClass) {
        console.log(testName + ' class - passed');
    } else {
        throw Error(testName + ' expected ' + testedClass + ', found' + firstElem.className);
    }
})();
