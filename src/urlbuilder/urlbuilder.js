'use strict';

const schemes = ['http', 'https'];

/**
 * @typedef {object} Query
 * @property {string} name - Non encoded text
 * @property {string} value  - Non encoded text
 */

/**
 * 
 * @param {() => string} target - target or dynamicTarget
 * @param {string} scheme - HTTP or HTTPS
 * @param {string} authority  - [userinfo@]host[:port]
 * @returns {function(string[],Query[],string): string} - The urbuilder with ready to use prefix and target
 */
export default function(target, scheme = '', authority = ''){
    let prefix;
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
     * @param {string[]} parts - The Path /article looks like ['article']
     * @param {Query[]} queries  - The queries
     * @param {string} fragment - The fragment without #
     * @returns {string} - Ready to use URL
     */
    return function(parts, queries = [], fragment = ''){
        let queryPart = '';
        const queryItems = [];
        for (const query of queries) {
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
}