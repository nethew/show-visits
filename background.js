
async function onMessage(data, sender) {
    if (data.getVisits) {
        const atabs = await browser.tabs.query({currentWindow: true, active: true});
        if(atabs.length > 0){
            //console.log(atabs[0].url);
            const visits = (await browser.history.getVisits({ url: atabs[0].url})).map( v => v.visitTime);

            return { 'url': atabs[0].url, 'visits': visits };
        }
    }
    return [];
}

browser.runtime.onMessage.addListener(onMessage);

