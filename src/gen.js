'use strict';

/*////////////////////////////////////////// Variables //////////////////////////////////////////*/

const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const dias = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
const hoy = new Date();
let [dia, mes, anio] = [hoy.getDate(), hoy.getMonth(), hoy.getFullYear()];
const yearDOM = document.getElementById("year");
let mem = 1991;

let datos= {};

/*////////////////////////////////////////// Functions //////////////////////////////////////////*/

/**
 * Modifies index by certain limit
 * @param {int} i 
 * @param {boolean} rot 
 * @returns 
 */
function adjustInd(i, rot){
    let lim = null;

    switch (rot) {
        case 'days':
            lim = 6;
            break;
        case 'uncles':
            lim = 5;
            break;
        case 'siblings':
            lim = 4;
            break;
        default:
            console.log('> Error at index control');
    }
    
    i++;
    if (i > lim){
        return 0;
    }
    return i;
}

function addData(mes_l, nom_s, r, ind, sib, year){
    const tios = ['Toña', 'Dulce', 'Elías', 'Goyo', 'Betty', 'Paty']; 
    const herm = ['(D)','(L)','(C)','(R)']; // Modify to ['(R)','(D)','(L)','(C)'] before 2017!!!!!!!!!!!!
    let data = [];
    let inicio = 222; // change this to indicate the start
    if (year != 2022){
        inicio = 0;
    }

    for (let d = 1; d <= mes_l; d++){
        switch(nom_s){
            case 3:
                data.push([dias[nom_s], d, 'Chela']);
                nom_s = adjustInd(nom_s, 'days');
                break;
            case 4:
                data.push([dias[nom_s], d, 'Andrés']);
                nom_s = adjustInd(nom_s, 'days');
                break;
            default:
                if (tios[r] == 'Toña'){
                    data.push([dias[nom_s], d, tios[r] + herm[sib]]);
                    console.log(sib);
                    sib = adjustInd(sib, 'siblings');
                    console.log(sib);
                } else {
                    data.push([dias[nom_s], d, tios[r]]);
                }
                nom_s = adjustInd(nom_s, 'days');
                r = adjustInd(r, 'uncles');
        }
        ind++;
    }
    return [nom_s, r, ind, data];
}

function calcFirstDay(year){
    let day_one = [2021, 5] // Referencia
    for (let i = 0; i < year - day_one[0]; i++){
        if (i % 4 === 0 && i != 0 ){
            day_one[1] = adjustInd(day_one[1], 'days');
        }
        day_one[1] = adjustInd(day_one[1], 'days');
    }
    return day_one[1];
}

/*
2023 0
2024 3
2025 1
2026 4
2027 0
2028 3
2029 1
2030 4
*/
function calcFirstSibling(y){
    switch(y){
    case 2024:
        return 3;
    case 2025:
        return 1;
    case 2026:
        return 4;
    case 2028:
        return 3;
    case 2029:
        return 1;
    case 2030:
        return 4;
    default:
        return 0;
    }
}

function genCalen(year){
    let r = calcFirstSibling(year);
    console.log(typeof r, r);
    let ind = 1;
    let data = {};
    let days = 1;
    let sib = 0;

    if (year % 4 === 0){
        days = 366;
    } else {
        days = 365;
    }

    let first_day = calcFirstDay(year);
    let mes_long = 0;
    let ret = [];

    for (let m = 0; m < 12; m++){
        if (m <= 6){
            if (m % 2 === 0){
                mes_long = 31;
            } else{
                if (m === 1 && days === 365){
                    mes_long = 28; 
                } else if (m === 1 && days === 366){
                    mes_long = 29;
                } else{
                    mes_long = 30;
                }
            }
        } else{
            if (m % 2 === 0){
                mes_long = 30;
            } else{
                mes_long = 31;
            }
        }
        ret = addData(mes_long, first_day, r, ind, sib, year);
        first_day = ret[0];
        r = ret[1];
        ind = ret[2];
        data[meses[m]] = ret[3];
    }
    mem = year;
    console.log('> Database updated', data)
    return data;
}

/*//////////////////////////////////////// Interfaz ////////////////////////////////////////*/

String.prototype.toTitleCase = function () {
    let cad = this.toLowerCase().split(' ')
    for (let i = 0; i < cad.length; i++){
        cad[i] = cad[i].charAt(0).toUpperCase() + cad[i].slice(1);
    }
    return cad.join(' ');
}

function insertDays(month){
    let nom_doc = document.getElementById("nombre");
    let mes_doc = document.getElementById("mes-struct")

    nom_doc.innerHTML = '<h2 class="nombreM">' + month + '</h2>';
    for (let i = 0; i < datos[month].length; i++){
        mes_doc.innerHTML += '<div class="dia">' + datos[month][i][1] + '<p>' + datos[month][i][2] + '</p></div>';
    }
}

function voidDays(days){
    let mes_doc = document.getElementById("mes-struct")
    
    for (let i = 1; i <= days; i++){
        mes_doc.innerHTML += '<div class="dia"></div>';
    }
}

function repres(consul = true){
    let mes_doc = document.getElementById("mes-struct")
    let reque = meses[mes];
    let res = 0;
    if (consul){
        const req_doc = document.getElementById("req");
        reque = meses[Number(req_doc.value.slice(5,7)) - 1];
        anio = Number(req_doc.value.slice(0,4));
        if (anio != mem){
            datos = genCalen(anio);
        }
    }

    mes_doc.innerHTML = '';

    let d_void = 42 - datos[reque].length;
    if (datos[reque][0][0] === 'Domingo'){
        insertDays(reque);
        voidDays(d_void);
    } else {
        switch (datos[reque][0][0]){
            case 'Lunes':
                res = 1;
                break;
            case 'Martes':
                res = 2;
                break;
            case 'Miercoles':
                res = 3;
                break;
            case 'Jueves':
                res = 4;
                break;
            case 'Viernes':
                res = 5;
                break;
            case 'Sabado':
                res = 6;
                break;
            default:
                console.log('Verifique los días de la semana.')
        }
        voidDays(res);
        insertDays(reque);
        voidDays(d_void-res);
    }

    yearDOM.innerHTML = "<h2>" + anio + "</h2>";

}

/*////////////////////////////////////////// Main //////////////////////////////////////////*/

datos = genCalen(anio);

repres(false);

window.addEventListener("keyup", function(event) {
    if (event.key === 'Enter'){
        repres();
    }
});