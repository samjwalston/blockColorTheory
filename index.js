(function() {
  // Function variables.
  var updateBlock;
  var findWhichToRecolor;
  var whichArray;
  var blockClicked;
  var selectColor;
  var buildBlock;
  var getFactors;
  var createBlocks;
  var clickHandler;
  var keyupHandler;
  var initialize;

  // Element variables.
  var input;
  var button;
  var inputContainer;
  var blockContainer;

  // Regular variables.
  var blocks = [];
  var count;
  var factors;
  var timer;
  var worker;


  updateBlock = function(element, color) {
    element.value = '1';
    element.style.backgroundColor = color;

    return element;
  }

  findWhichToRecolor = function(index, color, array) {
    var top     = blocks[index - factors.columns];
    var right   = blocks[index + 1];
    var bottom  = blocks[index + factors.columns];
    var left    = blocks[index - 1];

    if (index >= factors.columns && top.value !== '1') {
      array.push(updateBlock(top, color));
    }

    if (index % factors.columns !== (factors.columns - 1) && right.value !== '1') {
      array.push(updateBlock(right, color));
    }

    if (index < (count - factors.columns) && bottom.value !== '1') {
      array.push(updateBlock(bottom, color));
    }

    if (index % factors.columns !== 0 && left.value !== '1') {
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

      setTimeout(function() {
        whichArray(nextArray, [], color);
      }, timer);

    }
  }

  /**
   * Event handler for when block element is clicked.
   *
   * @param {Element} self  - The element that was clicked.
   */
  blockClicked = function(self) {
    // Sets block value to 1 so that it can't be clicked again.
    self.value = '1';

    whichArray([self], [], self.style.backgroundColor);
  }


  /* =========================
            Creation
  ========================= */


  /**
   * Selects a random color to color the block element.
   *
   * @returns {String} Returns a hexadecimal color string.
   */
  selectColor = function() {
    /* Selects a random number from 0 to 1 then times that by 16,777,215 then
       rounds down the result to the nearest whole number then converts that
       to a stringified hexadecimal number. */
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  /**
   * Creates an individual block element.
   *
   * @param   {Number}  width   - Width of the block element.
   * @param   {Number}  height  - Height of the block element.
   *
   * @returns {Element} Returns the created block element.
   */
  buildBlock = function(width, height) {
    var element = document.createElement('div');

    // Assigns block element specs.
    element.className             = 'block';
    element.value                 = '0';
    element.style.width           = width;
    element.style.height          = height;
    element.style.backgroundColor = selectColor();

    return element;
  }

  /**
   * Finds the number of columns and rows for the created blocks.
   *
   * @param   {Number}  factor  - Current iterated factor of input count.
   *
   * @returns {Object}  Returns key/value pair of block columns and rows.
   */
  getFactors = function(factor) {
    var other = count / factor;

    // If the other factor is a whole number.
    if (other % 1 === 0) {

      // Then return the columns and rows.
      return {
        columns:  factor,
        rows:     other
      }

    }
    // If the other factor is NOT a whole number.
    else {
      /* Then return the current function recusively called with the current
         factor minus 1. */
      return getFactors(factor - 1);
    }

  }

  /**
   * Creates blocks to append to body.
   */
  createBlocks = function() {
    var fragment  = document.createDocumentFragment();
    var value     = parseInt(input.value);
    var block;
    var width;
    var height;

    // Adds animation to the input button.
    button.className = 'animate';

    // Assigns app variables.
    count   = value = value > 0 ? value : 1;
    factors = getFactors(Math.floor(Math.sqrt(count)));
    timer   = 500 / Math.max(factors[0], factors[1]);
    width   = (100 / factors.columns) + '%';
    height  = (100 / factors.rows) + 'vh';

    // Can run through ~ 25k in 300ms.

    // Builds the block elements.
    while (value > 0) {
      block = buildBlock(width, height);

      // Appends the block to the document fragment.
      fragment.appendChild(block);
      // Adds block to the blocks array.
      blocks.push(block);

      // Decrements the value.
      --value;
    }

    // Adds the hidden class to the input container.
    inputContainer.className = 'input hidden';

    // Removes the animation from the input button.
    button.className = '';

    // Removes the hidden class from the block container.
    blockContainer.className = 'container';

    // Appends block element fragment to DOM.
    blockContainer.appendChild(fragment);
  }


  /* =========================
         Initialization
  ========================= */


  /**
   * Page onclick event handler.
   *
   * @param {Object}  event - The event object.
   */
  clickHandler = function(event) {

    /* If the event target is the button and there are no blocks created then
       create the blocks. */
    if (event.target === button && !blocks.length) {
      createBlocks();
    }
    /* If the event target's class name is 'block' then trigger block clicked
       callback. */
    else if (event.target.className === 'block' && event.target.value === '0') {
      blockClicked(event.target);
    }

  }

  /**
   * Page onkeyup event handler.
   *
   * @param {Object}  event - The event object.
   */
  keyupHandler = function(event) {
    var key     = event.which || event.keyCode || undefined;
    var active  = document.activeElement;

    /* If the enter key is pressed and the input button is not the active
       element then trigger click event on input button. */
    if (key === 13 && active !== button) {
      clickHandler({ target: button });
    }
    /* If the number 1 key is pressed and the input is not the active element
       then select the input element. */
    else if (key === 49 && active !== input) {
      input.select();
    }

  }

  /**
   * Initializes the app.
   */
  initialize = function() {
    document.removeEventListener('DOMContentLoaded', initialize);

    input           = document.getElementById('count');
    button          = document.getElementById('button');
    inputContainer  = document.getElementById('input');
    blockContainer  = document.getElementById('container');

    document.body.addEventListener('click', clickHandler);
    document.body.addEventListener('keyup', keyupHandler);
  }


  // Initializes app when page is loaded.
  document.addEventListener('DOMContentLoaded', initialize);
})();
