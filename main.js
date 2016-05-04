(function() {
  // Function variables.
  var updateBlock;
  var findWhichToRecolor;
  var whichArray;
  var blockOnClick;
  var buildBlock;
  var getFactors;
  var createBlocks;
  var initialize;

  // Element variables.
  var fragment  = document.createDocumentFragment();

  // Math variables.
  var _sqrt   = Math.sqrt;
  var _floor  = Math.floor;
  var _random = Math.random;
  var _round  = Math.round;
  var _max    = Math.max;

  // Regular variables.
  var count;
  var blocks;
  var columns;
  var rows;
  var timer;


  updateBlock = function(element, color) {
    element.value = '1';
    element.onclick = null;
    element.style.backgroundColor = color;

    return element;
  }

  findWhichToRecolor = function(index, color, array) {
    var top     = blocks[index - columns];
    var right   = blocks[index + 1];
    var bottom  = blocks[index + columns];
    var left    = blocks[index - 1];

    if (index >= columns && top.value !== '1') {
      array.push(updateBlock(top, color));
    }

    if (index % columns !== (columns - 1) && right.value !== '1') {
      array.push(updateBlock(right, color));
    }

    if (index < (count - columns) && bottom.value !== '1') {
      array.push(updateBlock(bottom, color));
    }

    if (index % columns !== 0 && left.value !== '1') {
      array.push(updateBlock(left, color));
    }

    return array;
  }

  whichArray = function(currentArray, nextArray, color) {
    if (currentArray.length > 0) {

      for (var i = 0; i < currentArray.length; ++i) {
        nextArray = findWhichToRecolor(
          blocks.indexOf(currentArray[0]),
          color,
          nextArray
        );

        currentArray.shift();
      }

      whichArray(currentArray, nextArray, color);

    } else if (nextArray.length > 0) {

      console.log(timer);

      setTimeout(function() {
        whichArray(nextArray, [], color);
      }, timer);

    }
  }

  blockOnClick = function() {
    this.value = '1';
    this.blockOnClick = null;
    whichArray([this], [], this.style.backgroundColor);
  }

  buildBlock = function(element, factors) {
    element.className = 'block';
    element.value = '0';
    element.style.width = (100 / factors[0]) + '%';
    element.style.height = (100 / factors[1]) + '%';
    element.style.backgroundColor = '#' + _floor(_random() * 16777215).toString(16);
    element.onclick = blockOnClick;

    fragment.appendChild(element);
    
    return element;
  }

  getFactors = function(factor) {
    columns = factor;
    rows    = count / factor;
    timer   = 500 / _max(columns, rows);

    return rows % 1 === 0 ? [columns, rows] : getFactors(columns -= 1);
  }

  createBlocks = function(array) {
    var factors = getFactors( _floor( _sqrt(count) ) );

    for (var i = 0; i < count; ++i) {
      array.push(buildBlock(document.createElement('div'), factors));
    }

    document.body.appendChild(fragment);

    return array;
  }

  initialize = function() {
    count   = prompt('How many blocks do you want?');
    blocks  = createBlocks([]);
  }


  return {
    initialize: initialize
  }
})().initialize();
