const shell = require("shelljs")
const commander = require("commander")

const fullClassName = "TotalBot.HCM.Luis.HcmLuisResult";
const outputFolderPath = "../../src/TotalBot.HCM/Luis";

commander
  .version('1.0.0', '-v, --version')
  .description("Generate a C# class from a JSON LUIS application file")
  .usage('[OPTIONS]...')
  .option('-f, --fromVersion <name>', 'The version from which to generate the C# class')
  .parse(process.argv);

  
if(!commander.fromVersion){
    console.error("Missing source version")

    console.log(commander.help());
    return;
}

shell.echo(`Generating C# class: ${fullClassName} (${outputFolderPath}) from application version: ${commander.fromVersion}`);

shell.exec(`npx luis-apis export version --versionId ${commander.fromVersion} | npx luisgen --stdin -cs ${fullClassName} -o ${outputFolderPath}`)
abortifError()

function abortifError(){
    if(shell.error()){
        shell.echo("ERROR....")
        shell.exit("-1");
    }
}

