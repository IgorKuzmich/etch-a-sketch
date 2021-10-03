const grid = document.querySelector("#grid");
const clearBtn = document.querySelector("#clear");
const colorBtn = document.querySelector('#color');
const randomBtn = document.querySelector('#random');
const colorPicker = document.querySelector("input[type='color']");
const colorPickerLabel = document.querySelector("#colorPicker");
const range = document.querySelector("#range");
const rangeLabel = document.querySelector("#rangeValue");

let color = '#222831'
let random = false
let size = 16
let currentActive = colorBtn;

clearBtn.addEventListener('click', clearGrid);
colorPicker.addEventListener('input', chooseColor);
colorBtn.addEventListener('click', clickColorBtn);
randomBtn.addEventListener('click', clickRandomBtn);
range.addEventListener('input', updateRangeLabel);
range.addEventListener('change', changeSize);

function changeSize(e) {
    let val = e.target.value;
    size = val;
    fillGrid(size);
}

function updateRangeLabel(e) {
    let val = e.target.value;
    rangeLabel.innerText = val.toString() + " x " + val.toString();
}

function clickColorBtn() {
    random = false;
    currentActive.classList.toggle("active");
    currentActive = colorBtn;
    currentActive.classList.toggle("active");
}

function clickRandomBtn() {
    random = true;
    currentActive.classList.toggle("active");
    currentActive = randomBtn;
    currentActive.classList.toggle("active");
}

function fillGrid(sideLength) {
    removeAllChilder(grid);
    for(let i = 0; i < sideLength; i++) {
        let col = document.createElement('div');
        col.classList.add('grid-col')
        for(let j = 0; j < sideLength; j++){
            let div = document.createElement('div');
            div.classList.add("grid-item");
            div.addEventListener('mouseover', changeColor);
            col.appendChild(div);
        }
        grid.appendChild(col);
    }
}

function removeAllChilder(element) {
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }
}

function changeColor(e) {
    e.toElement.style.backgroundColor = color;
    nextColor();
}

function clearGrid() {
    for(let i = 0; i < grid.children.length; i++) {
        for(let j = 0; j < grid.children[i].children.length; j++){
            grid.children[i].children[j].style.backgroundColor = "#FFFFFF";
        }
    }
}

function chooseColor(e) {
    color = e.target.value
    updateColors()
}

function updateColors() {
    colorPickerLabel.style.backgroundColor = color
} 

function nextColor() {
    if (random) {
        randomColor = Math.floor(Math.random() * (0xFFFFFF + 1))
        color = "#" + randomColor.toString(16)
        updateColors()
    }
}

fillGrid(16)