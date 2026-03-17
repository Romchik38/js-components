'use strict';

export default function(target){
    /** 
     * The urbuilder encode queries.
     * @param {array<string>} parts - The Path /article looks like ['article']
     * @param {array<Query>} queries  - The queries
     * @param {string} fragment - The fragment without #
     * */
    return function(parts, queries = [], fragment = ''){
        var queryPart = '';
        var queryItems = [];
        for (var query of queries) {
            queryItems.push(`${query.name}=${query.value}`);
        }
        if (queryItems.length > 0) {
            queryPart = '?' + queryItems.join('&');
        }
        if (fragment.length > 0) {
            fragment = '#' + fragment;
        }
        return window.location.origin + target(parts) + queryPart + fragment;
    }
};