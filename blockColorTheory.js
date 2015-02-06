// Gets the user input and attaches it to a variable
  var numberOfDivs = prompt("How many boxes do you want?");
  // Squares the number of divs inputted.
  // numberOfDivs = Math.pow(numberOfDivs, 2);
  for(var i = 0; i < numberOfDivs; ++i){
    // Assigns the variable to make a 'div' element
    var makeCuteDivs = document.createElement('div');
    // Assigns the new 'div' a class name
    makeCuteDivs.className = "cuteDiv";
    // Adds the new 'div' to the end of the 'body'
    document.getElementsByTagName('body')[0].appendChild(makeCuteDivs);
  }
  var nodArr = [];
  for(var x = 1; x <= numberOfDivs; ++x){
    // Iterates through the user input 'numberOfDivs' and divides it by our counting variable 'x' to see if 'x' is a factor of 'numberOfDivs'
    if(numberOfDivs % x == 0){
      // If 'x' is a factor of 'numberOfDivs' then it pushes it to our defined array
      nodArr.push(x);
    }
  }
  // Takes the length of the our defined array 'nodArr' and devides it by two. Then floors it incase the length of 'nodArr' was an odd number. Then assigns that floored number to the index of 'nodArr' to the variable.
  var divHeight = nodArr[Math.floor(nodArr.length / 2)];
  if(nodArr.length % 2 == 1){
    // If nodArr is an odd number then that means the number inputted was prime so the height and width will be the same number.
    var divWidth = divHeight;
  }
  else{
    // If the string is even then it grabs the value of the index that comes before 'divHeight'
    var divWidth = nodArr[Math.floor((nodArr.length / 2) - 1)];
  }
  var divDimension = document.getElementsByClassName("cuteDiv");
  for(var y = 0; y < numberOfDivs; ++y){
      console.log(divDimension[y]);
    // Takes the 'divHeight' and divides it by 100 to determine the % sizing to size each div based on the user input.
    divDimension[y].style.height = (100 / divHeight) + '%';
    // Sets the minimum height to 10 pixels
    divDimension[y].style.minHeight = "10px";
    // Takes the 'divWidth' and divides it by 100 to determine the % sizing to size each div based on the user input.
    divDimension[y].style.width = (100 / divWidth) + '%';
    // Sets the minimum width to 10 pixels
    divDimension[y].style.minWidth = "10px";
  }
  var myDivs = document.getElementsByClassName("cuteDiv");
  for(var i = 0; i < myDivs.length; ++i){
    // Iterates through the 'divs' with with the index of 'i' on mouse over
    myDivs[i].onmousemove = function(){
      for(var i = 0; i < myDivs.length; ++i){
        // Gives the current 'cuteDiv' the CSS background styling of a randomly selected color.
        myDivs[i].style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        // Calculates the color by taking Math.random (which gives a number between 0 and 1) and multiplying it by 16777215 (which is decimal for the color white or #FFFFFF in hex code). Then flooring it so we have a whole number. Then converts it into a string. (Having the 16 as a parameter in the .toString converts it into a hexadecimal number.)
      }
    }
  }