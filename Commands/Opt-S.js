function displayFileS(content){

  let duplicateContent = [];

  for(let j=0;j<content.length;j++){
    if(content[j]=='\r') continue;
      duplicateContent.push(content[j], '\r');
  }

  //Remove the last carriage return.
  duplicateContent.pop();

  return duplicateContent;

}

/* Exports */
module.exports = {
  SKey : displayFileS
}
