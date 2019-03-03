const FIRE_WIDTH = 10;
const FIRE_HEIGHT = 40;
const PIXEL_SIZE = 10;
const PIXEL_TOTAL = FIRE_HEIGHT * FIRE_WIDTH;
const fire_arr = [];
const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}];

window.onload = ()=>{
    let canvas = document.getElementById('fire-canvas');
    canvas.width = PIXEL_SIZE * FIRE_WIDTH;
    canvas.height = PIXEL_SIZE * FIRE_HEIGHT;
    start();
}

function start() {
    createFireDataStructure();
    startFireSource();

    setInterval(renderUpdate, 50);
}

function renderUpdate() {
    updateFire();
    fireRenderCanvas();
}

function createFireDataStructure() {
    for(let i = 0; i < PIXEL_TOTAL; i++)
        fire_arr[i] = 0;
}

function startFireSource() {
    for(let i = PIXEL_TOTAL - FIRE_WIDTH; i < PIXEL_TOTAL; i++)
        fire_arr[i] = 36;
}

function updateFire() {

    // for (let j = fire_y * fire_x - 1; j >= -fire_y; j = j - fire_y) {
    // debugger;
    // debugger;
    for (let i = 0; i < FIRE_WIDTH * FIRE_HEIGHT - FIRE_WIDTH; i++) {
        let decay = Math.floor(Math.random() * 3);
        // decay = Math.floor(Math.random()) + 1;
        let bellowPixel = i + FIRE_WIDTH;
        let newFireIntensity = fire_arr[bellowPixel] - decay >= 0 ? fire_arr[bellowPixel] - decay : 0;
        
        fire_arr[i] = newFireIntensity;
        fire_arr[i - decay] = newFireIntensity;
    }
    
}

function fireRenderCanvas() {
    let canvas = document.getElementById('fire-canvas');
    let ctx = canvas.getContext('2d');

    canvas.width = canvas.width;

    for(let i = 0; i < PIXEL_TOTAL; i = i + FIRE_WIDTH) {
        for(let j = 0; j < FIRE_HEIGHT; j++) {
            clr = fireColorsPalette[fire_arr[i + j]];
            ctx.fillStyle = `rgb(${clr['r']},${clr['g']},${clr['b']})`;
            ctx.fillRect(j * PIXEL_SIZE, (i/FIRE_WIDTH) * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
        }
    }
}

// function fireRender() {
//     // debugger;
//     while(document.body.lastChild)
//         document.body.removeChild(document.body.lastChild);

//     tab = document.createElement('table');
//     tab.cellspacing = 0;
//     document.body.appendChild(tab);


//     for(let i = 0; i < PIXEL_TOTAL; i = i + FIRE_WIDTH) {
//         let tr = document.createElement('tr');
//         for(let j = 0; j < FIRE_HEIGHT; j++) {
//             let td = document.createElement('td');
//             cl = fireColorsPalette[fire_arr[(i + j)]];
//             // td_.appendChild(document.createTextNode(fire_arr[i + j]));
//             td.style.backgroundColor = 'rgb(' + cl['r'] + ',' + cl['g'] + ',' + cl['b'] + ')';
//             tr.appendChild(td);
//         }
//         tab.appendChild(tr);
//     }
// }