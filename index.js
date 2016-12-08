;(function() {
  var input;
  var button;
  var inputContainer;
  var blockContainer;
  var blocks = [];
  var count;
  var factors;
  var timer;


  function updateBlock(element, color) {
    element.style.backgroundColor = color;
    element.setAttribute('data-changed', 't');

    return element;
  }

  function addBlocksToQueue(index, color) {
    var top = blocks[index - factors.columns];
    var right = blocks[index + 1];
    var bottom = blocks[index + factors.columns];
    var left = blocks[index - 1];
    var queue = [];

    if (index >= factors.columns && top.getAttribute('data-changed') !== 't') {
      queue.push(updateBlock(top, color));
    }

    if (index % factors.columns !== (factors.columns - 1) && right.getAttribute('data-changed') !== 't') {
      queue.push(updateBlock(right, color));
    }

    if (index < (count - factors.columns) && bottom.getAttribute('data-changed') !== 't') {
      queue.push(updateBlock(bottom, color));
    }

    if (index % factors.columns !== 0 && left.getAttribute('data-changed') !== 't') {
      queue.push(updateBlock(left, color));
    }

    return queue;
  }

  function updateBlocksInQueue(queue, color) {
    var upcomingQueue = [];

    for (var i = 0; i < queue.length; ++i) {
      var index = blocks.indexOf(queue[i]);

      upcomingQueue = upcomingQueue.concat(addBlocksToQueue(index, color));
    }

    if (upcomingQueue.length) {
      setTimeout(function() { updateBlocksInQueue(upcomingQueue, color); }, timer);
    } else if (!document.querySelectorAll('.block[data-changed="f"]').length) {
      setTimeout(resetBoard, 5000);
    }
  }

  function blockClicked(self) {
    self.setAttribute('data-changed', 't');

    updateBlocksInQueue([self], self.style.backgroundColor);
  }

  function selectColor() {
    // Selects a random number from 0 to 1 then times that by 16,777,215 then
    // rounds down the result to the nearest whole number then converts that
    // to a stringified hexadecimal number.
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  function buildBlock(width, height) {
    var element = document.createElement('div');

    element.className = 'block';
    element.style.width = width;
    element.style.height = height;
    element.style.backgroundColor = selectColor();
    element.setAttribute('data-changed', 'f');

    return element;
  }

  function getFactors() {
    var factor = Math.floor(Math.sqrt(count));
    var other = count / factor;

    while (other % 1 !== 0) {
      factor -= 1;
      other = count / factor;
    }

    return {
      columns: factor,
      rows: other
    }
  }

  function createBlocks() {
    var fragment = document.createDocumentFragment();
    var value = parseInt(input.value);

    count = value = value > 0 ? value : 1;
    factors = getFactors();
    timer = 500 / Math.max(factors.columns, factors.rows);

    var width = (100 / factors.columns) + '%';
    var height = (100 / factors.rows) + 'vh';

    while (value > 0) {
      var block = buildBlock(width, height);

      fragment.appendChild(block);
      blocks.push(block);

      value -= 1;
    }

    inputContainer.classList.toggle('hidden');
    blockContainer.classList.toggle('hidden');
    blockContainer.appendChild(fragment);
  }

  function resetBoard() {
    input.value = '';

    inputContainer.classList.toggle('hidden');
    blockContainer.classList.toggle('hidden');

    while (blockContainer.firstChild) {
      blockContainer.removeChild(blockContainer.firstChild);
    }

    input.select();

    blocks = [];
    count = undefined;
    factors = undefined;
    timer = undefined;
  }

  function clickHandler(event) {
    var target = event.target;

    if (target === button && !blocks.length) {
      createBlocks();
    } else if (target.className === 'block' && target.getAttribute('data-changed') === 'f') {
      blockClicked(target);
    }
  }

  function keyupHandler(event) {
    var key = event.which || event.keyCode || undefined;
    var active = document.activeElement;

    if (key === 13 && active !== button) {
      clickHandler({ target: button });
    } else if (key === 49 && active !== input) {
      input.select();
    } else if (key === 27) {
      resetBoard();
    }
  }

  function initialize() {
    document.removeEventListener('DOMContentLoaded', initialize);

    input = document.getElementById('count');
    button = document.getElementById('button');
    inputContainer = document.getElementById('input');
    blockContainer = document.getElementById('container');

    document.body.addEventListener('click', clickHandler);
    document.body.addEventListener('keyup', keyupHandler);

    input.select();
  }


  document.addEventListener('DOMContentLoaded', initialize);
}());
