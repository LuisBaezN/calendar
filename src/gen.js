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

function addData(mes_l, nom_s, r, ind, year){
    const tios = ['Goyo', 'Paty', 'Toña', 'Dulce', 'Elías']; 
    let data = [];
    let inicio = 222; // change this to indicate the start
    if (year != 2022){
        inicio = 0;
    }

    for (let d = 1; d <= mes_l; d++){
        switch(nom_s){
            case 1:
                data.push([dias[nom_s], d, 'Betty']);
                nom_s = adjustInd(nom_s, 'days');
                break;
            case 3:
                data.push([dias[nom_s], d, 'Chela']);
                nom_s = adjustInd(nom_s, 'days');
                break;
            case 4:
                data.push([dias[nom_s], d, 'Andrés']);
                nom_s = adjustInd(nom_s, 'days');
                break;
            default:
                data.push([dias[nom_s], d, tios[r]]);
                nom_s = adjustInd(nom_s, 'days');
                r = adjustInd(r, 'uncles');
        }
        ind++;
    }
    return [nom_s, r, ind, data];
}

function calcFirstDay(year){
    let date_string = year + '-01-01T00:00:00';
    let date_obj = new Date(date_string);
    let first_week_day = date_obj.getDay();
    
    return first_week_day;
}

/*
2025 2
2026 0
2027 3
2028 2
2029 2
2030 0
2031 4
2032 2
2033 1
2034 0
2035 4
*/
function calcFirstSibling(y){
    switch(y){
    case 2024:
        return 3;
    case 2025:
        return 2;
    case 2027:
        return 3;
    case 2028:
        return 2;
    case 2029:
        return 2;
    case 2031:
        return 4;
    case 2032:
        return 2;
    case 2033:
        return 1;   
    case 2035:
        return 4;    
    case 2036:
        return 2;    
    default:
        return 0;
    }
}

function genCalen(year){
    let r = calcFirstSibling(year);
    let ind = 1;
    let data = {};
    let days = 1;

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
        ret = addData(mes_long, first_day, r, ind, year);
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