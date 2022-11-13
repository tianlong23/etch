//create a grid based on input (not at first just 16x16) of div squares
//use for loops to create X number of rows with X divs inside of them. 

//create function
//function recieves an input of the size of the grid
//function has nested for loops inside
    //main for loop produces the divs for the rows
        //append the div to the container or previous row div
    //nested for loop produces the divs for the columns
        //append the div to the previous column div


//how to get the value to update based on the slider input and be provided to the create grid function  


//create slider for user to provide an input, max value should be 100
//slider sets the input value for the grid
//input value is set in the place of the "i<x" for x and then populates the grid





const grid = document.getElementById('grid');
var gridEntry = grid.getElementsByClassName('col');
var isToggling = false;


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

var inputValue = document.getElementById('myRange')
inputValue.addEventListener('click', function () {
        removeGrid();
        console.log(inputValue.value)
        input = inputValue.value;
        createNewGrid(input);
        start();
    });

const reset = document.getElementById('resetButton');
reset.addEventListener('click', function () {
    removeGrid();
    input = inputValue.value;
    createNewGrid(input);
    start();
})

function removeGrid() {
   
    rowDiv = document.getElementsByClassName('row');
    var tl = rowDiv.length - 1;
    for (var t = 0; t<=tl; t++) {
        grid.removeChild(rowDiv[0]);
    };
};

function enableToggleRandom(e) {
    console.log('enable toggle Random');
    isToggling = true;
    if (e.target !== grid) {
        toggleRandom(e);
    };
};

function enableToggle (e) {
    console.log('enable toggle');
    isToggling = true;
    if (e.target !== grid) {
        toggle(e);
    };
};

function disableToggle () {
    console.log('disable toggle')
    isToggling = false;
};


function toggle(e) {
    if (isToggling === false) {
        return;
    };
    var color = document.getElementById('colorPicker');
    colorVal = color.value;
    console.log('toggle', e.target);
    e.target.style.backgroundColor = colorVal;
};

function inputColor () {
    
    const colorPicker = document.getElementById('colorPicker');
    colorPicker.addEventListener('click', function() {
        console.log('click input')
        start();
    })
}

inputColor();

eraser();

function eraser() {
    const eraserContainer = document.getElementById('eraserButton');
    eraserContainer.addEventListener('click', function () {
        document.getElementById('colorPicker').value = '#ffffff';
        start();
    });
}

random();

function random() {
    const randomButton = document.getElementById('randomColor');
    randomButton.addEventListener('click', function () {
        startRandom();
    });

}

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

function startRandom() {
    
    grid.onmousedown = enableToggleRandom;
    for (var x = 0; x < gridEntry.length; x++) {
        gridEntry[x].addEventListener('mouseenter', toggleRandom, false);
    }
    grid.onmouseup = disableToggle;
    
}

function increaseOpacity () {
    var opacity = document.getElementById('opacity');
    opacity.addEventListener('click', function() {
        startOpacity();
    })
}

increaseOpacity();

function enableToggleOpacity(e) {
    console.log('enable toggle Opacity');
    isToggling = true;
    if (e.target !== grid) {
        toggleOpacity(e);
    };
};


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
    console.log('r' + r)
    console.log('g' + g)
    console.log('b' + b)
    r = r-25.5;
    g = g-25.5;
    b = b-25.5;
    console.log('r' + r)
    console.log('g' + g)
    console.log('b' + b)

    //need to grab the r, g, and b values and then put them into the variables, add some value to make them darker
    //then put the new values into the last line in this object
    e.target.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
    console.log(e.target.style.backgroundColor);
};

//Yes but you don't need to store them. 
//You do the sequence of mouse over div -> grab current divs rgb value -> add some r g and b to it
//So its always a bit darker (or lighter, you can set up both) than the current color.

function startOpacity() {
    
    grid.onmousedown = enableToggleOpacity;
    for (var x = 0; x < gridEntry.length; x++) {
        gridEntry[x].removeEventListener('mouseenter', toggleRandom, false)
        gridEntry[x].removeEventListener('mouseenter', toggle, false)
        gridEntry[x].addEventListener('mouseenter', toggleOpacity, false);
            /*console.log('target background color: ' + e.target.style.backgroundColor);
            var rgb = e.target.style.backgroundColor;
            console.log(rgb);
            //have it on mouse enter, for divs that already have color. 
            //need to figure out how to get it to do on mousedown and hover. 
            rgb = rgb.replace(/[^\d,]/g, '').split(',');
            console.log(rgb);
            r = rgb[0];
            console.log('r1: ' + r)
            g = rgb[1];
            b = rgb[2];
           
            console.log('r' + r)
            console.log('g' + g)
            console.log('b' + b)
            r = r-25.5;
            g = g-25.5;
            b = b-25.5;
            console.log('r' + r)
            console.log('g' + g)
            console.log('b' + b)
        
            //need to grab the r, g, and b values and then put them into the variables, add some value to make them darker
            //then put the new values into the last line in this object
            e.target.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
            console.log(e.target.style.backgroundColor); */
        
        };
    }
    grid.onmouseup = disableToggle;
    


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

