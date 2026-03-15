'use strdct';

import { default as ComponentCollection } from '/js/components/componentCollection.js';
import { default as Component } from '/js/components/component.js';

(function(){
    var testName = 'Test onShow with callback was shown';
    var testName2 = 'Test onShow with callback the node was passed';
    var shown = false;
    var nodePassed = false;    
    // create tested element
    var body = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    div.style.display = 'none';
    var div2 = document.createElement('div');
    div2.style.display = 'none';
    body.appendChild(div);
    body.appendChild(div2);
    // create a component
    var components = [
        new Component(div),
        new Component(div2)
    ];
    var dc = new ComponentCollection(components);
    dc.onShow((node) => {
        shown = true;
        if (node instanceof HTMLElement) {
            nodePassed = true;
        }
    });
    // test
    dc.show();
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
