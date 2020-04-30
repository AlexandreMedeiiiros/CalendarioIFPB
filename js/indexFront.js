import * as calend from "./indexBack.js";

window.onload = function(){
    var divCalendFull = document.getElementById("calendario");

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
            divCalendFull.removeChild(calendarioFull);
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

        divCalendFull.appendChild(criaCalendario(calendPeriodo, feriados, ferias, eventos));
    }
}

function criaCalendario(calendPeriodo, feriados, ferias, eventos){
    var nomeMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                     "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    var diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

    let divCalend = document.createElement('div');
    divCalend.className = "col";
    divCalend.id = "calendarioFull"

    let calendario = document.createElement('div');
    calendario.className = "container-fluid";
    divCalend.appendChild(calendario);
    

    var ano = calendPeriodo.anoComeca;
    var mes = calendPeriodo.mesComeca - 1;
    var ano_f = calendPeriodo.anoTermina;
    var mes_f = ano == ano_f ? calendPeriodo.mesTermina - 1: 11;

    let qntFerias;
    while(ano <= ano_f && mes <= mes_f){
        let mesMatriz = calend.criaMes({ano: ano, mes: mes});

        let divPrin = document.createElement('div');
        divPrin.className = "row aling-items-center";
        calendario.appendChild(divPrin);

        let divMes = document.createElement('div');
        divMes.className = "col-auto";

        let divInfos = document.createElement('div');
        divInfos.className = "col-auto";

        divPrin.appendChild(divMes);
        divPrin.appendChild(divInfos);


        let mesCalend = document.createElement('table');        
        mesCalend.style.textAlign = "center";
        mesCalend.className = "table";
        divMes.appendChild(mesCalend);

        let mesEventosLista = document.createElement('ul');
        mesEventosLista.className = "list-group"
        divInfos.appendChild(mesEventosLista);

        let cabecalhoListaEventos = document.createElement("li");
        cabecalhoListaEventos.className = "list-group-item disable";
        cabecalhoListaEventos.textContent = "Eventos";
        mesEventosLista.appendChild(cabecalhoListaEventos);


        let capNomeMes = document.createElement('caption');
        capNomeMes.style.captionSide = "top";
        capNomeMes.textContent = nomeMeses[mes] + "/" + ano;
        mesCalend.appendChild(capNomeMes);

        let trNomeSemana = document.createElement('tr');
        for(let j = 0; j < diasSemana.length; j++){
            let thNomeSemana = document.createElement('th');
            thNomeSemana.style.padding = "5px"
            thNomeSemana.textContent = diasSemana[j];
            trNomeSemana.append(thNomeSemana);
        }
        mesCalend.appendChild(trNomeSemana);

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

                    //Feriados
                    let feriadosObj = calend.criaFeriadosObj(feriados.split('\n'));
                    for(let f of feriadosObj){
                        let mesFeriado = f.data.slice(3, 5);
                        let diaFeriado = f.data.slice(0, 2);
                        
                        
                        if(mes == mesFeriado - 1 && diaFeriado == dia){
                            mesEventosLista.appendChild(eventosLista(f.data.slice(0, 5), f.nome));
                            diaCalend.style.backgroundColor = '#89D5C9';
                        }
                    }
                    //Eevntos
                    let eventosObj = calend.criaFeriadosObj(eventos.split("\n"));
                    for(let e of eventosObj){
                        let mesEvento = e.data.slice(3, 5);
                        let diaEvento = e.data.slice(0, 2);
                        
                        
                        if(mes == mesEvento - 1 && diaEvento == dia){
                            mesEventosLista.appendChild(eventosLista(e.data.slice(0, 5), e.nome));
                            diaCalend.style.backgroundColor = '#FF8357';
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
                            diaCalend.style.backgroundColor = '#ADC865';
                        }else if(contFerias == qntFerias){
                            mesEventosLista.appendChild(eventosLista((dia-1)+"/0"+(mes+1), "fim das ferias"));
                            qntFerias = undefined;
                        }
                    }
                    



                    diaCalend.textContent = dia;
                }

                semanaCalend.appendChild(diaCalend);  
            }

            mesCalend.appendChild(semanaCalend); 
        }

        if(mes == 11){
            ano++;
            mes = 0;
            mes_f = calendPeriodo.mesTermina - 1;
        }else{
            mes++;
        }
    }
    return calendario;
}



function eventosLista(data, nome) {
    let diaEspecialLi = document.createElement('li');
    diaEspecialLi.className = "list-group-item"
    
    diaEspecialLi.textContent = data + " " + nome;;

    return diaEspecialLi;

}