def incDay(dia, rot = False):
    lim = 6
    if rot == True:
        lim = 7
    dia += 1
    if dia > lim:
        return 0
    return dia

def genCalen (year = 2022):
    file_name = ''.join([str(year),'.csv'])

    data = open(file_name, "w")    

    if year % 4 == 0:
        days = 366
    else:
        days = 365

    dia_ini = [2021, 5]

    for i in range(year - dia_ini[0]):
        if i % 4 == 0 and i != 0:
            dia_ini[1] = incDay(dia_ini[1])
        dia_ini[1] = incDay(dia_ini[1])
    

    meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    dias = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
    tios = ['Toña', 'Dulce', 'Chela', 'Andrés', 'Elías', 'Goyo', 'Betty', 'Paty'] # 17 julio

    r = 0
    ind = 1
    nom_sem = dia_ini[1]
    for m in range(12):
        if m <= 6:
            if m % 2 == 0:
                mes_long = 31
            else:
                if m == 1 and days == 365:
                    mes_long = 28
                elif m == 1 and days == 366:
                    mes_long = 29
                else:
                    mes_long = 30
            for d in range(mes_long):
                if ind < 198:
                    data.write(','.join([dias[nom_sem],str(d+1),meses[m],'','\n']))
                    nom_sem = incDay(nom_sem)
                else:
                    data.write(','.join([dias[nom_sem],str(d+1),meses[m],tios[r],'\n']))
                    nom_sem = incDay(nom_sem)
                    r = incDay(r,True)
                ind += 1
        else:
            if m % 2 == 0:
                mes_long = 30
            else:
                mes_long = 31
            for d in range(mes_long):
                if ind < 198:
                    data.write(','.join([dias[nom_sem],str(d+1),meses[m],'','\n']))
                    nom_sem = incDay(nom_sem)
                else:
                    data.write(','.join([dias[nom_sem],str(d+1),meses[m],tios[r],'\n']))
                    nom_sem = incDay(nom_sem)
                    r = incDay(r,True)
                ind += 1
    
    data.close()

if __name__ == '__main__':
    genCalen()