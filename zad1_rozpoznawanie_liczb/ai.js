console.log("hello world")

const pixels = [];
const IMAGE_LENGTH = 28 * 28;
const VECTOR_LENGTH = IMAGE_LENGTH + 1;

var educationDataSet = {
    "0": [[0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0], [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1], [0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0]],
    "1": [[0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], [0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]],
    "2": [[1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1], [0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1]],
    "3": [[1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1], [0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0], [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1]],
    "4": [[0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], [0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], [1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]],
    "5": [[1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1], [0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0]],
    "6": [[1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1], [0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0], [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1]],
    "7": [[1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], [0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0]],
    "8": [[0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0], [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1], [0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1]],
    "9": [[1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1], [0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0], [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]],
}

const HOW_MANY_NUMBERS = 10;
const HOW_MANY_PER_NUMBER = 3;

document.querySelectorAll(".cell").forEach((element, index) => {
    pixels.push(0);
    element.setAttribute("value", pixels[index]);
    element.addEventListener("click", (event) => {
        pixels[index] = 1 - pixels[index];
        event.target.setAttribute("value", pixels[index]);
    });
});

function displayPixels() {
    console.log(pixels);
}

function guessNumberHelper(index) {
    const currentPixels = [ ...pixels ];
    currentPixels.push(1);
    const predictionNumber = math.multiply(math.transpose(weights[index]), math.matrix(currentPixels));
    const prediction = predictionNumber > 0 ? 1 : -1;

    if (prediction === 1) {
        console.log(`To jest ${index}`);
    }
}

function guessNumber() {
    for (let i = 0; i < HOW_MANY_NUMBERS; i++) {
        guessNumberHelper(i);
    }
}

let weights = []
for (let j = 0; j < 10; j++) {
    const currentWeights = []
    for (let i = 0; i < 36; i++) {
        currentWeights.push((Math.random() - 0.5) / 10);
    }
    weights.push(math.matrix(currentWeights));
}

Object.values(educationDataSet).forEach((oneNumber) => {
    oneNumber.forEach((dataset) => {
        dataset.push(1);
    })
})

let currentEpoch = 0;
let currentWeightsLife = 0;
let bestWeightsLife = 0;
let bestWeights = [ ...weights ];

function learnHelper(index) {

    while (true) {
        let correctlyGuessed = 0;
        for (let i = 0; i < HOW_MANY_PER_NUMBER * HOW_MANY_NUMBERS * 10; i++) {
            const guessIndex = Math.floor(Math.random() * HOW_MANY_PER_NUMBER * HOW_MANY_NUMBERS);
            const correctNumber = getCurrentCorrectNumber(guessIndex)
            const oneData = getOneTrainingData(guessIndex);

            const trainingData = math.matrix(oneData);

            const prediction = math.multiply(math.transpose(weights[index]), trainingData)

            const actualValue = correctNumber === index ? 1 : -1;
            const predictedValue = prediction > 0 ? 1 : -1

            if (actualValue === predictedValue) {
                correctlyGuessed++;
                currentWeightsLife++;
                if (currentWeightsLife > bestWeightsLife) {
                    bestWeightsLife = currentWeightsLife;
                    bestWeights[index] = weights[index];
                }
            } else {
                const error = actualValue - predictedValue;
                const multiplier = error / 100;
                const weightsDiff = math.multiply(multiplier, trainingData)
                weights[index] = math.add(weightsDiff, weights[index])
                currentWeightsLife = 0;
            }
        }
        console.log("correctlyGuessed", correctlyGuessed);
        currentEpoch++;
        if (currentEpoch > 1000) {
            console.log("limit przekroczony - kończę naukę")
            break;
        }
        if (correctlyGuessed === HOW_MANY_PER_NUMBER * HOW_MANY_NUMBERS * 10) {
            console.log("koniec nauki");
            break;
        }
    }
    weights = bestWeights;
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
    return Math.floor(index / HOW_MANY_PER_NUMBER);
}

function getOneTrainingData(index) {
    const currentNumber = getCurrentCorrectNumber(index).toString();
    const oneDataSet = educationDataSet[currentNumber][index % HOW_MANY_PER_NUMBER]
    if (!oneDataSet.length) {
        throw new Error(`Couldn't find data set: currentNumber: ${currentNumber}, current data set: ${currentDataSet}`)
    }

    return oneDataSet;
}

function showDataSet() {
    const oneDataSet = getOneTrainingData(currentDataSet)
    window.show(oneDataSet);
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
    var element = document.getElementById('file-content');
    const view = new Uint8Array(contents);
    let start = 16;
    let i = start;
    while (true) {
        if (i >= view.length) {
            break
        }
        const currentImage = []
        for (let j = 0; j < IMAGE_LENGTH; j++) {
            currentImage.push(view.at(i) > 0 ? 1 : 0);
            i++;
        }
        trainingImages.push(math.matrix(currentImage));
        console.log(`image done ${Math.floor(i / IMAGE_LENGTH)}`)
    }


    window.console.log(trainingImages[0])
    show(trainingImages[0]._data)
}

document.getElementById('file-input')
    .addEventListener('change', readSingleFile, false);