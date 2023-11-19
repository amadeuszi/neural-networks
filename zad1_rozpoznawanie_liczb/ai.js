const displayedPixels = [];
const IMAGE_LENGTH = 28 * 28;
const VECTOR_LENGTH = IMAGE_LENGTH + 1;
const HOW_MANY_NUMBERS = 10;

let currentChartX = 0;
const xValues = [];

const chart = new Chart("myChart", {
    type: "line",
    data: {
        labels: xValues,
        datasets: [
            {
                data: [],
                borderColor: "blue",
                fill: false
            },
        ]
    },
    options: {
        legend: { display: false }
    }
});

document.querySelectorAll(".cell").forEach((element, index) => {
    displayedPixels.push(0);
    element.setAttribute("value", displayedPixels[index]);
    element.addEventListener("click", (event) => {
        displayedPixels[index] = 1 - displayedPixels[index];
        event.target.setAttribute("value", displayedPixels[index]);
    });
});

function verifyAll() {
    let correctly = 0;
    const allImages = testingImages.length;
    for (let i = 0; i < testingImages.length; i++) {
        const correctNumber = testingLabels[i];
        const guessedNumber = guessNumber(i);
        if (correctNumber === guessedNumber) {
            correctly++;
        }
    }

    console.log(`Final results: ${correctly} / ${allImages}: ${correctly / allImages * 100}%`)
}

function verifyOne() {
    let correctly = 0;
    const allImages = testingImages.length;
    for (let i = 0; i < testingImages.length; i++) {
        const correctNumber = testingLabels[i];
        const guessedPrediction = guessNumberHelper(currentNumber, i);

        const isOk1 = guessedPrediction > 0 ? 1 : -1;
        const isOk2 = correctNumber === currentNumber ? 1 : -1;

        if (isOk1 === isOk2) {
            correctly++;
        }
    }

    console.log(`Final results: ${correctly} / ${allImages}: ${correctly / allImages * 100}%`)
}

function guessNumberHelper(number, trainingIndex) {
    const currentPixels = testingImages[trainingIndex];
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

let learningConstant = 10000;

function learnHelper(number) {
    currentNumber = number;
    currentEpoch = 0;
    while (true) {
        let correctlyGuessed = 0;
        for (let i = 0; i < 2 * 60000; i++) {
            const guessIndex = Math.floor(Math.random() * 60000);
            const correctNumber = getCurrentCorrectNumber(guessIndex)
            const trainingData = getOneTrainingData(guessIndex);
            const prediction = math.multiply(math.transpose(weights[number]), trainingData)

            const actualValue = correctNumber === number ? 1 : -1;
            const predictedValue = prediction > 0 ? 1 : -1

            const error = actualValue - prediction;
            const multiplier = error / learningConstant;
            const weightsDiff = math.multiply(multiplier, trainingData)

            weights[number] = math.add(weightsDiff, weights[number])

            if (actualValue === predictedValue) {
                correctlyGuessed++;
            }

            if (i % (1 * 10000) === 1 * 10000 - 1) {
                console.log(`How many : ${correctlyGuessed} / ${i + 1}: ${correctlyGuessed / (i + 1) * 100}%`);
                const correctPercentage = correctlyGuessed / (i + 1) * 100;
                chart.data.datasets[0].data.push(100 - correctPercentage);
                chart.data.labels.push(currentChartX++);
                chart.update()
            }
        }
        console.log(`Current number: ${currentNumber} . Correctly guessed ${correctlyGuessed}`);
        currentEpoch++;
        if (currentEpoch > 0) {
            console.log("limit przekroczony - kończę naukę")
            break;
        }
        if (correctlyGuessed >= 4 * 60000 - 1000) {
            console.log("dobry wynik - koniec nauki");
            break;
        }
    }
}

let currentNumber = 0;

function learnAll() {
    for (let i = 0; i < HOW_MANY_NUMBERS; i++) {
        learnHelper(i);
    }
}

function learn() {
    learnHelper(currentNumber);
}

window.show = (newPixels) => {
    document.querySelectorAll(".cell").forEach((element, index) => {
        element.setAttribute("value", newPixels[index]);
        displayedPixels[index] = newPixels[index];
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
    reader.onload = function (e) {
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
    reader.onload = function (e) {
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


function readSingleFile3(e) {
    var file = e.target.files[0];
    if (!file) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
        var contents = e.target.result;
        parseImages2(contents);
    };
    reader.readAsArrayBuffer(file);
}

var testingImages = []

function parseImages2(contents) {
    testingImages = [];
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
        testingImages.push(math.matrix(currentImage));
        console.log(`image done ${Math.floor(i / IMAGE_LENGTH)}`)
    }


    window.console.log(testingImages[0])
    show(testingImages[0]._data)
}

document.getElementById('file3')
    .addEventListener('change', readSingleFile3, false);


function readSingleFile4(e) {
    var file = e.target.files[0];
    if (!file) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
        var contents = e.target.result;
        parseLabels2(contents);
    };
    reader.readAsArrayBuffer(file);
}

var testingLabels = []

function parseLabels2(contents) {
    testingLabels = [];
    const view = new Uint8Array(contents);
    let start = 8;
    for (let i = start; i < view.length; i++) {
        testingLabels.push(view.at(i));
    }

    window.console.log(testingLabels)
}

document.getElementById('file4')
    .addEventListener('change', readSingleFile4, false);