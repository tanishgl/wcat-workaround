/* Imports */
const style = require('../style.js');

function displayFileN(content, lineNumber){

  for(let i=0;i<content.length;i++){
    console.log(style.lns(lineNumber) + " " + style.cns(content[i]));
    lineNumber++;
  }

  return lineNumber;

}


/* Exporting module */
module.exports = {
  NKey : displayFileN,
  NgetKey : getFileN
}
