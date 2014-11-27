
var distance = function( a, b ) {
	return Math.sqrt(Math.pow( a.x - b.x, 2) + Math.pow( a.y - b.y, 2));
}

var magnetoEffect = { 
	pointWithMagnetoEffect: function( magnetList, radius, point ) {
		var minIndex = 0;
		var minDistance = Number.POSITIVE_INFINITY;
		for (var i = 0; i < magnetList.length; i++) {
			var p = magnetList[i];
			var dist = this.distance(p, point);
			if (minDistance > dist) {
				minIndex = i;
				minDistance = dist;
			}
		}
		if (minDistance <= radius) {
			return magnetList[minIndex];
		} else {
			return point;
		}
	}
};

// here comes the functional
var magnetoEffectFunc = {
	pointWithMagnetoEffect: function( magnetList, radius, point ) {
		var distances = magnetList.map(function (p) {
			return {point: p, dist: distance(p, point)};
		}).sort(function (a, b) {
			return a.dist - b.dist;
		});
		if ( distances.length > 0 && distances[0].dist <= radius) {
			return distances[0].point;
		} else {
			return point;
		}
	}
}

module.exports.magnetoEffect = magnetoEffectFunc;