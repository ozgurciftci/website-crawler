import fs from 'fs';

export const sortPages = (pages: any) => {
    const pagesArray = Object.entries(pages);

    pagesArray.sort((a: any, b: any) => {
        const aHits = a[1];
        const bHits = b[1];
        return bHits - aHits;
    });
    return pagesArray;
}

export const printReport = async (pages: any) => {
    console.log('==========');
    console.log('REPORT');
    console.log('==========');
    const reportData = [];
    const sortedPages = sortPages(pages);
    for(let page of sortedPages) {
        const url = page[0];
        const hits = page[1];
        const message = `found ${hits} links to page ${url}\n`;
        reportData.push(message);
        console.log(message);
    }
    console.log('==========');
    console.log('END REPORT');
    console.log('==========');
    // write to a text file
    await writeFile(reportData);
}

const writeFile = async (content: any)=>{
    console.log(content.toString());
    fs.writeFileSync('./result.txt', content.toString());
}
