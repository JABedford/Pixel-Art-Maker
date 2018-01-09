// Variable declaration
const canvasCtl = $('#pixel_canvas');
var canvasWidth = 10;
var canvasHeight = 10;

var isMouseDown = false;
var isEraseSelected = false;

var tdNo = 0;
var styleNo = 0;

var undoRedoManager = [];



$(document).ready(makeGrid());


/*****************
*   Functions    *
*****************/

// Define the amount of pixels on the canvas
function makeGrid() {
    $('tr').remove();
    for (var h = 0; h < canvasHeight; h++) {
        var row = '<tr>'
        for (var w = 0; w < canvasWidth; w++) {
            tdNo++;
            row += '<td id="td' + tdNo + '"></td>'
        }
        row += '</tr>'

        canvasCtl.append(row);
    }
}

// Draw the cell with adding style for it.
function draw(current_td) {
    var tdCurrentColor = $('#' + current_td).css('background-color')
    var tdColor = isEraseSelected ? '#fff' : $('#colorPicker').val();

    $('.hidden').css('background-color', tdColor);

    if (!(tdCurrentColor === $('.hidden').css('background-color'))) {
        clearUndoRedoManager();
      $('#undo').removeAttr('disabled');
        styleNo++;
        var styleId = styleNo;
        $("<style id='" + styleId + "' type='text/css'> #" + current_td + "{ background-color: " + tdColor + ";}</style>").appendTo("head");
    }
    lastStyleId = styleId;

    //current_td.css('background-color', tdColor);
}

function clearUndoRedoManager() {
    undoRedoManager = [];
    $('#redo').attr('disabled', 'disabled');
    $('#undo').attr('disabled', 'disabled');
}

/******************
* Event Listeners *
*******************/

// Sumbit button after user input.
$('#submit').click(function () {
    canvasWidth = $('#input_width').val();
    canvasHeight = $('#input_height').val();
    makeGrid();

  for(var i = 0; i < styleNo; i++) {
    $('#' + i).remove();
  }
  styleNo = 0;
    clearUndoRedoManager();
});

// Draw the color by clicking the cell
canvasCtl.on('mousedown', 'td', function () {
    draw($(this).attr('id'));
    isMouseDown = true;
});

// Draw the color while moving over the cells with pressing the mouse.
canvasCtl.on('mousemove', 'td', function () {
    if (isMouseDown) {
        draw($(this).attr('id'));
    }
});

// Set the flag that will be using to stroke the drawing.
$(document).mouseup(function () {
    isMouseDown = false;
});

$('#erase').click(function () {
    $(this).toggleClass('selected');
    isEraseSelected = $(this).hasClass('selected');
});

$('#redo').click(function () {
    if (undoRedoManager.length > 0) {
        var lastStyle = undoRedoManager.pop();
        $(lastStyle).appendTo("head");
        styleNo++;
        $('#undo').removeAttr('disabled');
    }

    if (undoRedoManager.length === 0) {
        $('#redo').attr('disabled', 'disabled');
    }
});

$('#undo').click(function () {
    if (styleNo > 0) {
        var lastStyle = $('#' + styleNo).remove();
        styleNo--;
        undoRedoManager.push(lastStyle);
        $('#redo').removeAttr('disabled');
    }

    if (styleNo === 0) {
        $('#undo').attr('disabled', 'disabled');
    }
});

