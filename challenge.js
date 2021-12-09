/* Node.js Challenge */

/* Imports */
const fs = require('fs');
const fnN = require('./Options/optN.js');
const fnB = require('./Options/optB.js');
const fnS = require('./Options/optS.js');

/* Command Line Input */

inputArr = process.argv.slice(2);

/* Verify if the command is wcat */

if(inputArr[0]=='wcat'){
  cmdArr = inputArr.slice(1);
  wcat(cmdArr);
} else {
  console.log("wrong command");
}



/***** wcat implementation *****/

function wcat(cmdArr){

  let fileArr = [];
  let optionArr = [];
  
  for(let i=0;i<cmdArr.length;i++){
    //Read the ith command passed after 'wcat'.
    let candidate = cmdArr[i];

    //Check whether the candidate is an option or is it a file.
    //If the candidate starts with a hyphen '-', it's an option.
    if(candidate.charAt(0)=='-'){
      if(isValidOption(candidate)){
        optionArr.push(candidate);
      }
    } else if (fs.lstatSync(candidate).isFile()){
      fileArr.push(candidate);
    } else {
      console.log("Invalid arguments passed");
    }
  }

  if(fileArr.length == 0){
    console.log("File Not passed!");
    return;
  } 

  displayFileTesting(fileArr, optionArr);
 
}

function isValidPairOfOptions(optionArr){

  //-n and -b are mutually exclusive.
  if(optionArr.includes('-n') && optionArr.includes('-b')){
    return false;
  } 

  //Otherwise, it's a valid pair.
  return true;
  
}


function displayFileTesting(fileArr, optionArr){

  //Line number. It only gets activated when -n or -b are passed.
  let lineNumber;
  //Option. It only gets activated when -n or -b are passed.
  let opt;
  //Boolean for testing option's existence.
  let isOpt;

  if(optionArr.length==1){
    isOpt = true;
    opt = optionArr[0].slice(1);
    lineNumber = 1;
  } else if(optionArr.length==2){
    //s is included.
    if(isValidPairOfOptions(optionArr)){
      isOpt = true;
      sec_opt = (optionArr[0].slice(1)=='s') ? optionArr[1] : optionArr[0];
      sec_opt = sec_opt.slice(1);
      lineNumber = 1;
    } else {
      console.log("-n and -b can't be used together! ");
      return;
    }
    
  }

  //Traversing through the files...

  for(let i=0;i<fileArr.length;i++){
    //Extract the i'th file from file array.
    let file = fileArr[i];

    //Check whether the file exists.
    let doesExist = fs.existsSync(file);

    if(doesExist){
      //Read the file contents. To prevent buffer return type, 'utf-8' must be passed as second arg.
      let content = fs.readFileSync(file, 'utf-8').split('\n');

        //2 options has been passed.
      if(isOpt && optionArr.length==2){
       
        //S is there, if 2 options are included.
        let trimmedArr = fnS.SKey(content);

        if(sec_opt=='n'){
          lineNumber = fnN.NKey(trimmedArr, lineNumber);
        } else if (sec_opt=='b'){
          lineNumber = fnB.BKey(trimmedArr, lineNumber);
        }

        //1 option has been passed
      } else if(isOpt && optionArr.length==1){

        if(opt=='n'){

          lineNumber = fnN.NKey(content, lineNumber);

        } else if (opt=='b'){

          lineNumber = fnB.BKey(content, lineNumber);

        } else if (opt =='s'){

          let trimmedArr = fnS.SKey(content);
          displayFile(trimmedArr);

        }

      } else {

        displayFile(content);

      }
      //Display the file contents. 
      
    } else {
      console.log(file + " doesn't exist.");
    }
  }
  
}

function displayFile(content){
  for(let i=0;i<content.length;i++){
    console.log(content[i]);
  }
}

function isValidOption(option){
  let ch = option.charAt(1);
  if(ch=='s' || ch=='n' || ch=='b'){
    return true;
  } else {
    return false;
  }
}
