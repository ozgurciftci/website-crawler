import {getURLsFromHTML, normalizeURL} from '../src/crawl';

describe('crawl', () => {
    test('normalizeURL strip protocol', () => {
        expect(normalizeURL('https://example.com/test')).toEqual('example.com/test');
    })

    test('normalizeURL strip /', () => {
        expect(normalizeURL('https://example.com/test/')).toEqual('example.com/test');
    })
    test('normalizeURL capitals /', () => {
        expect(normalizeURL('https://EXAMPLE.com/test/')).toEqual('example.com/test');
    })
    test('normalizeURL strip http /', () => {
        expect(normalizeURL('http://example.com/test/')).toEqual('example.com/test');
    })
    test('getURLsFromHTML absolute', () => {
        const inputHTMLBody =
            `<html lang="en">
                <body>
                    <a href="http://example.com/test">example test link</a>
                </body>
               </html>`
        const inputBaseURL = 'http://example.com/test/'
        const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
        const expected = ['http://example.com/test'];
        expect(actual).toEqual(expected);
    })

    test('getURLsFromHTML relative', () => {
        const inputHTMLBody =
            `<html lang="en">
                <body>
                    <a href="/path/">example test link</a>
                </body>
               </html>`
        const inputBaseURL = 'http://example.com/'
        const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
        const expected = ['http://example.com/path/'];
        expect(actual).toEqual(expected);
    })

    test('getURLsFromHTML both absolute and relative', () => {
        const inputHTMLBody =
            `<html lang="en">
                <body>
                    <a href="http://example.com/path1/">example test link</a>
                    <a href="/path2/">example test link</a>
                </body>
               </html>`
        const inputBaseURL = 'http://example.com/'
        const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
        const expected = ['http://example.com/path1/', 'http://example.com/path2/'];
        expect(actual).toEqual(expected);
    })
    test('getURLsFromHTML handle invalid', () => {
        const inputHTMLBody =
            `<html lang="en">
            <body>
                <a href="invalid">Invalid URL</a>
            </body>
           </html>`;
        const inputBaseURL = 'https://example.com';
        const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
        expect(actual).toEqual([]);  // Test expects an empty array because "invalid" is not a valid URL
    });

    test('getURLsFromHTML handle empty', () => {
        const inputHTMLBody =
            `<html lang="en">
            <body>
                <a href="">empty URL</a>
            </body>
           </html>`;
        const inputBaseURL = 'https://example.com';
        const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
        expect(actual).toEqual([]);  // Test expects an empty array because "invalid" is not a valid URL
    });
})

