// Gets the user input and attaches it to a variable
  var numberOfDivs = prompt("How many boxes do you want?");
  // Squares the number of divs inputted.
  // numberOfDivs = Math.pow(numberOfDivs, 2);
  for(var i = 0; i < numberOfDivs; ++i){
    // Assigns the variable to make a 'div' element
    var makeCuteDivs = document.createElement('div');
    // Assigns the new 'div' a class name
    makeCuteDivs.className = "cuteDiv";
    makeCuteDivs.id = (i);
    // Adds the new 'div' to the end of the 'body'
    document.getElementsByTagName('body')[0].appendChild(makeCuteDivs);
  }

  var nodFactors = [];
  for(var x = 1; x <= numberOfDivs; ++x){
    // Iterates through the user input 'numberOfDivs' and divides it by our counting variable 'x' to see if 'x' is a factor of 'numberOfDivs'
    if(numberOfDivs % x == 0){
      // If 'x' is a factor of 'numberOfDivs' then it pushes it to our defined array
      nodFactors.push(x);
    }
  }
  // Takes the length of the our defined array 'nodFactors' and divides it by two. Then floors it incase the length of 'nodFactors' was an odd number. Then assigns that floored number to the index of 'nodFactors' to the variable.
  var divHeight = nodFactors[Math.floor(nodFactors.length / 2)];
  if(nodFactors.length % 2 == 1){
    // If nodFactors is an odd number then that means the number inputted was prime so the height and width will be the same number.
    var divWidth = divHeight;
  }
  else{
    // If the string is even then it grabs the value of the index that comes before 'divHeight'
    var divWidth = nodFactors[Math.floor((nodFactors.length / 2) - 1)];
  }
  // var divDimension = document.getElementsByClassName("cuteDiv");
  var myDivClass = document.getElementsByClassName("cuteDiv");
  for(var y = 0; y < numberOfDivs; ++y){
    // Takes the 'divHeight' and divides it by 100 to determine the % sizing to size each div based on the user input.
    myDivClass[y].style.height = (100 / divHeight) + '%';
    // Sets the minimum height to 10 pixels
    myDivClass[y].style.minHeight = "10px";
    // Takes the 'divWidth' and divides it by 100 to determine the % sizing to size each div based on the user input.
    myDivClass[y].style.width = (100 / divWidth) + '%';
    // Sets the minimum width to 10 pixels
    myDivClass[y].style.minWidth = "10px";
    myDivClass[y].value = "";
  }
  // window.setInterval( function() { colorChange() }, 100);
  // function colorChange(){
    for(var i = 0; i < myDivClass.length; ++i){
      // Gives the current 'cuteDiv' the CSS background styling of a randomly selected color.
      myDivClass[i].style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
      // Calculates the color by taking Math.random (which gives a number between 0 and 1) and multiplying it by 16777215 (which is decimal for the color white or #FFFFFF in hex code). Then flooring it so we have a whole number. Then converts it into a string. (Having the 16 as a parameter in the .toString converts it into a hexadecimal number.)
    }
  // }
  // Randomly colors every block
  // for(var i = 0; i < numberOfDivs; ++i){
  //   myDivClass[i].style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  // }
  // Randomly colors only a single block
  // myDivClass[Math.floor(Math.random() * numberOfDivs)].style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  // // Timing Interval
  // window.setInterval( function() { colorChange() }, 200);
  // function colorChange(){
  //   document.getElementsByTagName('body')[0].appendChild(myDivClass[0]);
  // }

  var turns = divWidth + divHeight;

  for(var i = 0; i < numberOfDivs; ++i){
    var test = document.getElementById(i);
  
    test.onclick = function(){
      var id = this.id;
      var ID = parseInt(id);
      var defaultID = document.getElementById(ID);
      defaultID.innerHTML = " ";
      var defaultColor = defaultID.style.backgroundColor;
      var changingSqArr = [ID];
      console.log(defaultColor);

      for(var x = 1; x < 2; ++x){
        for(var y = 0; y < changingSqArr.length; ++y){

          var arrLength = changingSqArr.length;
          ID = changingSqArr[y];
          var leftID = ID - 1;
          var rightID = ID - 1 + 2;
          var topID = ID - divWidth;
          var bottomID = ID - divWidth + (divWidth * 2);
          var leftSQ = document.getElementById(leftID);
          var rightSQ = document.getElementById(rightID);
          var topSQ = document.getElementById(topID);
          var bottomSQ = document.getElementById(bottomID);

          if(leftSQ.innerHTML !== " "){
            leftSQ.style.backgroundColor = defaultColor;
            console.log(leftSQ.style.backgroundColor);
            leftSQ.className = "cuteDiv animated fadeIn"
            leftSQ.innerHTML = " ";
            if(leftID % divWidth !== divWidth){
              changingSqArr.push(leftID);
            }
          }
          if(rightSQ.innerHTML !== " "){
            rightSQ.style.backgroundColor = defaultColor;
            rightSQ.className = "cuteDiv animated fadeIn"
            rightSQ.innerHTML = " ";
            if(rightID % divWidth !== 0){
              changingSqArr.push(rightID);
            }
          }
          if(topSQ.innerHTML !== " "){
            topSQ.style.backgroundColor = defaultColor;
            topSQ.className = "cuteDiv animated fadeIn"
            topSQ.innerHTML = " ";
            if(topID > divWidth){
              changingSqArr.push(topID);
            }
          }
          if(bottomSQ.innerHTML !== " "){
            bottomSQ.style.backgroundColor = defaultColor;
            bottomSQ.className = "cuteDiv animated fadeIn"
            bottomSQ.innerHTML = " ";
            if(bottomID < (numberOfDivs - divWidth)){
              changingSqArr.push(bottomID);
            }
          }
        }
        for(var z = 0; z < 1; ++z){
          changingSqArr = [];
        }
      }
    }
  }
