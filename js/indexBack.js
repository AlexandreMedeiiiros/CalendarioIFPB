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
    let separador = ":";
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


// 25/02:Carnaval
// 09/03:Emancipação Política de Picuí-PB
// 10/04:Sexta-Feira Santa
// 21/04:Tiradentes
// 01/05:Dia do Trabalhador
// 11/06:Dia de Corpus christi
// 24/06:Dia de São João
// 29/06:Dias de São Pedro
// 05/08:Fundação da Paraiba
// 07/09:Independencia do Brasil
// 12/10:Padroeira do Brasil
// 02/11:Finados
// 15/11:Proclamação da Repuplica
// 25/12:Natal

// 11/07:21

// 15/02/2020:Sabado Letivo
// 24/02/2020:Ponto Facultativo
// 26/02/2020:Ponto Facultativo
// 21/03/2020:Sabado Letivo
// 25/04/2020:Sabado Letivo
// 16/05/2020:Sabado Letivo
// 20/06/2020:Sabado Letivo
// 29/08/2020:Sabado Letivo
// 28/10/2020:Ponto Facultativo

// tem mais modificações:
// - as cores pintadas no calendário ficam iguais ao do calendário oficial mesmo - yes
// - separador das férias é ":" e não "-", para manter o padrão - yes
// - domingo e sábado ficam de outra cor - yes
// - colocar a contagem de dias letivos - yes
// - o início e fim do bimestre é automático: cada bimestre tem 50 dias, excluídos fins de semana e feriados - not