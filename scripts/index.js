const plantumlEncoder = require('plantuml-encoder');
const fs = require('fs');
const exec = require('child_process').exec;
const request = require('request');
const path = require('path');


const build = 'build';

cleanBuild();
generateFolder('general');

//generateFolder('react');

function generateFolder(directory) {
    fs.readdirSync(directory).forEach(file => {
        const extens = path.extname(file).substring(1);
        const name = path.parse(file).name;
        if (extens === 'puml')
            getImagePuml(name, directory);
    });
}

function getImagePuml(puml_name, directory) {
    const file = fs.readFileSync(path.join(directory, puml_name + '.puml'), 'utf8');

    const encoded = plantumlEncoder.encode(file);

    const url = 'http://www.plantuml.com/plantuml/img/' + encoded;

    request(url).pipe(fs.createWriteStream(path.join(build, puml_name + '.png')));
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

