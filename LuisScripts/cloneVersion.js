const shell = require("shelljs")
const commander = require("commander")

commander
  .version('1.0.0', '-v, --version')
  .usage('[OPTIONS]...')
  .description("Clone a LUIS application version")
  .option('-b, --base <name>', 'Base version')
  .option('-n, --new <name>', 'New version')
  .parse(process.argv);

  if(!commander.base || !commander.new){
    
    if(!commander.base){

        console.error("ERROR: Missing base version (the version that will be cloned)")
    }

    if(!commander.new){
        console.error("ERROR: Missing new version")
    }

    console.log(commander.help());
    return;
}

if(shell.test("-d", `./${commander.new}`))
{
    console.error(`ERROR: Cant create version folder ${commander.new}. The folder: ./${commander.new} already exists.`);
    return;
}

shell.echo(`Cloning version ${commander.base} into version ${commander.new}:`)

if(shell.test("-d", `./${commander.base}`))
{
    shell.echo(`Copying folder ${commander.base} into folder ${commander.new}`)
    shell.cp("-R", `./${commander.base}`, `./${commander.new}`)
    abortifError()
    
    shell.rm("-r", `./${commander.new}/build/*`)
    abortifError()

    shell.rm("-r", `./${commander.new}/app/translated/*`)
    abortifError()

    shell.rm("-r", `./${commander.new}/app/en/*`)
    abortifError()
}
else {
    shell.echo(`Creating folder ${commander.new}`)
    shell.mkdir(`./${commander.new}`)
    shell.mkdir(`./${commander.new}/app`)
    shell.mkdir(`./${commander.new}/app/en`)
    shell.mkdir(`./${commander.new}/app/translated`)
    shell.mkdir(`./${commander.new}/build`)
    shell.mkdir(`./${commander.new}/ro`)
    shell.touch(`./${commander.new}/ro/TotalBot_${commander.new}_ro.lu`)
}


shell.echo(`Exporting LUIS application version: ${commander.base} into file ./${commander.new}/app/en/TotalBot_${commander.base}.json`)
shell.exec(`npx luis export version --versionId ${commander.base}`).to(`./${commander.new}/app/en/TotalBot_${commander.base}.json`)
abortifError()

shell.echo(`Recreating .lu file: ./${commander.new}/app/en/TotalBot_${commander.new}.lu`)
shell.exec(`npx ludown refresh -i ./${commander.new}/app/en/TotalBot_${commander.base}.json -n ./${commander.new}/app/en/TotalBot_${commander.new}.lu`)
abortifError()

function abortifError(){
    if(shell.error()){
        
        shell.echo("ERROR....")
        if(shell.test("-d", `./${commander.new}`))
        {
            shell.echo(`Removing the folder: ./${commander.new}`)
            shell.rm("-rf", `./${commander.new}`)
        }

        shell.exit("-1");
    }
}
