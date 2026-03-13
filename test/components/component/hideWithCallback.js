'use strict';

import { default as Component } from '/js/components/component.js';

(function(){
    var testName = 'Test hide with callback was hidden';
    var testName2 = 'Test hide with callback the node was passed';
    var hidden = false;
    var nodePassed = false;
    // create tested element
    var body = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    body.appendChild(div);
    // create a component
    var d = new Component(div);
    // test hide with callback
    d.onHide((node) => {
        hidden = true;
        if (node instanceof HTMLElement) {
            nodePassed = true;
        }
    });
    d.hide();
    if (hidden === true) {
        console.log(testName + ' - passed');
    } else {
        throw Error(testName + ' - expected true, found ' + hidden);
    }
    if (nodePassed === true) {
        console.log(testName2 + ' - passed');
    } else {
        throw Error(testName2 + ' - expected true, found ' + nodePassed);
    }    
})();
