'use strdct';

import { default as ComponentCollection } from '/js/components/componentCollection.js';
import { default as Component } from '/js/components/component.js';

(function(){
    var testName = 'Test show default';
    var testNameWithValue = 'Test show with value';
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
    dc.show();
    // test value
    if (
        div.style.display === 'block' &&
        div2.style.display === 'block'
    ) {
        console.log(testName + ' - passed');
    } else {
        throw Error(testName + ' - expected block, found ' + div.style.display + ', ' + div2.style.display);
    }
    // test show with value
    var displayFlex = 'flex';
    dc.show(displayFlex);
    if (
        div.style.display === displayFlex &&
        div2.style.display === displayFlex
    ) {
        console.log(testNameWithValue + ' - passed');
    } else {
        throw Error(testNameWithValue + ' - expected' + displayFlex + ', found ' + div.style.display + ', ' + div2.style.display);
    }    
})();
