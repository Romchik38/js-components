'use strict';

import { default as Component } from '/js/components/component.js';

(function(){
    var testName = 'Test onEvent twice';
    var value = 'Test 1';
    var clicked = false;
    var clicked2 = false;
    // create tested element
    var body = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    div.value = value;
    body.appendChild(div);
    // create a component
    var d = new Component(div);
    // test click
    d.onEvent('click', () =>{
        clicked = true;
    });
    d.onEvent('click', () =>{
        clicked2 = true;
    });    
    div.click();
    if (
        clicked === true &&
        clicked2 === true
    ) {
        console.log(testName + ' - passed');
    } else {
        throw Error(testName + ' - expected true' + 'found ' + clicked + ', ' + clicked2);
    }
})();
