chrome.tabs.onUpdated.addListener(check);
function check(tabid,cosa,tab) {
    console.log("function");
    console.log("taburl",tab.url);
    if(tab.url.toLowerCase().includes("labsis")||tab.url.toLowerCase().includes("luis")){
        chrome.pageAction.show(tabid);
    }
}