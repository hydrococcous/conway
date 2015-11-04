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

    makeGrid('#conwayWrap', 4, 4);


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

        var neighbours = new Array();
        var tmp = new Array();

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

        console.log(neighbours.length);

    }


    $('#conwayWrap TD').on('click', function(){
        $(this).toggleClass('alive');
    });


    $('#start').on('click', function(){

        $('TD').each(function(){
            findLivingNeighbour($(this), '.conwayGrid');

        });

    })


});