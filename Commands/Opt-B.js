/* Imports */
const style = require('../style.js');

function displayFileB(content, lineNumber){

  for(let j=0;j<content.length;j++){
    if(content[j]=='\r') {
      console.log(content[j]);
    } else {
      console.log(style.lns(lineNumber) + " " + style.cns(content[j]));
      lineNumber++;
    }
  }

  return lineNumber;

}

/* Exports */
module.exports = {
  BKey : displayFileB
}
