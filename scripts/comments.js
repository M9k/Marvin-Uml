const fs = require('fs');
const path = require('path');

getDir('react');
getDir('redux');
getDir('Solidity');

function getDir(homePath){
    const dirs = dir => fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isDirectory());
    const subDir = dirs(homePath);
    const mapFiles = subDir.map(x =>getFiles(path.join(homePath,x)));
}

getFiles('react/bootstrap');

function getFiles(currentDir){
    fs.readdirSync(currentDir).forEach(file => {
        const extens = path.extname(file).substring(1);
        const name = path.parse(file).name;
        if (extens === 'iuml')
            getCommentsIuml(currentDir+'/'+name);
    });
    }

function getCommentsIuml(name){
    const str = fs.readFileSync(name + '.iuml', 'utf8');
    if(str.lastIndexOf("/'") !== -1 && str.lastIndexOf("'/") !== -1){ //found at least one comment
        const comment=str.substring(str.lastIndexOf("/'")+2,str.lastIndexOf("'/"));
        console.log("Comment from "+name+":\n"+comment);
    }else{
        console.log("Missing comment from "+name);
    }
}


