#!/usr/bin/env node
const { exec, spawn } = require("child_process");
const { log } = require("console");
const os = require("os");
const { exit, stdout, stderr, stdin, argv } = require("process");
const yargs = require("yargs");

let options = yargs.usage("Usage: -p <package>").option("p", {
  alias: "package",
  describe: "name of package to be installed",
  type: "string",
  demandOption: true,
}).argv;

//to run this cli app
//clone and run npm init, remember to put author's name
//npm install -g .
//app -p software
//software  === name of software to be installed
//to uninstall
//npm uninstall -g .

function cli(software) {
  //WINDOWS OS
  if (os.platform() === "win32") {
    //checks if the OS is windows. This check should be done for other operating systems
    let script = `where ${software}`; //this command is used for checking if the software has been installed into the windows machine
    exec(script, (err, stout) => {
      //exec creates a child process for running the shell script in the line above
      if (err || "") {
        //uses call back to check if the app does not exist
        let scripb = `choco install ${software}`; //if the app is absent it runs another shell script inside a child process to install it, choco is like `sudo apt-get` but for windows
        let spawning = exec(scripb); //we assign the shell script to a variable to enable further testing
        //---------------------------------------------------------------------------
        //this is where confusion starts from, we need to be able to type 'Y'
        //when the terminal prompts us if we want to continue with installation or not
        //it's possible we replace all of this block with a better solution so that we can
//1095  //interract with the shell after `spawning starts running`
        spawning.stdio[0].on("data", (data) => {
          log(data);
        });
        spawning.stderr.on("data", (data) => {
          log(`stderr: ${data}`);
        });
        spawning.on("error", (error) => {
          //return's an error if we have one
          log(error);
        });
        spawning.on("close", (close) => {
          //close the process with a code after installation
          log(`child process exited with code ${close}`);
        });
        //---------------------------------------------------------------------------------
      }
      if (stout) {
        log(`Software already exist`);
      }
    });
  }
  //LINUX OS
  if (os.platform() === "linux") {
    //checks if OS is linux
    let script = `type -p ${software}`; //this shell script checks if the software is installed
    exec(script, (err, stout) => {
      if (err || "") {
        log(`installation required`);
        let scripb = `sudo apt-get install ${software}`; //script for installing software on linux
        //-----------------------------------------------------------------------------------------------
        //we need to find a way to be able to respond to the terminal's prompting
        //before installation can begin
//1095  //interract with the shell after `spawning starts running`

        spawning.stdio[0].on("data", (data) => {
          log(data);
        });
        spawning.stderr.on("data", (data) => {
          log(`stderr: ${data}`);
        });
        spawning.on("error", (error) => {
          log(error);
        });
        spawning.on("close", (close) => {
          log(`child process exited with code ${close}`);
        });
        //----------------------------------------------------------------------------------------------
      }
      if (stout) {
        log(`Software already exist`);
      }
    });
  }
  //MacOS
  if (os.platform() === "darwin") {
    //checks if OS is MacOS
    let script = `type -a ${software}`; //this shell script checks if the software is installed
    exec(script, (err, stout) => {
      if (err || "") {
        log(`installation required`);
        let scripb = `brew install ${software}`; //script for installing software on MacOS
        //-----------------------------------------------------------------------------------------------------
        //we need to find a way to be able to respond to the terminal's prompting
        //before installation can begin
//1095  //interract with the shell after `spawning starts running`

        spawning.stdio[0].on("data", (data) => {
          log(data);
        });
        spawning.stderr.on("data", (data) => {
          log(`stderr: ${data}`);
        });
        spawning.on("error", (error) => {
          log(error);
        });
        spawning.on("close", (close) => {
          log(`child process exited with code ${close}`);
        });
        //----------------------------------------------------------------------------------------------------
      }
      if (stout) {
        log(`Software already exist`);
      }
    });
  }
}

cli(options.package);
//if we're able to solve that problem, we can refreactor the whole app into smaller functions
//instead of a large chunk of function