'use strict';

import { default as Component } from '/js/components/component.js';

(function(){
    var testName = 'Test show with callback was shown';
    var testName2 = 'Test show with callback the node was passed';
    var shown = false;
    var nodePassed = false;
    // create tested element
    var body = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    body.appendChild(div);
    // create a component
    var d = new Component(div);
    // test show with callback
    d.fnShow = (node) => {
        shown = true;
        if (node instanceof HTMLElement) {
            nodePassed = true;
        }
    };    
    d.show();
    if (shown === true) {
        console.log(testName + ' - passed');
    } else {
        throw Error(testName + ' - expected true, found ' + shown);
    }
    if (nodePassed === true) {
        console.log(testName2 + ' - passed');
    } else {
        throw Error(testName2 + ' - expected true, found ' + nodePassed);
    }    
})();
