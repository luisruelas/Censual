chrome.tabs.onUpdated.addListener(check);
function check(tabid,cosa,tab) {
    console.log("function");
    console.log("taburl",tab.url);
    if(tab.url.includes("labsis")||tab.url.includes("Labsis")){
        chrome.pageAction.show(tabid);
    }
}