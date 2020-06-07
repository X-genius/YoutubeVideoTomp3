//Step 1 : To load the inbuilt js files
let pup = require("puppeteer");
let fs = require("fs");

//Step 2 : To take inputs in javascript
let credentialFiles = process.argv[2];
let url , urlNext;
let SearchVideo = process.argv[3];

//Step 3 : To use credentials.json to  take url and as well as using async function 
(async function(){
    let data = await fs.promises.readFile(credentialFiles , "utf-8");
    let credentials = JSON.parse(data);
    url = credentials.url;
    urlNext = credentials.urlNext;

//Step 4 : For Start Chromium Browser using launch function 
     let browser = await pup.launch({
         headless : false,
         defaultViewport : null,
         args : ["--start-maximized"],
         slowMo : 250
     });

//Step 5 : Open Number of Tabs in pup 
let numberOfPages = await browser.pages();
let tab1 = numberOfPages[0];

await tab1.goto(url , {
       waitUntil : "networkidle2"
});

await tab1.waitForSelector("#search-form #container #search-input #search");
await tab1.type("#search-form #container #search-input #search" , SearchVideo , {delay : 150});
await tab1.keyboard.press("Enter");
await tab1.click(".style-scope.ytd-two-column-search-results-renderer #contents #dismissable");
await tab1.click("button.ytp-play-button.ytp-button");
await tab1.click("#top-level-buttons a.yt-simple-endpoint.style-scope.ytd-button-renderer");
await tab1.click(".style-scope.ytd-popup-container .style-scope.ytd-popup-container .style-scope.yt-third-party-network-section-renderer #bar #copy-button paper-button#button");

let tab2 = await browser.newPage();
await tab2.goto(urlNext);
await tab2.bringToFront();

await tab2.waitForSelector("input#input");
await tab2.keyboard.down("Control");
await tab2.keyboard.press("V");
await tab2.keyboard.up("Control");
await tab2.click("input#submit");
await tab2.click("#buttons a[rel = 'nofollow']");

})();


 