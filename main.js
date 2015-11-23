(function () {
	var body = document.body,
			container = document.getElementById('main'),
			_sqrt = Math.sqrt,
			_floor = Math.floor,
			_random = Math.random,
			otherFactor,
			columns,
			input,
			blocks,
			current,
			top,
			right,
			bottom,
			left;

	function updateBlock (self, color) {
		self.style.backgroundColor = color;
		self.value = '1';
		self.onclick = null;
		return self;
	}

	function findWhichToRecolor (index, color, array) {
		top = blocks[index - columns];
		right = blocks[index + 1];
		bottom = blocks[index + columns];
		left = blocks[index - 1];

		if (index >= columns && top.value != '1') {
			array.push(updateBlock(top, color));
		}

		if (index % columns !== (columns - 1) && right.value != '1') {
			array.push(updateBlock(right, color));
		}

		if (index < (input - columns) && bottom.value != '1') {
			array.push(updateBlock(bottom, color));
		}

		if (index % columns !== 0 && left.value != '1') {
			array.push(updateBlock(left, color));
		}

		return array;
	}

	function whichArray (currentArray, nextArray, color) {
		if (currentArray.length > 0) {
			nextArray = findWhichToRecolor(blocks.indexOf(currentArray[0]), color, nextArray);
			currentArray.shift();
			whichArray(currentArray, nextArray, color);
		} else if (nextArray.length > 0) {
			setTimeout(function () {
				whichArray(nextArray, [], color);
			}, 75);
		}
	}

	function buildBlock (block, factors) {
		block.className = 'block';
		block.value = '0';
		block.style.width = (100 / factors[0]) + '%';
		block.style.height = (100 / factors[1]) + '%';
		block.style.backgroundColor = '#' + _floor(_random() * 16777215).toString(16);
		block.onclick = blockOnClick;

		container.appendChild(block);
		
		return block;
	}

	function getFactors (input, factor) {
		columns = factor;
		otherFactor = (input / factor);

		return otherFactor % 1 === 0 ? [factor, otherFactor] : getFactors(input, --factor);
	}

	function createBlocks (input, id, blocks, factors) {
		if (id < input) {
			factors = factors || getFactors(input, _floor(_sqrt(input)));
			blocks.push(buildBlock(document.createElement('div'), factors));
			return createBlocks(input, ++id, blocks, factors);
		} else {
			return blocks;
		}
	}

	function blockOnClick () {
		this.value = '1';
		this.blockOnClick = null;
		whichArray([this], [], this.style.backgroundColor);
	}

	input = prompt('How many blocks do you want?');
	blocks = createBlocks(input, 0, []);

})();
