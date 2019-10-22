const shell = require("shelljs")
const commander = require("commander")

commander
  .version('1.0.0', '-v, --version')
  .usage('[OPTIONS]...')
  .description("Generate a LUIS batch test file. More info https://docs.microsoft.com/en-us/azure/cognitive-services/luis/luis-tutorial-batch-testing")
  .option('-f, --fromVersion <name>', 'New version')
  .parse(process.argv);

  
if(!commander.fromVersion){
    console.error("Missing source folder version")

    console.log(commander.help());
    return;
}

shell.echo(`Generating batch tests from version in the folder: ${commander.fromVersion}`);

shell.exec(`npx ludown parse toluis -l ./${commander.fromVersion}/app -s -n TotalBot --out TotalBot_${commander.fromVersion}.json -o ./${commander.fromVersion}/build -i ${commander.fromVersion} -t`)
abortifError()

function abortifError(){
    if(shell.error()){
        shell.echo("ERROR....")
        shell.exit("-1");
    }
}

