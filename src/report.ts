import { promises as fs } from 'fs';
const filePath = 'result.txt';

export const sortPages = (pages: any) => {
    const pagesArray = Object.entries(pages);

    pagesArray.sort((a: any, b: any) => {
        const aHits = a[1];
        const bHits = b[1];
        return bHits - aHits;
    });
    return pagesArray;
}

export const printReport = async (pages: any, crawlTime?: number) => {
    console.log('==========');
    console.log('REPORT');
    console.log('==========');
    const reportData = ['Report Date: ' + new Date().toISOString() + ' --- Crawl time: ' +crawlTime + 'ms'];
    const sortedPages = sortPages(pages);
    for(let page of sortedPages) {
        const url = page[0];
        const hits = page[1];
        const message = `found ${hits} links to page ${url}`;
        reportData.push(message);
        console.log(message);
    }
    console.log('==========');
    console.log('END REPORT');
    console.log('==========');
    // write to a text file
    await appendToFile(reportData);
}

// appending the result as a report.txt to the file
const appendToFile = async (content: any)=>{
    try {
        await fs.appendFile(filePath, content.join('\r\n'));
        console.log('Data successfully appended to file');
    } catch (err) {
        console.error('Error appending to file:', err);
    }
}
