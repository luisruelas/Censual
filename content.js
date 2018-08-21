var abreviaciones=[
            {name:"HEMOGLOBINA",abb:"HB"},
            {name:"HEMATOCRITO", abb:"HTO"},
            {name:"LEUCOCITOS", abb:"LEU"},
            {name:"NEUTROFILOS", abb:"NEU"},
            {name:"PLAQUETAS", abb:"PLAQ"},
            {name:"ALBUMINA",abb:"ALB"},
            {name:"BILIRRUBINATOTAL",abb:"BT"},
            {name:"BILIRRUBINADIRECTA",abb:"BD"},
            {name:"BILIRRUBINAINDIRECTA",abb:"BI"},
            {name:"ALANINOAMINOTRANSFERASAALT",abb:"ALT"},
            {name:"ASPARTATOAMINOTRANSFERASAAST",abb:"AST"},
            {name:"FOSFATASAALCALINA",abb:"FA"},
            {name:"PROTEINASTOTALESENSUERO",abb:"PT"},
            {name:"GLOBULINAS",abb:"GB"},
            {name:"GLUCOSA", abb:"GLU"},
            {name:"NITROGENOUREICO",abb:"BUN"},
            {name:"UREA", abb:"UREA"},
            {name:"CREATININA", abb:"CREAT"},
            {name:"SODIO", abb:"NA"},
            {name:"POTASIO",abb:"K"},
            {name:"CLORO", abb:"CL"},
            {name:"CALCIO", abb:"CA"},
            {name:"FOSFORO",abb:"P"},
            {name:"MAGNESIO", abb:"MG"},
            {name:"PROTEINACREACTIVAULTRASENSIBLE", abb:"PCR"},
            {name:"TROPONINAIALTASENSIBILIDAD", abb:"TROPIS"},
            {name:"PEPTIDONATRIURETICOCEREBRAL", abb:"BNP"},
            {name:"AMILASATOTAL", abb:"AMILASA"},
            {name:"LIPASA", abb:"LIPASA"},
            {name:"AMILASAPANCREATICA", abb:"AMILASA PAN"},
            {name:"VANCOMICINA", abb:"VANCO"},
            {name:"TACROLIMUS", abb:"TACRO"},
            {name:"TIEMPODEPROTROMBINA", abb:"TP"},
            {name:"TIEMPODETROMBOPLASTINAPARCIAL", abb:"TTP"},
            {name:"INR", abb:"INR"},
            {name:"PH", abb:"PH"},
            {name:"PO2", abb:"PO2"},
            {name:"PCO2", abb:"PCO2"},
            {name:"ANIONGAP", abb:"AG"},
            {name:"BICARBONATO", abb:"HCO3"},
            {name:"LACTATO", abb:"LAC"},
            {name:"CREATININA", abb:"CREAT"},
            {name:"SATURACIONDEO2", abb:"SAT"},
            {name:"PH", abb:"PH"},
            {name:"PO2", abb:"PO2"},
            {name:"PCO2", abb:"PCO2"},
            {name:"ANIONGAP", abb:"AG"},
            {name:"BICARBONATO", abb:"HCO3"},
            {name:"LACTATO", abb:"LAC"},
            {name:"CREATININA", abb:"CREAT"},
            {name:"SATURACIONDEO2", abb:"SAT"},
            {name:"T4LIBRE", abb:"T4L"},
            {name:"T4TOTAL",abb:"T4T"},
            {name:"T3TOTAL", abb:"T3T"},
            {name:"HORMONAESTIMULANTEDETIROIDES", abb:"TSH"},
            {name:"TIROGLOBULINA", abb:"TIROGLOB"},
            {name:"RELACION AST/ALT", abb:"AST/ALT"},
            {name:"RELACION ALBUMINA/GLOBULINA", abb:"ALB/GLOB"},
            {name:"COLESTEROL HDL", abb:"C-HDL"},
            {name:"COLESTEROL LDL (MEDIDO)", abb:"C-LDL (MEDIDO)"},
            {name:"VOLUMEN CORPUSCULAR MEDIO", abb:"VCM"},
            {name:"HEMOGLOBINA CORPUSCULAR MEDIA", abb:"HCM"},
            {name:"CONCENTRACION MEDIA DE HEMOGLOBINA", abb:"CMHC"},
            {name:"LINFOCITOS", abb:"LINF"},
            {name:"MONOCITOS", abb:"MONO"},
            {name:"EOSINOFILOS", abb:"EOS"},
            {name:"BASOFILOS", abb:"BASOF"},
            {name:"AMPLITUD DE DISTRIBUCION ERITROCITARIA", abb:"ADE"},
            {name:"ERITROCITOS", abb:"ERITROS"},
            {name:"VOLUMEN PLAQUETARIO MEDIO", abb:"VPM"},
            {name:"TESTIGO DE TTP", abb:"TEST-TTP"},
            {name:"MAGNESIO EN SANGRE", abb:"MG"},
            {name:"CREATININA EN SANGRE", abb:"CREAT"},
            {name:"ACIDO URICO", abb:"AU"},
            {name:"POTASIO EN SANGRE", abb:"K"},
            {name:"CELULAS EPITELIALES", abb:"CELULAS EPITELIALES"},
            {name:"BACTERIAS", abb:"BACT"},
             
            

            {name:"COLESTEROL TOTAL", abb:"CT"}
            
            
            
            
];



chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        texttoclipboard(parseText(getAllParams()));
    }
);



function getAllParams(){
	params=document.getElementsByTagName("custom:titulo");
    paramsarray=[];
    for(i=0;i<params.length;i++){
        paraminners=params[i].getElementsByTagName("*");
        for(j=0;j<paraminners.length;j++){
            if(paraminners[j].style.visibility!=="hidden"){
                parametro=paraminners[j].innerHTML;
                abreviaciones.forEach(
                    function(abb){
                        if(parametro.toLowerCase().replace(/[^a-z0-9]/gi,'')==abb.name.toLowerCase().replace(/[^a-z0-9]/gi,'')){
                            parametro=abb.abb;
                        }
                    }

                    );
                result=getResultsOnCell(params[i].parentNode.nextSibling);
                paramsarray.push(parametro+":"+result);
            }
        }
    }

    return (paramsarray)
}
function getResultsOnCell(cell){
    spans=cell.getElementsByTagName("span");
    for(var i=0; i<spans.length; i++){
        if(spans[i].id.indexOf("spanResultadosFinal")>0){
            if((index=spans[i].innerHTML.indexOf("-->"))>0){
                result=spans[i].innerHTML.substring(index+3,spans[i].innerHTML.length);
                return result;
            }
            return spans[i].innerHTML;
        }
    }
}

function parseText(array){
    stringbuffer="";
    array.forEach(function(pair){
    	arraypair=pair.split(":");
    	if(arraypair[1].replace(/[^a-z0-9]/gi,'').length>0){
    		stringbuffer+=arraypair[0]+": "+arraypair[1]+"; ";
    	}
    	
    });
    dots=stringbuffer.replace(/,/g, '.');
    return dots;
}

function texttoclipboard(text){
    document.addEventListener('copy', function(e){
        e.clipboardData.setData('text/plain', text);
        e.preventDefault(); // default behaviour is to copy any selected text
    });
    document.execCommand("copy");
    document.removeEventListener("copy");
}
