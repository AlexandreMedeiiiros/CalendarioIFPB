export function criaMes(data) {
    // [[00,00,00,01,02,03,04],
    //  [05,06,07,08,09,10,11],
    //  [12,13,14,15,16,17,18],
    //  [20,21,22,23,24,25,26],
    //  [27,28,29,30,00,00,00]]
    let calendario = []
    let semana = []
    for (let i = 1;i <= 31; i++){
        let dia = new Date(data.ano, data.mes, i);
        
        let diaMes = (dia.getDate()+"").length == 1 ? "0" + dia.getDate() : dia.getDate();
         if (diaMes != i){
            break
        }      
        if (dia.getDay() != 0 && diaMes == 1){
            for(let i = 1; i <= dia.getDay(); i++){
                semana.push(0);
            }
            semana.push(diaMes);
        }else{
            semana.push(diaMes);
        }

        if (semana.length == 7){
            calendario.push(semana);
            semana = [];
        }
    }
    if (semana.length != 0){
        let falta = 7 - semana.length;
        for(let i = 0; i < falta; i++){
            semana.push(0);
        }
        calendario.push(semana);
    }
    
    return calendario; 
}

export function criaFeriadosObj(feriados){
    let separador = ":";
    let feriadosObj = [];
    for(let i of feriados){
        let feriado = i.split(separador);
        let feriadoObj = {
            data: feriado[0],
            nome: feriado[1]
        }

        feriadosObj.push(feriadoObj);
    }
    

    return feriadosObj;
}


export function criaFeriasObj(ferias) {
    let separador = "-";
    let feriasObj = [];
    for(let i of ferias){
        let feriasLista = i.split(separador);
        let fObj = {
            data: feriasLista[0],
            periodoDias: feriasLista[1]
        }

        feriasObj.push(fObj)
    }

    return feriasObj;
}


// 10/04/2020:Paixão de cristo
// 12/04/2020:Pascoa
// 21/04/2020:Dia de Tiradentes
// 01/05/2020:Dia do Trabalho
// 10/05/2020:Dia das maes
// 09/07/2020:Dia dos pais

// 15/06/2020-15

// 06/07/2020:São joao federal
// 07/07/2020:São joao federal

// function criaCalendario(ano=new Date().getFullYear(), periodoDeAulas) {
//     var calendario = document.createElement('table');
//     var meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
//                  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
//     calendario.style="width:100%";

//     for (let mes = 0; mes < 12; mes++){
//         if (mes == 0 || mes%3 == 0){
//             var trCalendario = document.createElement("tr");
//             var trNomeMes = document.createElement("tr");
//         }
//         let tdCalendario = document.createElement("td");
//         let tdNomeMes = document.createElement("td");
//         tdNomeMes.textContent=meses[mes];
//         trNomeMes.appendChild(tdNomeMes);

//         //Cria Mes do calendario
//         let calendarioMes = document.createElement("table");
//         calendarioMes.border = "2";
//         let cabecalho = document.createElement('tr');

//         let diasSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"];
//         for(let j = 0;j < diasSemana.length; j++){
//             let tdDiaSemana = document.createElement("td");
//             tdDiaSemana.textContent = diasSemana[j]
//             cabecalho.appendChild(tdDiaSemana);
//         }
//         calendarioMes.appendChild(cabecalho);

//         for(let u = 1; u <= 31; u++){
//             let dia = new Date(ano, mes, u);
//             if (dia.getDate() != u){
//                 break;
//             }
//             if (dia.getDay() == 0 && dia.getDate() == 1){
//                 var tr2 = document.createElement('tr');
//                 var td = document.createElement("td");
//                 td.textContent = dia.getDate();
//                 tr2.appendChild(td);
//             }else if (dia.getDay() != 0 && dia.getDate() == 1){
//                 var tr2 = document.createElement('tr');
//                 for(let i = 1; i <= dia.getDay(); i++){
//                     let td = document.createElement("td");
//                     td.textContent = " ";
//                     tr2.appendChild(td);
//                 }
//                 var td = document.createElement("td");
//                 td.textContent = dia.getDate();
//                 tr2.appendChild(td);
//             }else if (dia.getDay() == 0){
//                 var tr2 = document.createElement('tr');
//                 var td = document.createElement("td");
//                 td.textContent = dia.getDate();
//                 tr2.appendChild(td);
//             }else{
//                 var td = document.createElement("td");
//                 td.textContent = dia.getDate();
//                 tr2.appendChild(td);
//             }
//             //definindo a cor do dia dependendo se tem aula ou nao
//             if (mes >= periodoDeAulas.mesComeca - 1 && mes <= periodoDeAulas.mesTermina - 1){
//                 if ((mes == periodoDeAulas.mesComeca - 1 && u < periodoDeAulas.diaComeca) || (mes == periodoDeAulas.mesTermina - 1 && u > periodoDeAulas.diaTermina)){
//                     td.style.backgroundColor = 'green';
//                 }else{
//                     td.style.backgroundColor = 'blue';
//                 }
                
//             }else{
//                 td.style.backgroundColor = 'green';
//             }
//             calendarioMes.appendChild(tr2);  
//         }
//         //terminou
        
//         tdCalendario.appendChild(calendarioMes);
//         trCalendario.appendChild(tdCalendario)
        
//         calendario.appendChild(trNomeMes);
//         calendario.appendChild(trCalendario);
//     }



//     return calendario;
// }