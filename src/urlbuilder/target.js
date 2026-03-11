'use strict';

export default function(parts){
    if(parts.length === 0) {
        throw new Error('parts is empty');
    }
    return '/' + parts.join('/');
};