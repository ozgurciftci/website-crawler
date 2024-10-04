import {crawlPage, crawlPageV2} from './crawl.js';
import {printReport} from './report.js';

const main = async () => {
    if (process.argv.length < 3) {
        console.log('No website provided!');
        process.exit(1);
    }
    if (process.argv.length > 3) {
        console.log('Too many website provided!');
        process.exit(1)
    }
    const baseURL = process.argv[process.argv.length - 1];

    console.log(`starting crawl of ${baseURL}`);
    const startTime = performance.now()
    // const pages = await crawlPage(baseURL, baseURL, {});
    const pages = await crawlPageV2(baseURL, {});
    const endTime = performance.now();
    const time = endTime - startTime;
    console.log(`crawl of ${baseURL} completed in ${time}ms`);
    await printReport(pages, time);
    process.exit(0);
}
(async () => await main())();
