
async function listenForClicks(url){
    //const host = new URL(url)?.origin;
    //if(typeof host === 'string'){
        const results = await browser.history.getVisits({ url: url});
        if(results.length > 1) {
            return new Date(results[1].visitTime);
        }
    //}
    return new Date();
}

function getwithZero(number){
    return `${number}`.padStart(2, '0');
}

const filter = {
  properties: ["url"]
}


browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tabInfo) => {

    if(changeInfo.url) {
        console.log(changeInfo.url);

        const lastSeen = await listenForClicks(changeInfo.url);
        if(lastSeen) {
            const year = lastSeen.getFullYear();
            const month = getwithZero(lastSeen.getMonth() + 1);
            const date = getwithZero(lastSeen.getDate());
            const hour = getwithZero(lastSeen.getHours());
            const minutes = getwithZero(lastSeen.getMinutes());
            const lastVisitedtitle  = `${year}-${month}-${date} ${hour}:${minutes}`;
            console.log(lastVisitedtitle);

            browser.pageAction.setTitle({
                tabId: tabId,
                title:lastVisitedtitle
            });
        }
    }

}, filter);
