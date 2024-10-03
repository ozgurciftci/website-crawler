import {crawlPage} from './crawl';

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
    const pages = await crawlPage(baseURL, baseURL, {});
    for (const page of Object.entries(pages)) {
        console.log(page);
    }
    process.exit(0);
}
(async () => await main())();
