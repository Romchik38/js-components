'use strdct';

import { default as ComponentCollection } from '/js/components/componentCollection.js';
import { default as Component } from '/js/components/component.js';

(function(){
    var testName = 'Test text default (clear)';
    var testNameWithValue = 'Test text with value';
    var value = 'text with value';
    // create tested element
    var body = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    div.innerText = 'sometext1';
    var div2 = document.createElement('div');
    div2.innerText = 'sometext2';
    body.appendChild(div);
    body.appendChild(div2);
    // create a component
    var components = [
        new Component(div),
        new Component(div2)
    ];
    var dc = new ComponentCollection(components);
    dc.text();
    // test
    if (
        div.innerText === '' &&
        div2.innerText === ''
    ) {
        console.log(testName + ' - passed');
    } else {
        throw Error(testName + ' - expected nothing, found ' + div.innerText + ', ' + div2.innerText);
    }
    // test text with value
    dc.text(value);
    if (
        div.innerText === value &&
        div2.innerText === value
    ) {
        console.log(testNameWithValue + ' - passed');
    } else {
        throw Error(testNameWithValue + ' - expected ' + value + ', found ' + div.innerText + ', ' + div2.innerText);
    }   
})();
