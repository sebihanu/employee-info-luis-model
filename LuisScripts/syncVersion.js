const shell = require("shelljs")
const commander = require("commander")

commander
  .version('1.0.0', '-v, --version')
  .description("Sync the remote LUSIS JSON file with the local LUIS JSON file and regenerate the coresponding .lu file.")
  .usage('[OPTIONS]...')
  .option('-n, --new <name>', 'New version')
  .parse(process.argv);

  
if(!commander.new){
    console.error("Missing new version")

    console.log(commander.help());
    return;
}

shell.echo(`Regenerating LUIS application version: ${commander.new} into file ./${commander.new}/app/en/TotalBot_${commander.new}.json`)
shell.exec(`npx luis export version --versionId ${commander.new}`).to(`./${commander.new}/app/en/TotalBot_${commander.new}.json`)
abortifError()

shell.echo(`Recreating .lu file: ./${commander.new}/app/en/TotalBot_${commander.new}.lu`)
shell.exec(`npx ludown refresh -i ./${commander.new}/app/en/TotalBot_${commander.new}.json -n ./${commander.new}/app/en/TotalBot_${commander.new}.lu`)
abortifError()

function abortifError(){
    if(shell.error()){
        shell.echo("ERROR....")
        shell.exit("-1");
    }
}

