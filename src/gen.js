'use strict';

function adjustInd(i, rot = false){
    let lim = 6;
    if (rot === true){
        lim = 5;
    }
    i++;
    if (i > lim){
        return 0;
    }
    return i;
}

function calcFirst(year){
    // Default data
    let dia_ini = [2021, 5];

    for(let i = 0; i < year - dia_ini[0]; i++){
        if (i % 4 === 0 && i != 0){
            dia_ini[1] = adjustInd(dia_ini[1]);
        }
        dia_ini[1] = adjustInd(dia_ini[1]);
    }

    return dia_ini[1]
}

function addData(mes_l, nom_s, r, ind){
    const tios = ['Toña', 'Dulce', 'Elías', 'Goyo', 'Betty', 'Paty'];

    let inicio = 222; // change this to indicate the start of each uncle

    let data = [];

    for (let d = 1; d <= mes_l; d++){

        if (ind < inicio){
            data.push([dias[nom_s], d, '']);
            nom_s = adjustInd(nom_s);
        } else{
            switch(nom_s){
                case 3:
                    data.push([dias[nom_s], d, 'Chela']);
                    nom_s = adjustInd(nom_s);
                    break;
                case 4:
                    data.push([dias[nom_s], d, 'Andrés']);
                    nom_s = adjustInd(nom_s);
                    break;
                default:
                    data.push([dias[nom_s], d, tios[r]]);
                    nom_s = adjustInd(nom_s);
                    r = adjustInd(r, true);
            }
        }
        ind++;
    }
    return [nom_s, r, ind, data]
}

function genCalen(year = 2022){
    let r = 0;
    let ind = 1;
    let data = {};
    let days = 1;

    if (year % 4 === 0){
        days = 366;
    } else {
        days = 365;
    }

    let nom_sem = calcFirst(year);
    let mes_long = 1;
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
            ret = addData(mes_long, nom_sem, r, ind);
            nom_sem = ret[0];
            r = ret[1];
            ind = ret[2];
            data[meses[m]] = ret[3];
        } else{
            if (m % 2 === 0){
                mes_long = 30;
            } else{
                mes_long = 31;
            }
            ret = addData(mes_long, nom_sem, r, ind);
            nom_sem = ret[0];
            r = ret[1];
            ind = ret[2];
            data[meses[m]] = ret[3];
        }
    }

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

function repres(){
    const req_doc = document.getElementById("request");
    let mes_doc = document.getElementById("mes-struct")
    let reque = req_doc.value.toTitleCase();
    let d_void = 42 - datos[reque].length
    let res = 0;

    mes_doc.innerHTML = '';

    if (meses.includes(reque) === true){
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
    } else {
        alert("Nombre del mes no válido, verifique que esté bien escrito. \n\nNota: No importan las mayúsculas y minúsculas.");
    }
}

/*////////////////////////////////////////// Main //////////////////////////////////////////*/

const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const dias = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

let datos= {};

datos = genCalen();
