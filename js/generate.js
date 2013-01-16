var generator = {
	lastResult : null,

	generate : function () {
		var availableRoots = ['meth','eth','prop','but','pent','hex','hept','oct'];
		var availableBindings = ["an","en","yn"];
		var availablePrefixes = ['','cyclo','benzen'];

		var root = generator.randomNumber(availableRoots.length);

		var element = {
			"root" : root,
			"bindingSuffix" : 0,
			"prefix" : generator.randomNumber(availablePrefixes.length),
			"alchohol" : false,
		};

		var elementObjects = [];

		for (var i = 0; i <= root; i++) {
			var binding = generator.randomNumber(availableBindings.length);

			if (binding > element.bindingSuffix) {
				element.bindingSuffix = binding;
			}
		};

		if (generator.randomNumber(10) > 5) {
			element.alchohol = true;
		}

		element.bindingSuffix = availableBindings[element.bindingSuffix];
		element.root = availableRoots[element.root];
		element.prefix = availablePrefixes[element.prefix];

		console.log(element);
	},

	randomNumber : function (max) {
		return Math.floor(Math.random() * max)
	}
}