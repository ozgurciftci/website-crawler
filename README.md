# Website Crawler

## Overview

**Website Crawler** is a command-line tool built with Node.js and TypeScript that recursively crawls static web pages starting from a given base URL. It parses HTML pages, extracts and normalizes URLs, and handles both absolute and relative links. The project uses Cheerio for HTML parsing and supports customizable crawling options.

This project is licensed under the **GNU License**, so anyone is welcome to use, inspect, and contribute to the code. The tool will be updated frequently with improvements and new features.

## Features

- Crawls websites starting from a base URL.
- Extracts and normalizes both relative and absolute URLs.
- Handles non-HTML responses gracefully.
- Provides detailed logging during the crawling process.
- Built with TypeScript for type safety.
- Unit tests included with Jest for key functionality.

## Requirements

- Node.js (version 14.x or higher)
- npm (version 6.x or higher)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/website-crawler.git
   cd website-crawler
## Usage
To use the website crawler, run the following command:
```bash
npm start -- <URL>
```
Replace <url> with the website you want to crawl. For example:
```bash 
npm start -- https://example.com
```

## Output
The crawler will log the URLs it encounters and crawls to the console. It will normalize URLs, handling both relative and absolute paths.

### Command-Line Arguments
- If no URL is provided, the program will output `No website provided!` and exit.
- If more than one URL is provided, the program will output `Too many websites provided!` and exit.

## Running Tests
This project includes unit tests written with Jest. To run the tests, use the following command:
```bash
npm run test
```
## License
This project is licensed under the GNU General Public License (GNU). For more information, please see the LICENSE file.

## Contributing
Contributions are welcome! If you’d like to contribute, feel free to fork the repository and submit a pull request. Please ensure that your code passes all tests and follows the established style guidelines. :)

## Roadmap
Planned features and improvements include:
- Improved error handling and reporting.
- Adding command-line options for depth control, rate-limiting, and parallel requests.
- Enhanced support for additional content types (e.g., PDFs, images).
- Caching mechanisms for previously visited URLs.


