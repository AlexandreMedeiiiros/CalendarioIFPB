import * as calend from "./indexBack.js";

window.onload = function(){
    var divCalendRow = document.getElementById("calendario");

    var comecoCalend = document.getElementById("comecoCalend");
    var fimCalend = document.getElementById("fimCalend");
    let feriadosTxta = document.getElementById("feriados");
    let feriasTxta = document.getElementById('ferias');
    let eventosTxta = document.getElementById('eventos');
    
    
    

    var btnEnviar = document.getElementById("btnEnviar");

    btnEnviar.onclick = function() {
        //exclui o calendario se ele ja exixstir
        let calendarioFull = document.getElementById('calendarioFull');
        if (calendarioFull){
            divCalendRow.removeChild(calendarioFull);
        }
        
        let dataComeca = comecoCalend.value.split('-');
        let dataTermina = fimCalend.value.split("-");       
        var calendPeriodo = {
            diaComeca: dataComeca[2],
            mesComeca: dataComeca[1],
            anoComeca: dataComeca[0],
            diaTermina: dataTermina[2],
            mesTermina: dataTermina[1],
            anoTermina: dataTermina[0]  
        }

        let feriados = feriadosTxta.value;
        let ferias = feriasTxta.value;
        let eventos = eventosTxta.value;

        divCalendRow.appendChild(criaCalendario(calendPeriodo, feriados, ferias, eventos));
    }
}

function criaCalendario(calendPeriodo, feriados, ferias, eventos){
    var nomeMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                     "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    var diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

    let divCalendCol = document.createElement('div');
    divCalendCol.className = "col";
    divCalendCol.id = "calendarioFull"

    let calendario = document.createElement('div');
    calendario.className = "container-fluid";
    divCalendCol.appendChild(calendario);
    

    var ano = calendPeriodo.anoComeca;
    var mes = calendPeriodo.mesComeca - 1;
    var ano_f = calendPeriodo.anoTermina;
    var mes_f = ano == ano_f ? calendPeriodo.mesTermina - 1: 11;

    let qntFerias;
    let diasDeAula = 0;
    let contagemBimestre = 50;  
    while(ano <= ano_f && mes <= mes_f){
        let mesMatriz = calend.criaMes({ano: ano, mes: mes});

        let divPrin = document.createElement('div');
        divPrin.className = "row aling-items-center";
        calendario.appendChild(divPrin);

        let divMes = document.createElement('div');
        divMes.className = "col-auto";


        //--- div de informação do mes --------------->

        let divInfos = document.createElement('div');
        divInfos.className = "col-3";
        divInfos.style.paddingTop = "10px";

        let cabecalhoEventos = document.createElement("h6");
        cabecalhoEventos.innerText = "Eventos - ano " + ano;
        divInfos.appendChild(cabecalhoEventos);

        let mesEventosLista = document.createElement('ul');
        mesEventosLista.style.fontSize = "12px";
        divInfos.appendChild(mesEventosLista);

        let contagemDiasLetivos = document.createElement("h6");
        divInfos.appendChild(contagemDiasLetivos);
        //-------------------------------------------->

        divPrin.appendChild(divMes);
        divPrin.appendChild(divInfos);


        let mesCalend = document.createElement('table');        
        mesCalend.style.textAlign = "center";
        mesCalend.className = "table";
        divMes.appendChild(mesCalend);

        



        let capNomeMes = document.createElement('caption');
        capNomeMes.style.captionSide = "top";
        capNomeMes.textContent = nomeMeses[mes] + "/" + ano;
        mesCalend.appendChild(capNomeMes);

        let trNomeSemana = document.createElement('tr');
        for(let j = 0; j < diasSemana.length; j++){
            let thNomeSemana = document.createElement('th');
            thNomeSemana.style.padding = "5px"
            thNomeSemana.textContent = diasSemana[j];
            if(j == 0){
                thNomeSemana.style.color = "red";
            }
            trNomeSemana.append(thNomeSemana);
        }
        mesCalend.appendChild(trNomeSemana);

        let diasDeAulaPmes = 0;
        
        for(let i = 0; i < mesMatriz.length; i++){
            let semana = mesMatriz[i];
            let semanaCalend = document.createElement('tr');


            
            for(let j = 0; j < semana.length; j++){
                let dia = semana[j];
                let diaCalend = document.createElement('td');
                diaCalend.style.paddingTop = "2px"
                diaCalend.style.paddingBottom = "2px"

                if(dia == 0){
                    diaCalend.textContent = "  "

                }else{

                    //fiscal de feriado ---->
                    let ehFeriado = false;

                    if(j == 6){

                        //fiscal de feriado ---->
                        ehFeriado = true;                        
                    }else if(j == 0){
                        //pintando domingos e contando dias letivos
                        diaCalend.style.backgroundColor = '#D9D9D9';
                        diaCalend.style.color = "red";

                        //fiscal de feriado ---->
                        ehFeriado = true;
                    }

                    
                    

                    //Feriados
                    let feriadosObj = calend.criaFeriadosObj(feriados.split('\n'));
                    for(let f of feriadosObj){
                        let mesFeriado = f.data.slice(3, 5);
                        let diaFeriado = f.data.slice(0, 2);
                        
                        
                        if(mes == mesFeriado - 1 && diaFeriado == dia){
                            mesEventosLista.appendChild(eventosLista(f.data.slice(0, 5), f.nome));
                            diaCalend.style.backgroundColor = '#FF0000';

                            //fiscal de feriado ---->
                            ehFeriado = true;
                        }
                    }
                    //Eventos
                    let eventosObj = calend.criaFeriadosObj(eventos.split("\n"));
                    for(let e of eventosObj){
                        let mesEvento = e.data.slice(3, 5);
                        let diaEvento = e.data.slice(0, 2);
                        
                        
                        if(mes == mesEvento - 1 && diaEvento == dia){
                            mesEventosLista.appendChild(eventosLista(e.data.slice(0, 5), e.nome));
                            diaCalend.style.backgroundColor = '#FF8357';

                            //fiscal de feriado ---->
                            ehFeriado = true;

                            switch(e.nome){
                                case "Sabado Letivo":
                                    diaCalend.style.backgroundColor = '#FAC08F';

                                    //fiscal de feriado ---->
                                    ehFeriado = false;
                                    break
                                case "Ponto Facultativo":
                                    diaCalend.style.backgroundColor = '#FF00FF';
                                    break
                            }
                        }
                    }

                    //ferias
                    let feriasObj = calend.criaFeriasObj(ferias.split("\n"));
                    for(let f of feriasObj){
                        let mesFerias = f.data.slice(3, 5);
                        let diaFerias = f.data.slice(0, 2);

                        if(mes == mesFerias - 1 && diaFerias == dia){
                            qntFerias = f.periodoDias;
                            var contFerias = 0;
                            mesEventosLista.appendChild(eventosLista(f.data.slice(0, 5), "inicio das ferias"));
                        }
                    }

                    if(qntFerias){
                        if(contFerias < qntFerias){
                            contFerias++;
                            diaCalend.style.backgroundColor = '#FFFF00';

                            ehFeriado = true;
                        }else if(contFerias == qntFerias){
                            mesEventosLista.appendChild(eventosLista((dia-1)+"/0"+(mes+1), "fim das ferias"));
                            qntFerias = undefined;
                        }
                    }



                    //contando dias letivos
                    console.log(ehFeriado);
                    
                    if (!ehFeriado) {
                        if (calendPeriodo.mesComeca == calendPeriodo.mesTermina) {
                            if (dia >= calendPeriodo.diaComeca && dia <= calendPeriodo.diaTermina) {
                                diasDeAulaPmes += 1;
                            }
                        }else{
                            if(dia >= calendPeriodo.diaComeca && mes == calendPeriodo.mesComeca -1){
                                diasDeAulaPmes += 1;
                            }else if(mes > calendPeriodo.mesComeca -1 && mes != calendPeriodo.mesTermina -1){
                                diasDeAulaPmes += 1;
                            }else if(dia <= calendPeriodo.diaTermina && mes == calendPeriodo.mesTermina -1){
                                diasDeAulaPmes += 1;
                            }
                        }   
                    }



                    //Começo e fim de bimestres ___________

                    if (dia == calendPeriodo.diaComeca && mes == calendPeriodo.mesComeca -1) {   
                        diaCalend.style.backgroundColor = '#B2A1C7';                     
                        mesEventosLista.appendChild(eventosLista(dia, "Início do Ano Letivo 2020.1 – 1° Bimestre"));
                    }else if(diasDeAula + diasDeAulaPmes == contagemBimestre){
                        let bimestres = ["Fim do 1º Bimestre (50 dias letivos)", "Término do 2º bimestre (100 dias letivos)",
                                         "Término do 3º bimestre (150 dias letivos)", "Final do 4º Bimestre (200 dias letivos)"];
                        let i = 0;
                        switch(contagemBimestre){
                            case 100:
                                i = 1;
                                break
                            case 150:
                                i = 2;
                                break
                            case 200:
                                i = 3;
                                break
                        }

                        if(!(dia > calendPeriodo.diaTermina && mes == calendPeriodo.mesTermina -1)){
                            if(!(j == 0 || j == 6)){
                                diaCalend.style.backgroundColor = '#00B050';  
                                mesEventosLista.appendChild(eventosLista(dia, bimestres[i]));
                            }
                        }
                    }else if(diasDeAula + diasDeAulaPmes == contagemBimestre + 1){
                        let bimestres = ["Início do 2° Bimestre", "Início do 3º bimestre", "Início do 4° Bimestre"];
                        let i = 0;
                        switch(contagemBimestre){
                            case 100:
                                i = 1;
                                break
                            case 150:
                                i = 2;
                                break
                        }

                        
                        diaCalend.style.backgroundColor = '#B2A1C7'; 
                        mesEventosLista.appendChild(eventosLista(dia, bimestres[i]));
                        contagemBimestre += 50
                    }

                    

                    diaCalend.textContent = dia;

                }

                semanaCalend.appendChild(diaCalend);  
            }

            mesCalend.appendChild(semanaCalend); 
        }

        //contagem de dias de aula ---------------------------------------------------------------->
        diasDeAula += diasDeAulaPmes;
        contagemDiasLetivos.textContent = 'dias letivos: ' + diasDeAulaPmes + ' (' + diasDeAula + ')';

        //----------------------------------------------------------------------------------------->

        if(mes == 11){
            ano++;
            mes = 0;
            mes_f = calendPeriodo.mesTermina - 1;
        }else{
            mes++;
        }
    }
    return divCalendCol;
}



function eventosLista(data, nome) {
    let diaEspecialLi = document.createElement('li');
    
    diaEspecialLi.textContent = data + " - " + nome;;

    return diaEspecialLi;

}
