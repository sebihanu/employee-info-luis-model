const shell = require("shelljs")
const commander = require("commander")

const trasnlationKey = "884c7a639af644cabadbc8803cf74810";

commander
  .version('1.0.0', '-v, --version')
  .description("Translate .lu file/files from the './specified version folder/ro. Usese Microsoft Translator API'")
  .usage('[OPTIONS]...')
  .option('-n, --new <name>', 'New version')
  .option('-f, --file <name>', 'File name to translate')
  .parse(process.argv);

  
if(!commander.new){
    console.error("Missing source folder version")

    console.log(commander.help());
    return;
}

shell.echo(`Using the Microsoft Translator API Key: ${trasnlationKey}`);
if(!commander.file)
{
    shell.echo(`Translating all the .lu files from ./${commander.new}/ro folder and sub-folders. Output folder: ./${commander.new}/app/translated/en`);

    shell.exec(`npx ludown translate -k ${trasnlationKey} -f ro -t en -l ./${commander.new}/ro -s --out_folder ./${commander.new}/app/translated`)
    abortifError()
}
else{
    shell.echo(`Translating ./${commander.new}/ro/${commander.file} file. Output file: ./${commander.new}/app/translated/en/${commander.file}`);

    shell.exec(`npx ludown translate -k ${trasnlationKey} -f ro -t en --in ./${commander.new}/ro/${commander.file} --out_folder ./${commander.new}/app/translated`)
    abortifError()
}

function abortifError(){
    if(shell.error()){
        shell.echo("ERROR....")
        shell.exit("-1");
    }
}