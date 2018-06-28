window.onload=function () {
    let internomessage="Amigos internos: " +
        "<br/>"+
        "Felicidades por terminar el infierno. No creo que sea secreto para" +
        " alguien el cariño y admiración que siento por cada uno de ustedes, así que voy a ser" +
        " muy breve y conciso: les agradezco todo lo que me enseñaron como médicos y amigos, " +
        "siempre van a estar en mi corazón. Ustedes forman el mejor grupo en el que he tenido la " +
        "fortuna de participar, siempre me me sentí aceptado e incluido tal como soy y eso, para mí, " +
        "no tiene precio. " +
        "<br/>" +
        "Los quiero mucho, nos vemos pronto, llenos de VICTORIA ;)" +
        "<br/>" +
        "Luis";

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
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {"message": "start"});
        });
    }
    function colorOver(){
        btcopy.style.backgroundColor="#019407";
    }
    function colorOut(){
        btcopy.style.backgroundColor="#4CAF50";
    }
};
