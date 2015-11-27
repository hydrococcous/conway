/*
 *
 * ### conway.js ###
 *
 * Author: Sandro Birke
 * v 0.1a - 03.11.2015
 *
 * */

$(document).ready(function(){

    /*
     *
     * makeGrid(container = Container für Tabelle (DOM element),
     *                  c = Anzahl Spalten (int),
     *                  r = Anzahl Zeilen (int))
     *
     * */

    function makeGrid(container, c, r){
        // Tabelle in Container erstellen
        $(container).append('<table/>');
        var table = $(container).children();

        // Zähler
        var counter = 0;

        for(var a = 0; a < r; a++){
            $row = $('<tr/>').attr('data-row', a);
            for(var i = 0; i < c; i++){
                counter++;
                $col = $('<td/>').attr('id', 'id_' + counter).attr('data-y',a).attr('data-x', i);
                $row.append($col);
            }

            table.append($row).addClass('conwayGrid');
        }
    }

    makeGrid('#conwayWrap', 50, 50);


    var neighboursObj = {};

    function findLivingNeighbour(elem, grid){

        // X- und Y-Koordinaten aktuelles Element
        var thisX = parseInt(elem.attr('data-x'));
        var thisY = parseInt(elem.attr('data-y'));

        /*
         * A B C
         * D X E
         * F G H
         *
         */

        var tmp = new Array();
        var neighbours = new Array();
        var tmpObj = {};

        tmp[0] = $(grid).find('TD.alive[data-y="' + thisY +'"][data-x="' + (thisX + 1)  + '"]'); // E
        tmp[1] = $(grid).find('TD.alive[data-y="' + thisY +'"][data-x="' + (thisX - 1)  + '"]'); // D
        tmp[2] = $(grid).find('TD.alive[data-y="' + (thisY - 1) +'"][data-x="' + thisX  + '"]'); // B
        tmp[3] = $(grid).find('TD.alive[data-y="' + (thisY - 1) +'"][data-x="' + (thisX - 1)  + '"]'); // A
        tmp[4] = $(grid).find('TD.alive[data-y="' + (thisY - 1) +'"][data-x="' + (thisX + 1)  + '"]'); // C
        tmp[5] = $(grid).find('TD.alive[data-y="' + (thisY + 1) +'"][data-x="' + thisX  + '"]'); // G
        tmp[6] = $(grid).find('TD.alive[data-y="' + (thisY + 1) +'"][data-x="' + (thisX - 1)  + '"]'); // F
        tmp[7] = $(grid).find('TD.alive[data-y="' + (thisY + 1) +'"][data-x="' + (thisX + 1)  + '"]'); // H


        for(var i = 0; i < tmp.length; i++){
            if(tmp[i].length > 0){
                neighbours.push(tmp[i].attr('id'))
            }
        }

        neighboursObj[elem.attr('id')] = neighbours;

    }



    $('#conwayWrap TD').on('mouseleave', function(){
        $(this).addClass('alive');
    });

    function call(){
        $('TD').each(function(){
            findLivingNeighbour($(this), '.conwayGrid');
        });
    }


    $('#start').on('click', function(){
        GameOfLife();
    });

    var t = null;
    function GameOfLife(){
        //alert('TEST');
        call();
        var neighboursStr = JSON.stringify(neighboursObj);
        for (var key in neighboursObj) {
            //console.log(key + ' Nachbarn: ' + neighboursObj[key].length);
            // ### Rules ###
            // Eine tote Zelle mit genau drei lebenden Nachbarn wird in der Folgegeneration neu geboren.
            if(neighboursObj[key].length == 3){
                $('#'+key).addClass('alive');
                $('#'+key).removeClass('die');
            }
            // Lebende Zellen mit weniger als zwei lebenden Nachbarn sterben in der Folgegeneration an Einsamkeit.
            else if(neighboursObj[key].length < 2){
                $('#'+key).removeClass('alive');
                $('#'+key).addClass('die');
            }
            //Eine lebende Zelle mit zwei oder drei lebenden Nachbarn bleibt in der Folgegeneration am Leben.
            else if(neighboursObj[key].length == 2 || neighboursObj[key].length == 3){
                // stay alive (au  alive prüfen)
                if($('#'+key).hasClass('alive')){
                    $('#'+key).addClass('alive');
                    $('#'+key).removeClass('die');
                }
            }
            // Lebende Zellen mit mehr als drei lebenden Nachbarn sterben in der Folgegeneration an Überbevölkerung.
            else if(neighboursObj[key].length > 3){
                $('#'+key).removeClass('alive');
                $('#'+key).addClass('die');
            }
        }

        t = window.setTimeout(GameOfLife, 200)
    }

});