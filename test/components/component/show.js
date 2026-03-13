'use strict';

import { default as Component } from '/js/components/component.js';

(function(){
    var testName = 'Test show default';
    var testNameWithValue = 'Test show with value';
    // create tested element
    var body = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    div.style.display = 'none';
    body.appendChild(div);
    // create a component
    var d = new Component(div);
    // test show default
    d.show();
    if (div.style.display === 'block') {
        console.log(testName + ' - passed');
    } else {
        throw Error(testName + ' - expected block' + ', found ' + div.style.display);
    }
    // test show with value
    var displayFlex = 'flex';
    d.show(displayFlex);
    if (div.style.display === displayFlex) {
        console.log(testNameWithValue + ' - passed');
    } else {
        throw Error(testNameWithValue + ' - expected' + displayFlex + ', found ' + div.style.display);
    }    
})();
