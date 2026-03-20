'use strict';

/**
 * 
 * @param {string[]} parts - URL path
 * @returns {string} - Ready to use path part with /
 */
export default function(parts = []){
    if(parts.length === 0) {
        return '/';
    }
    return '/' + parts.map((value)=>encodeURIComponent(value)).join('/');
}