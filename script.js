//global variables for the grid, vells, and toggling
const grid = document.getElementById('grid');
var gridEntry = grid.getElementsByClassName('col');
var isToggling = false;

//function to create a new grid based on the slider input
function createNewGrid(input) {
    const grid = document.getElementById('grid');
    for(var i = 0; i < input; i++) {
        var rowDiv = document.createElement("div");
        rowDiv.className = 'row';
        for (var n = 0; n < input; n++) {
            var columnDiv = document.createElement("div");
            columnDiv.className = 'col';
            rowDiv.appendChild(columnDiv);
            columnDiv.style.backgroundColor = 'rgb(' + 255 + ',' + 255 + ',' + 255 + ')';
        }
        grid.appendChild(rowDiv);
    }
}

//create the first grid when the page is loaded
function createGrid () { 
    const grid = document.getElementById('grid');
    for(var i = 0; i < 16; i++) {
        var rowDiv = document.createElement("div");
        rowDiv.className = 'row';
        for (var j = 0; j < 16; j++) {
            var columnDiv = document.createElement("div");
            columnDiv.className = 'col';
            rowDiv.appendChild(columnDiv);
            columnDiv.style.backgroundColor = 'rgb(' + 255 + ',' + 255 + ',' + 255 + ')';
        }
        grid.appendChild(rowDiv);
    }
}

createGrid()

//grabs input from the slider, and inputs it into createNewGrid
var inputValue = document.getElementById('myRange')
inputValue.addEventListener('click', function () {
        removeGrid();
        console.log(inputValue.value)
        input = inputValue.value;
        createNewGrid(input);
        start();
    });

//clears the grid and creates a new grid based on the current input from the slider
const reset = document.getElementById('resetButton');
reset.addEventListener('click', function () {
    removeGrid();
    input = inputValue.value;
    createNewGrid(input);
    start();
})

//function to remove the grid
function removeGrid() {
   
    rowDiv = document.getElementsByClassName('row');
    var tl = rowDiv.length - 1;
    for (var t = 0; t<=tl; t++) {
        grid.removeChild(rowDiv[0]);
    };
};

//function that enable toggles for a single color, used specifically to note when the mouse button is clicked down
function enableToggle (e) {
    console.log('enable toggle');
    isToggling = true;
    if (e.target !== grid) {
        toggle(e);
    };
};

//function to disable toggle when the mouse button is not being held down anymore
function disableToggle () {
    console.log('disable toggle')
    isToggling = false;
};

//function that takes the input from the color selector, and applies it to the input for the mouseenter event
function toggle(e) {
    if (isToggling === false) {
        return;
    };
    var color = document.getElementById('colorPicker');
    colorVal = color.value;
    console.log('toggle', e.target);
    e.target.style.backgroundColor = colorVal;
};

//function to take the input from the color selector and update the input for the toggle function
function inputColor () {
    
    const colorPicker = document.getElementById('colorPicker');
    colorPicker.addEventListener('click', function() {
        console.log('click input')
        start();
    })
}

inputColor();

eraser();

//function that listens for a click on the eraser button, and then changes the input color to white
function eraser() {
    const eraserContainer = document.getElementById('eraserButton');
    eraserContainer.addEventListener('click', function () {
        document.getElementById('colorPicker').value = '#ffffff';
        start();
    });
}

random();

//function that listens for a click on the rainbow button and starts the random color function
function random() {
    const randomButton = document.getElementById('randomColor');
    randomButton.addEventListener('click', function () {
        startRandom();
    });

}

//function that turns on toggling for the random colors
function enableToggleRandom(e) {
    console.log('enable toggle Random');
    isToggling = true;
    if (e.target !== grid) {
        toggleRandom(e);
    };
};

//function that creates a new random color and applies it as the background color to cells based on mouseenter
function toggleRandom(e) {
    if (isToggling === false) {
        return;
    }
    console.log('toggleRandom');
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    console.log('toggle1', e.target);
    console.log('random color '+ randomColor);
    e.target.style.backgroundColor = "#" + randomColor;
}

//function that starts the random toggling by creating mouseover events
function startRandom() {
    
    grid.onmousedown = enableToggleRandom;
    for (var x = 0; x < gridEntry.length; x++) {
        gridEntry[x].addEventListener('mouseenter', toggleRandom, false);
    }
    grid.onmouseup = disableToggle;
    
}

//function that creates the increased opacity by creating mouseover events (shading)
function increaseOpacity () {
    var opacity = document.getElementById('opacity');
    opacity.addEventListener('click', function() {
        startOpacity();
    })
}

increaseOpacity();

//function that starts toggling for the opacity (shading)
function enableToggleOpacity(e) {
    console.log('enable toggle Opacity');
    isToggling = true;
    if (e.target !== grid) {
        toggleOpacity(e);
    };
};

//function that takes the existing background color, and makes it 10% darker each mouseover
function toggleOpacity(e) {
    if (isToggling === false) {
        return;
    }
    console.log('target background color: ' + e.target.style.backgroundColor);
    var rgb = e.target.style.backgroundColor;
    console.log(rgb);

    rgb = rgb.replace(/[^\d,]/g, '').split(',');
    console.log(rgb);
    r = rgb[0];
    g = rgb[1];
    b = rgb[2];
    r = r-25.5;
    g = g-25.5;
    b = b-25.5;
    e.target.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
    console.log(e.target.style.backgroundColor);
};

//function that removes the event listeners and therefore functions for the standard color input and random color
//and initiates the increased opacity (shading) functions
function startOpacity() {
    
    grid.onmousedown = enableToggleOpacity;
    for (var x = 0; x < gridEntry.length; x++) {
        gridEntry[x].removeEventListener('mouseenter', toggleRandom, false)
        gridEntry[x].removeEventListener('mouseenter', toggle, false)
        gridEntry[x].addEventListener('mouseenter', toggleOpacity, false);        
        };
    }
    grid.onmouseup = disableToggle;
    

//function that starts the mouseenter while the button is clicked feature by adding an event listener to mouseenter that only fires after mousedown. 
function start () {
    console.log('start function')
    grid.onmousedown = enableToggle;
    for (var x = 0; x < gridEntry.length; x++) {
        gridEntry[x].removeEventListener('mouseenter', toggleRandom, false)
        gridEntry[x].addEventListener('mouseenter', toggle, false);
    }
    grid.onmouseup = disableToggle;
}

start ();

