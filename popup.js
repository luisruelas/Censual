window.onload=function () {

    let divwrapper=document.getElementById("wrapper");

    let btcopy=document.getElementById("btcopy");
    btcopy.addEventListener("click", popup);
    btcopy.addEventListener("mouseover",colorOver);
    btcopy.addEventListener("mouseout",colorOut);

    let btmessage=document.getElementById("btmensaje");
    btmessage.addEventListener("click",showinternomessage);

    function showinternomessage() {
        btmessage.style.width="500px";
        btmessage.innerHTML=internomessage;
        btmessage.style.color="#000";
    }
    function popup() {
        btcopy.innerHTML="Copiado";
        btcopy.style.backgroundColor="#5aa1d6";
        btcopy.removeEventListener("mouseover",colorOver);
        btcopy.removeEventListener("mouseout", colorOut);
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
          });
        });
    }
    function colorOver(){
        btcopy.style.backgroundColor="#019407";
    }
    function colorOut(){
        btcopy.style.backgroundColor="#4CAF50";
    }
};
