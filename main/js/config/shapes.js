joint.dia.Element.define('machine.entity', {
		attrs: {
			label: {
				fill: 'black'
			},
			description: {
				visibility: 'hidden'
			},
			r1: {
				strokeWidth: 1,
				stroke: '#000000',
				fill: 'white'
			},
			r2: {
				strokeWidth: 1,
				stroke: '#000000',
				fill: 'white'
			},
			r3: {
				strokeWidth: 1,
				stroke: '#000000',
				fill: 'white'
			}
		},
		size: {
			height: 70,
			width: 70
		}
	}, {
		markup: [{
			tagName: 'rect',
			selector: 'r1'
		}, {
			tagName: 'rect',
			selector: 'r2'
		}, {
			tagName: 'rect',
			selector: 'r3'
		}, {
			tagName: 'text',
			selector: 'label'
		}, {
			tagName: 'text',
			selector: 'description'
		}]
	});
	joint.dia.Element.define('domain.entity', {
		attrs: {
			label: {
				fill: 'black'
			},
			description: {
				visibility: 'hidden'
			},
			type: {
				fill: 'black',
				'font-weight': 'bold',
				'font-size': 7
			},
			designOrNot: {
				strokeWidth: 1,
				stroke: '#000000',
				fill: 'white',
				visibility: 'hidden'
			},
			body: {
				strokeWidth: 1,
				stroke: '#000000',
				fill: 'white',
			}
		},
		markup: [{
			tagName: 'rect',
			selector: 'designOrNot'
		}, {
			tagName: 'rect',
			selector: 'body'
		}, {
			tagName: 'text',
			selector: 'label'
		}, {
			tagName: 'text',
			selector: 'description'
		}, {
			tagName: 'text',
			selector: 'type'
		}]
	});
	joint.dia.Element.define('requirement.entity', {
		attrs: {
			label: {
				fill: 'black'
			},
			body: {
				strokeWidth: 1,
				stroke: 'black',
				fill: 'white',
				strokeDasharray: '5 5',
				strokeDashoffset: '2.5',
				visibility: 'visible'
			}
		}
	}, {
		markup: [{
			tagName: 'ellipse',
			selector: 'body'
		}, {
			tagName: 'text',
			selector: 'label'
		}]
	})
