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

                //$span = $('<span/>').attr('title', counter);
                $col = $('<td/>').attr('title', counter).attr('data-x',i).attr('data-y', a);
               // $col.append($span).addClass('test').attr('data-x',a).attr('data-y', i);
                $row.append($col);

            }

            table.append($row).addClass('conwayGrid');
        }
    }

    makeGrid('#conwayWrap', 20, 20);

    function findNeighbour(elem, grid){

        // X- und Y-Koordinaten aktuelles Element
        var thisX = parseInt(elem.attr('data-x'));
        var thisY = parseInt(elem.attr('data-y'));

        // Nachbar rechts, links
        var nbR = elem.next();
        var nbL = elem.prev();

        // Nachbar Top, TopLeft, TopRight
        var nbT = $(grid).find('TD.alive[data-y="' + (thisY - 1) +'"][data-x="' + thisX  + '"]');
        var nbTL = $(grid).find('TD.alive[data-y="' + (thisY - 1) +'"][data-x="' + (thisX - 1)  + '"]');
        var nbTR = $(grid).find('TD.alive[data-y="' + (thisY - 1) +'"][data-x="' + (thisX + 1)  + '"]');

        // Nachbar Bottom, BottomLeft, BottomRight
        var nbB = $(grid).find('TD.alive[data-y="' + (thisY + 1) +'"][data-x="' + thisX  + '"]');
        var nbBL = $(grid).find('TD.alive[data-y="' + (thisY + 1) +'"][data-x="' + (thisX - 1)  + '"]');
        var nbBR = $(grid).find('TD.alive[data-y="' + (thisY + 1) +'"][data-x="' + (thisX + 1)  + '"]');

        // In Object übergeben
        var neighbours = {
            left:  nbL,
            right: nbR,
            top: nbT,
            topLeft: nbTL,
            topRight: nbTR,
            bottom: nbB,
            bottomLeft: nbBL,
            bottomRight: nbBR,
        }

        console.log(nbT.length)

        // Anzahl der Nachbarn aus Object auslesen
        var neighboursKeys = $.map(neighbours, function(value, key){
           return key;
        });
        var neighbourCount = neighboursKeys.length;

        return neighbourCount;

    }

    $('#conwayWrap TD').on('click', function(){

        $(this).toggleClass('alive');

        var neighbourAnz = findNeighbour($(this), '.conwayGrid');

        console.log(neighbourAnz);

    })


});