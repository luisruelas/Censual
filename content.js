var todo=[
    //BH
    {
        name:"CITOLOGIAHEMATICA",
        abb:null,
        labs:[
            {name:"HEMOGLOBINA",abb:"HB"},
            {name:"HEMATOCRITO", abb:"HTO"},
            {name:"LEUCOCITOS", abb:"LEU"},
            {name:"NEUTROFILOS", abb:"NEU"},
            {name:"PLAQUETAS", abb:"PLAQ"}
        ]
    },
    {
        name:"PRUEBASDEFUNCIONAMIENTOHEPATICO",
        abb:null,
        labs:[
            {name:"ALBUMINA",abb:"ALB"},
            {name:"BILIRRUBINATOTAL",abb:"BT"},
            {name:"BILIRRUBINADIRECTA",abb:"BD"},
            {name:"BILIRRUBINAINDIRECTA",abb:"BI"},
            {name:"ALANINOAMINOTRANSFERASAALT",abb:"ALT"},
            {name:"ASPARTATOAMINOTRANSFERASAAST",abb:"AST"},
            {name:"FOSFATASAALCALINA",abb:"FA"},
            {name:"PROTEINASTOTALESENSUERO",abb:"PT"},
            {name:"GLOBULINAS",abb:"GB"}
        ]
    },
    {
        name:"QUIMICASANGUINEADE3ELEMENTOS",
        abb:null,
        labs:[
            {name:"GLUCOSA", abb:"GLU"},
            {name:"NITROGENOUREICO",abb:"BUN"},
            {name:"UREA", abb:"UREA"},
            {name:"CREATININA", abb:"CREAT"}
        ]
    },
    {
        name:"ELECTROLITOSSERICOS",
        abb:null,
        labs:[
            {name:"SODIO", abb:"NA"},
            {name:"POTASIO",abb:"K"},
            {name:"CLORO", abb:"CL"}
        ]
    },
    {
        name:"Pruebassinagrupar",
        abb:null,
        labs:[
            {name:"CALCIO", abb:"CA"},
            {name:"FOSFORO",abb:"P"},
            {name:"MAGNESIO", abb:"MG"}
        ]
    },
    {
        name:"TIEMPOSDECOAGULACION(TPyTTP)",
        abb:null,
        labs:[
            {name:"TIEMPODEPROTROMBINA", abb:"TP"},
            {name:"TIEMPODETROMBOPLASTINAPARCIAL", abb:"TTP"},
            {name:"INR", abb:"INR"}
        ]
    }

    /*,
    //otros
    {name:"LIPASA",abb:"lipasa"},
    {name:"VANCOMICINA", abb:"vanco"},
    {name:"TACROLIMUS", abb:"tacro"}*/


];


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        let string="";
        for(let i=0;i<todo.length;i++){
            //eachlabpage
            let page=todo[i];
            let labpagename=page.name;
            let labpageabb=page.abb;
            if(labpageabb!=null){
                string=string+labpageabb+" ";
            }
            let labs=page.labs;
            for(let j=0;j<labs.length;j++){;
                string=string+getNameResult(labs[j],getTable(labpagename))+" ";
            }
        }
        console.log(string);
        texttoclipboard(string);
    }
);
function getTable(tablename){
    //la tablename está en un span
    let spans=document.getElementsByTagName("span");
    for(let i=0;i<spans.length;i++){
        let span=spans[i];
        if(span.innerHTML.toLowerCase().replace(/\s+/g, '')==tablename.toLowerCase().replace(/\s+/g, '')){
            //el elemento de arriba es una div
            let div=span.parentNode;
            table=span.nextSibling;
            //el primer table element de la div es la tabla
            return table;
        }
    }
    return -1;
}
function getNameResult(object,table) {
    let nameofvalue=object.name;
    let allspans=table.getElementsByTagName("span");
    let i;
    for(i=0;i<allspans.length;i++){
        let spanelement=allspans[i];
        let string=spanelement.innerHTML;
        let result;
        if(string.toLowerCase().replace(/\s+/g, '').replace(/[^a-zA-Z ]/g, "")===nameofvalue.toLowerCase().replace(/\s+/g, '').replace(/[^a-zA-Z ]/g, "")){
            let tr=spanelement.parentNode.parentNode.parentNode;
            let alltds=tr.getElementsByTagName("td");
            let spans=alltds[1].getElementsByTagName("span");
            for(let j=0;j<spans.length;j++){
                let span=spans[j];
                if(span.textContent.replace(/\s+/g, '').length<7){
                    result=span.textContent.replace(/\s+/g, '');
                    break;
                }
            }


            let nameresultpair=object.abb+" "+result;
            return nameresultpair;
        }
    }
    return "";
}


function sayhi(){
    getAllData();
}
function getAllData(){
    //id de la tabla

    var array="holita";

    //encontrar las  columnas que tienen la información del parametro y el valor

    //iterar por las columnas poniendo en el array el parámetro y el valor

    //parsear una string con ese array
    texttoclipboard(parseString(array));

    //copiar al clipboard esa string
}

function parseString(array){
    return array;
}
function texttoclipboard(text){
    document.addEventListener('copy', function(e){
        e.clipboardData.setData('text/plain', text);
        e.preventDefault(); // default behaviour is to copy any selected text
    });
    document.execCommand("copy");
    document.removeEventListener("copy");
}
