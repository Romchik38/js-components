'use strict';

var schemes = ['http', 'https'];

/**
 * 
 * @param {function} target - target or dynamicTarget
 * @param {string} scheme - HTTP or HTTPS
 * @param {string} authority 
 * @returns {function} - The urbuilder with ready to use prefix and target
 */
export default function(target, scheme = '', authority = ''){
    var prefix;
    if (scheme === '' && authority === '') {
        prefix = '';
    } else {
        if (scheme === '') {
            throw Error('Param scheme is empty');
        } else if (!schemes.find((v) => v === scheme)) {
            throw Error('Param scheme is invalid ' + scheme);
        }
        if (
            authority === '' ||
            typeof authority !== 'string'
        ) {
            throw Error('Param authority is invalid');
        }
        prefix = scheme + '://' + authority;
    }
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
            queryItems.push(`${encodeURIComponent(query.name)}=${encodeURIComponent(query.value)}`);
        }
        if (queryItems.length > 0) {
            queryPart = '?' + queryItems.join('&');
        }
        if (fragment.length > 0) {
            fragment = '#' + fragment;
        }
        return prefix + target(parts) + queryPart + fragment;
    }
};