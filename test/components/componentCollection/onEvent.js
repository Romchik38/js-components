'use strict';

import { default as ComponentCollection } from '/js/components/componentCollection.js';
import { default as Component } from '/js/components/component.js';

(function(){
    var testName = 'Test onEvent';
    var initValue = 'text1';
    var workValue = 'text2';
    // create tested element
    var body = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    div.value = initValue;
    var div2 = document.createElement('div');
    div2.value = initValue;
    body.appendChild(div);
    body.appendChild(div2);
    // create a component
    var components = [
        new Component(div),
        new Component(div2)
    ];
    var dc = new ComponentCollection(components);
    dc.onEvent('click', (e) => {
        this.text(workValue);
    })
    div.click();
    div2.click();
    // test value
    if (
        div.innerText === workValue &&
        div2.innerText === workValue
    ) {
        console.log(testName + ' - passed');
    } else {
        throw Error(testName + ' - expected ' + workValue + ', found ' + div.innerText + ', ' + div2.innerText);
    }
})();
