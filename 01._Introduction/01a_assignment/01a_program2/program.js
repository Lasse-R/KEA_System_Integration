const fs = require('fs');

//console.log("Hello, World!");

const filePath = './plane.json';

async function readJsonFile(filePath) {
    try {
        const data = await readFile(filePath, 'utf-8');
        console.log('Json Data:', JSON.parse(data));
    } catch (error) {
        console.error(error);
    }
}

readJsonFile();