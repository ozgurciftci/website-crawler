import * as cheerio from 'cheerio';
import pLimit from 'p-limit';

const limit = pLimit(5);  // Limit concurrency to 5 simultaneous requests

export const normalizeURL = (url: string) => {
    const urlObj = new URL(url);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1);
    }
    return hostPath;
}

export const getURLsFromHTML = (htmlBody: string, baseURL: string): string[] => {
    const $ = cheerio.load(htmlBody);
    const links: string[] = [];
    const linkElements = $("a");

    // Regex to check for valid URL format (absolute or valid relative)
    const validUrlRegex = /^(\/|\.\/|\.\.\/|https?:\/\/)/;

    linkElements.each((index, value) => {
        let href = $(value).attr('href');

        if (href) {
            // If the URL does not match valid patterns, skip it
            if (!validUrlRegex.test(href)) {
                // console.log(`Skipping invalid href: ${href}`);
                return; // Skip invalid URL
            }

            try {
                // Resolve relative URLs to absolute URLs
                const resolvedUrl = new URL(href, baseURL);
                links.push(resolvedUrl.href);
            } catch (error) {
                console.log(`Invalid URL skipped: ${href}`);
                // Invalid URL, skip it
            }
        }
    });

    return links;
};

export const crawlPage = async (baseURL: string, currentURL: string, pages: any) => {
    const baseURLObject = new URL(baseURL);
    const currentURLObject = new URL(currentURL);
    // Skip pages from different domains
    if (baseURLObject.hostname !== currentURLObject.hostname) {
        return pages;
    }
    // Normalize URL and increase the number of usage if there is
    const normalizedCurrentURL = normalizeURL(currentURL);
    if (pages[normalizedCurrentURL] > 0) {
        pages[normalizedCurrentURL]++;
        return pages;
    }
    pages[normalizedCurrentURL] = 1;
    console.log(`actively crawling: ${currentURL}`);
    try {
        const response = await fetch(currentURL);
        if (!response.ok) {
            console.log(`error occured while fetching ${currentURL}, response: ${response.status}`);
            return pages;
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('text/html')) {
            console.log(`non html response, content-type: ${contentType} on page ${currentURL}`);
            return pages;
        }
        const htmlBody = await response.text();
        const nextURLs = getURLsFromHTML(htmlBody, baseURL);
        for (const nextURL of nextURLs) {
            pages = await crawlPage(baseURL, nextURL, pages)
        }
    } catch (error: any) {
        console.error(`error in fetch: ${error.message}, on page: ${currentURL}`);
    }
    return pages;
}
