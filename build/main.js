import { performance } from 'perf_hooks';
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const dataStructure = {};
for (let i = 0; i < 1000; i++) {
    const productName = `Продукт ${i}`;
    const price = getRandomInt(1, 1000);
    dataStructure[productName] = price;
}
const startTime = performance.now();
console.log('Час створення структури даних: ', startTime.toFixed(2), 'мс');
console.log(`Вартість продукту 50: ${dataStructure['Продукт 50']} грн`);
const endTime = performance.now();
console.log('Час звернення до 50-го елемента: ', endTime.toFixed(2), 'мс');
//# sourceMappingURL=main.js.map