import {sortPages} from '../src/report.js';


describe('report', () => {
    test('sort 2 pages', () => {
        const input = {
            'http://example.com/path': 3,
            'http://example.com': 5,
        }
        const actual = sortPages(input);
        const expected = [['http://example.com', 5], ['http://example.com/path', 3]];
        expect(actual).toEqual(expected);
    })
    test('sort 5 pages', () => {
        const input = {
            'http://example.com/path': 3,
            'http://example.com': 5,
            'http://example.com/path/path2': 4,
            'http://example.com/path/path2/path3': 2,
            'http://example.com/path5': 1,
        }
        const actual = sortPages(input);
        const expected = [
            ['http://example.com', 5],
            ['http://example.com/path/path2', 4],
            ['http://example.com/path', 3],
            ['http://example.com/path/path2/path3', 2],
            ['http://example.com/path5', 1],];
        expect(actual).toEqual(expected);
    })
})
