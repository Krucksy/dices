const app = document.getElementById('app');
const cellColorUnselected = "#f3f3f3";
const cellColorSelected = "#1bda2f";

// clone the dice model and change the color
function buildDice(nb, color) {
    const node = document.getElementById('dice' + nb);
    const clone = node.cloneNode(true);
    clone.id = "";
    for (const child of clone.children[0].children) {
        if (child.tagName === 'rect') {
            child.style.fill = color;
        }
    }
    return clone;
}

function buildCell(i, j, k) {
    let cell = document.createElement("div");
    cell.className += "cell " + i + " " + j + " " + k;
    cell.dataset.sum = i + j + k;
    return cell;
}

// function called every time a filter is selected
function updateCells(source) {
    resetCellsColor();
    let counter = 0;
    setNbTot(counter);
    switch (source) {
        case "impair":
            disableFieldInput()
            Array.from(document.getElementsByClassName("cell")).forEach(function (cell) {
                if (cell.classList.contains("1") || cell.classList.contains("3") || cell.classList.contains("5")) {
                    cell.style.backgroundColor = cellColorSelected;
                    counter++;
                }
            });
            setNbTot(counter);
            break;

        case "pairDiff":
            disableFieldInput()
            Array.from(document.getElementsByClassName("cell")).forEach(function (cell) {
                if (cell.classList.contains("2") && cell.classList.contains("4") && cell.classList.contains("6")) {
                    cell.style.backgroundColor = cellColorSelected;
                    counter++;
                }
            });
            setNbTot(counter);

            break;
        case "pairSame":
            disableFieldInput()
            Array.from(document.getElementsByClassName("cell")).forEach(function (cell) {
                if (cell.className == "cell 2 2 2" || cell.className == "cell 4 4 4" || cell.className == "cell 6 6 6") {
                    cell.style.backgroundColor = cellColorSelected;
                    counter++;
                }
            });
            setNbTot(counter);

            break;
        case "sum":
            const sumValue = document.getElementById("sumValue").value;
            Array.from(document.getElementsByClassName("cell")).forEach(function (cell) {
                if (cell.dataset.sum == sumValue) {
                    cell.style.backgroundColor = cellColorSelected;
                    counter++;
                }
            });
            setNbTot(counter);
            break;
    }
}

function enableFieldInput() {
    setNbTot(0);
    resetCellsColor();
    document.getElementById("sumValue").disabled = false;
}
function disableFieldInput() {
    let fieldInput = document.getElementById("sumValue");
    fieldInput.disabled = true;
    fieldInput.value = "";
}

function resetCellsColor() {
    Array.from(document.getElementsByClassName("cell")).forEach(function (cell) {
        cell.style.backgroundColor = cellColorUnselected;
    });
}

function setNbTot(nb) {
    document.getElementById("nbTot").innerHTML = nb;
}

function main()
{
    // creating all tables with cells and dices
    for (let i = 1; i <= 6; i++) {
        const mainContainer = app.appendChild(document.createElement("div"));
        mainContainer.className = "container";
    
        mainContainer.appendChild(buildDice(i, "#fac5c9"));
        for (let j = 1; j <= 6; j++) {
            mainContainer.appendChild(buildDice(j, "#c5c9fa"));
        }
    
        for (let k = 1; k <= 6; k++) {
            mainContainer.appendChild(buildDice(k, "#c1f5c4"));
            for (let l = 1; l <= 6; l++) {
                mainContainer.appendChild(buildCell(i, k, l));
            }
        }
    }
    
    // remove the models of dices
    for (let i = 1; i <= 6; i++) {
        const dice = document.getElementById('dice' + i);
        dice.remove();
    }

}


main();