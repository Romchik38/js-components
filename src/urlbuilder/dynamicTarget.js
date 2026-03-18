'use strict';

import { default as target } from './target.js';

var rootName = 'root';

export default function(dynamicRoot){
    return function(parts = []){
        if(parts.length === 0) {
            throw new Error('Param parts is empty');
        }
        var firstPath = parts[0];
        if (firstPath === rootName) {
            parts[0] = dynamicRoot;
        }
        return target(parts);
    };
};