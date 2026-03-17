'use strict';

/**
 * 
 * @param {Array<string>} parts 
 * @returns 
 */
export default function(parts = []){
    if(parts.length === 0) {
        return '/';
    }
    return '/' + parts.map((value)=>encodeURIComponent(value)).join('/');
};