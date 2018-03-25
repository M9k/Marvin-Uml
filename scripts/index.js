const plantumlEncoder = require('plantuml-encoder');
const fs = require('fs');
const exec = require('child_process').exec;
const request = require('request');
const path = require('path');


const build = 'build';
const javaPlant = 'java -jar scripts/plantuml.jar ';

cleanBuild();
//checkInstall();

generateFolder('general');
generateFolder('react');


function generateFolder(directory) {
    fs.readdirSync(directory).forEach(file => {
        const extens = path.extname(file).substring(1);
        const PathFileName = path.join(directory, file);
        if (extens === 'puml') {
            getImagePuml(PathFileName);
        }
    });
}

function getImagePuml(PathFileName) {
    const command = javaPlant +'"' + PathFileName + '" -o "../build"';
    exec(command);
}

function cleanBuild() {
    fs.readdir(build, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlink(path.join(build, file), err => {
                if (err) throw err;
            });
        }
    });
}

