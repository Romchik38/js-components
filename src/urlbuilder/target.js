'use strict';

/**
 * 
 * @param {Array<string>} parts 
 * @returns {string}
 */
export default function(parts = []){
    if(parts.length === 0) {
        return '/';
    }
    return '/' + parts.map((value)=>encodeURIComponent(value)).join('/');
};