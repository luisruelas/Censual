window.onload=function () {
    let btcopy=document.getElementById("btcopy")
    function popup() {
        btcopy.innerHTML="Copiado";
        btcopy.style.backgroundColor="#5aa1d6";
        btcopy.removeEventListener("mouseover",colorOver);
        btcopy.removeEventListener("mouseout", colorOut);
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {"message": "start"});
        });
    };
    btcopy.addEventListener("click", popup);
    btcopy.addEventListener("mouseover",colorOver)
    btcopy.addEventListener("mouseout",colorOut)
    function colorOver(){
        btcopy.style.backgroundColor="#019407";
    }
    function colorOut(){
        btcopy.style.backgroundColor="#4CAF50";
    }
};
