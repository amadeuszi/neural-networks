console.log("hello world")

const pixels = [];
const IMAGE_LENGTH = 28 * 28;
const VECTOR_LENGTH = IMAGE_LENGTH + 1;
const HOW_MANY_NUMBERS = 10;

document.querySelectorAll(".cell").forEach((element, index) => {
    pixels.push(0);
    element.setAttribute("value", pixels[index]);
    element.addEventListener("click", (event) => {
        pixels[index] = 1 - pixels[index];
        event.target.setAttribute("value", pixels[index]);
    });
});

function verify() {
    debugger;
    let correctly = 0;
    const allImages = trainingImages.length;
    for (let i = 0; i < trainingImages.length; i++) {
        const correctNumber = getCurrentCorrectNumber(i);
        const guessedNumber = guessNumber(i);
        if (correctNumber === guessedNumber) {
            correctly++;
        }
    }

    console.log(`Final results: ${correctly} / ${allImages}: ${correctly / allImages * 100}%`)
}

function guessNumberHelper(number, trainingIndex) {
    const currentPixels = trainingImages[trainingIndex];
    const predictionNumber = math.multiply(math.transpose(weights[number]), currentPixels);
    return predictionNumber;
}

function guessNumber(index) {
    let maxIndex = 0;
    let maxNumber = -1000000;
    for (let i = 0; i < HOW_MANY_NUMBERS; i++) {
        const prediction = guessNumberHelper(i, index);
        if (prediction > maxNumber) {
            maxNumber = prediction;
            maxIndex = i;
        }
    }

    return maxIndex;
}

let weights = []
for (let j = 0; j < HOW_MANY_NUMBERS; j++) {
    const currentWeights = []
    for (let i = 0; i < VECTOR_LENGTH; i++) {
        currentWeights.push((Math.random() - 0.5) / 1000000);
    }
    weights.push(math.matrix(currentWeights));
}

let currentEpoch = 0;

function learnHelper(index) {
    currentEpoch = 0;
    while (true) {
        let correctlyGuessed = 0;
        for (let i = 0; i < 4 * 60000; i++) {
            const guessIndex = Math.floor(Math.random() * 60000);
            if (isNaN(guessIndex)) {
                console.log("prediction is nan")
            }
            const correctNumber = getCurrentCorrectNumber(guessIndex)
            if (isNaN(correctNumber)) {
                console.log("prediction is nan")
            }
            const trainingData = getOneTrainingData(guessIndex);
            if (isNaN(trainingData._data[0])) {
                console.log("prediction is nan")
            }
            const prediction = math.multiply(math.transpose(weights[index]), trainingData)

            if (isNaN(prediction)) {
                console.log("prediction is nan")
            }

            const actualValue = correctNumber === index ? 1 : -1;
            if (isNaN(actualValue)) {
                console.log("prediction is nan")
            }
            const predictedValue = prediction > 0 ? 1 : -1
            if (isNaN(predictedValue)) {
                console.log("prediction is nan")
            }

            const error = actualValue - prediction;
            if (isNaN(error)) {
                console.log("prediction is nan")
            }
            const multiplier = error / 1000000;
            if (isNaN(multiplier)) {
                console.log("prediction is nan")
            }
            const weightsDiff = math.multiply(multiplier, trainingData)
            if (isNaN(weightsDiff._data[0])) {
                console.log("prediction is nan")
            }
            weights[index] = math.add(weightsDiff, weights[index])
            if (isNaN(weights[index]._data[0])) {
                console.log("prediction is nan")
            }

            if (actualValue === predictedValue) {
                correctlyGuessed++;
            }

            if (i % 4 * 10000 === 0) {
                console.log(`How many : ${correctlyGuessed} / ${i}`)
            }
        }
        console.log("correctlyGuessed", correctlyGuessed);
        currentEpoch++;
        if (currentEpoch > 5) {
            console.log("limit przekroczony - kończę naukę")
            break;
        }
        if (correctlyGuessed >= 119900) {
            console.log("dobry wynik - koniec nauki");
            break;
        }
    }
}

function learn() {
    for (let i = 0; i < HOW_MANY_NUMBERS; i++) {
        learnHelper(i);
    }
}
window.show = (newPixels) => {
    document.querySelectorAll(".cell").forEach((element, index) => {
        element.setAttribute("value", newPixels[index]);
        pixels[index] = newPixels[index];
    });
}

let currentDataSet = 0;

function getCurrentCorrectNumber(index) {
    return trainingLabels[index];
}

function getOneTrainingData(index) {
    return trainingImages[index];
}

function showDataSet() {
    const oneDataSet = trainingImages[currentDataSet]
    window.show(oneDataSet._data);
    currentDataSet = currentDataSet + 1;
}

function readSingleFile(e) {
    var file = e.target.files[0];
    if (!file) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
        var contents = e.target.result;
        parseImages(contents);
    };
    reader.readAsArrayBuffer(file);
}

var trainingImages = []

function parseImages(contents) {
    trainingImages = [];
    const view = new Uint8Array(contents);
    let start = 16;
    let i = start;
    while (true) {
        if (i >= view.length) {
            break
        }
        const currentImage = []
        for (let j = 0; j < IMAGE_LENGTH; j++) {
            currentImage.push(view.at(i) / 255);
            i++;
        }
        currentImage.push(1);
        trainingImages.push(math.matrix(currentImage));
        console.log(`image done ${Math.floor(i / IMAGE_LENGTH)}`)
    }


    window.console.log(trainingImages[0])
    show(trainingImages[0]._data)
}

document.getElementById('file-input')
    .addEventListener('change', readSingleFile, false);


function readSingleFile2(e) {
    var file = e.target.files[0];
    if (!file) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
        var contents = e.target.result;
        parseLabels(contents);
    };
    reader.readAsArrayBuffer(file);
}

var trainingLabels = []

function parseLabels(contents) {
    trainingLabels = [];
    const view = new Uint8Array(contents);
    let start = 8;
    for (let i = start; i < view.length; i++) {
        trainingLabels.push(view.at(i));
    }

    window.console.log(trainingLabels)
}

document.getElementById('file-input2')
    .addEventListener('change', readSingleFile2, false);