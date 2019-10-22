const shell = require("shelljs")
const commander = require("commander")

commander
  .version('1.0.0', '-v, --version')
  .usage('[OPTIONS]...')
  .description("Publish a new version to LUIS.")
  .option('-n, --new <name>', 'New version')
  .parse(process.argv);


  if(!commander.new){
    console.error("Missing new version")

    console.log(commander.help());
    return;
}

shell.echo(`Importing LUIS JSON file: ./${commander.new}/build/TotalBot_${commander.new}.json, version: ${commander.new}`);
shell.echo(`For LUIS application configuration check ./.luisrc file`);

shell.exec(`npx luis delete version --versionId ${commander.new} --force`)
shell.exec(`npx luis import  version  --in ./${commander.new}/build/TotalBot_${commander.new}.json`)
shell.exec(`npx luis train version --versionId ${commander.new}`)
shell.exec(`npx luis get status --versionId ${commander.new} --wait`)
shell.exec(`npx luis publish version --versionId ${commander.new} --staging true`)		


abortifError()

function abortifError(){
    if(shell.error()){
        shell.echo("ERROR....")
        shell.exit("-1");
    }
}