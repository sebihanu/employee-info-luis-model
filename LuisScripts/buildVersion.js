const shell = require("shelljs")
const commander = require("commander")

commander
  .version('1.0.0', '-v, --version')
  .usage('[OPTIONS]...')
  .description("Build a new version from all the .lu files.")
  .option('-n, --new <name>', 'New version')
  .parse(process.argv);

  
if(!commander.new){
    console.error("Missing new version")

    console.log(commander.help());
    return;
}

shell.echo(`Building version: ${commander.new}`);
shell.echo(`Gathering all the .lu files from folder: ./${commander.new}/app  including sub-folders`);
shell.echo(`Generating ./${commander.new}/build/TotalBot_${commander.new}.json`)

shell.exec(`npx ludown parse toluis -l ./${commander.new}/app -s -n TotalBot --out TotalBot_${commander.new}.json -o ./${commander.new}/build -i ${commander.new}`)
abortifError()

function abortifError(){
    if(shell.error()){
        shell.echo("ERROR....")
        shell.exit("-1");
    }
}

