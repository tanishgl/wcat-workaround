function displayFileS(content){

  let duplicateContent = [];

  for(let j=0;j<content.length;j++){
    if(j==0 || content[j]!=content[j-1]){
      duplicateContent.push(content[j]);
    }
  }

  //Remove the last carriage return.
  duplicateContent.pop();

  return duplicateContent;

}

/* Exports */
module.exports = {
  SKey : displayFileS
}
