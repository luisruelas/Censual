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
            {name:"MAGNESIO", abb:"MG"},
            {name:"PROTEINACREACTIVAULTRASENSIBLE", abb:"PCR"}
        ]
    },
    {
        name:"Pruebassinagrupar",
        abb:null,
        labs:[
            {name:"TROPONINAIALTASENSIBILIDAD", abb:"TROPIS"},
            {name:"PEPTIDONATRIURETICOCEREBRAL", abb:"BNP"}
        ]
    },
    {
        name:"Pruebassinagrupar",
        abb:null,
        labs:[
            {name:"AMILASATOTAL", abb:"AMILASA"},
            {name:"LIPASA", abb:"LIPASA"},
            {name:"AMILASAPANCREATICA", abb:"AMILASA PAN"}
        ]
    },
    {
        name:"Pruebassinagrupar",
        abb:null,
        labs:[
            {name:"VANCOMICINA", abb:"VANCO"},
            {name:"TACROLIMUS", abb:"TACRO"}
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
    },
    {
        name:"GASOMETRÍAARTERIAL",
        abb:"GASA",
        labs:[
            {name:"PH", abb:"PH"},
            {name:"PO2", abb:"PO2"},
            {name:"PCO2", abb:"PCO2"},
            {name:"ANIONGAP", abb:"AG"},
            {name:"BICARBONATO", abb:"HCO3"},
            {name:"LACTATO", abb:"LAC"},
            {name:"CREATININA", abb:"CREAT"},
            {name:"SATURACIONDEO2", abb:"SAT"}
        ]
    },
    {
        name:"GASOMETRÍAVENOSA",
        abb:"GASV",
        labs:[
            {name:"PH", abb:"PH"},
            {name:"PO2", abb:"PO2"},
            {name:"PCO2", abb:"PCO2"},
            {name:"ANIONGAP", abb:"AG"},
            {name:"BICARBONATO", abb:"HCO3"},
            {name:"LACTATO", abb:"LAC"},
            {name:"CREATININA", abb:"CREAT"},
            {name:"SATURACIONDEO2", abb:"SAT"}
        ]
    },
    {
        name:"PERFILTIROIDEO",
        abb:null,
        labs:[
            {name:"T4LIBRE", abb:"T4L"},
            {name:"T4TOTAL",abb:"T4T"},
            {name:"T3TOTAL", abb:"T3T"},
            {name:"HORMONAESTIMULANTEDETIROIDES", abb:"TSH"},
            {name:"TIROGLOBULINA", abb:"TIROGLOB"}
        ]
    }
];


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        let string="";
        for(let i=0;i<todo.length;i++){
            //eachlabpage
            let page=todo[i];
            let labpagename=page.name;
            let labpageabb=page.abb;
            let tables=getTables(labpagename);
            if(labpageabb!=null && tables!=null){
                string=string+labpageabb+" ";
            }
            let labs=page.labs;
            for(let j=0;j<labs.length;j++){
                if(getTables(labpagename)!=null){
                    if(tables.length>1){
                        for(let k=0;k<tables.length;k++){
                            string=string+getNameResult(labs[j],tables[k])+" ";
                        }
                    }
                    else{
                        string=string+getNameResult(labs[j],tables[0])+" ";
                    }
                }

            }
        }
        console.log(string);
        texttoclipboard(string);
    }
);
function getTables(tablename){
    //la tablename está en un span
    let tables=new Array();
    let spans=document.getElementsByTagName("span");
    for(let i=0;i<spans.length;i++){
        let span=spans[i];
        if(span.innerHTML.toLowerCase().replace(/\s+/g, '')==tablename.toLowerCase().replace(/\s+/g, '')){
            //el elemento de arriba es una div
            let div=span.parentNode;
            table=span.nextSibling;
            //el primer table element de la div es la tabla
            console.log("pushing table"+tablename);
            tables.push(table);
        }
    }
    if(tables.length==0){
        return null;
    }
    return tables;
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
