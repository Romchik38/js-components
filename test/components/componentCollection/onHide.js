'use strict';

import { default as ComponentCollection } from '/js/components/componentCollection.js';
import { default as Component } from '/js/components/component.js';

(function(){
    var testName = 'Test onHide with callback was hidden';
    var testName2 = 'Test onHide with callback the node was passed';
    var hidden = false;
    var nodePassed = false;
    // create tested element
    var body = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    div.style.display = 'block';
    var div2 = document.createElement('div');
    div2.style.display = 'block';
    body.appendChild(div);
    body.appendChild(div2);
    // create a component
    var components = [
        new Component(div),
        new Component(div2)
    ];
    var dc = new ComponentCollection(components);
    dc.onHide((node) => {
        hidden = true;
        if (node instanceof HTMLElement) {
            nodePassed = true;
        }
    });
    // test
    dc.hide();
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
