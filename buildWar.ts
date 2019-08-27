//Para funcionar o build node no sublime
//va em tools -> build system -> new build system...
//Cole o conteudo abaixo e salve com o nome que desejar. Ex: "MakeWar.sublime-build"
/*
{
    "shell_cmd": "node.exe buildWar.ts"
}
*/
//Para usar precione ctrl + shift + p e digite o nome que vc colocou no arquivo. Ex: "MakeWar"
//Pre-requisitos para funcionar:
//Node instalado;
//Está na aba de um arquivo da mesma pasta que o arquivo 'buildWar.ts', podendo ser o próprio
//ter executado "npm install archiver" na pasta


// require modules
var fs = require('fs');
var archiver = require('archiver');

// create a file to stream archive data to.
/*var output = fs.createWriteStream(__dirname + '/leitor.war');*/
var output = fs.createWriteStream('E:/servers/jboss-eap-6.4/standalone/deployments' + '/leitor.war');
var archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
});

// listen for all archive data to be written
output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
});

// good practice to catch warnings (ie stat failures and other non-blocking errors)
archive.on('warning', function (err) {
    if (err.code === 'ENOENT') {
        // log warning
    } else {
        // throw error
        throw err;
    }
});

// good practice to catch this error explicitly
archive.on('error', function (err) {
    throw err;
});

// pipe archive data to the file
archive.pipe(output);

archive.glob('**/*', { ignore: ['*.war', '*.zip', 'node_modules/**/*', '.git/**/*'] });

archive.finalize();