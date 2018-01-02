$(document).ready(function(){

	// When size is submitted by the user
	$('#sizePicker').children().last().on('click', function(e){
		e.preventDefault();//prevent the page reload
		clearGrid();
		makeGrid();
		assignColor();
	});

	// Function making the grid from user's input of the number of rows and columns
	function makeGrid() {
		// Select size input
		const selectRow = $('#input_height').val();
		const selectCol = $('#input_width').val();
		// Create the grid
		for(let row = 0; row < selectRow; row++){
			$('#pixel_canvas').append('<tr></tr>');
			for(let col = 0; col < selectCol; col++){
				$('tr:last').append('<td></td>');
			};
		};
	};

	// Clear the grid
	function clearGrid(){
		$('#pixel_canvas').children().remove();
	};

	// Create function to assign color to the canvas
	function assignColor(){
		$('td').on('click', function(){
			// Select color input
			const selectColor = $('#colorPicker').val();
			// Assign the selected color to the canvas
			$(this).css('background', selectColor);
		});
	};
});
