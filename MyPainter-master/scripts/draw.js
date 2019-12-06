
var lock = false;
var source = null;
var target = null;

var graph = new joint.dia.Graph;
var paper = new joint.dia.Paper({
	el: document.getElementById('myholder'),
	model: graph,
	width: 600,
	height: 200,
	gridSize: 1,
	drawGrid: true,
	background: {
		color: 'whitesmoke'
	},
	linkView: joint.dia.LinkView.extend({
		pointerdblclick: function(evt, x, y) {
			this.model.remove();
		}
	})
});

//joint.setTheme('dark');

//joint.setTheme('modern');
//joint.setTheme('default');

function drawInterface(source, target) {
	joint.dia.Link.define('interface.CustomLink', {
		attrs: {
			line: {
				connection: true,
				stroke: '#333333',
				strokeWidth: 2,
				strokeLinejoin: 'round'
			},
			wrapper: {
				connection: true,
				strokeWidth: 10,
				strokeLinejoin: 'round'
			}
		}
	}, {
		markup: [{
			tagName: 'path',
			selector: 'wrapper',
			attributes: {
				'fill': 'none',
				'cursor': 'pointer',
				'stroke': 'transparent'
			}
		}, {
			tagName: 'path',
			selector: 'line',
			attributes: {
				'fill': 'none',
				'pointer-events': 'none'
			}
		}]
	});
	var link = new joint.shapes.interface.CustomLink();
	link.source(source);
	link.target(target);
	link.addTo(graph);
}

function drawReference(source, target) {
	joint.dia.Link.define('reference.CustomLink', {
		attrs: {
			line: {
				connection: true,
				stroke: '#333333',
				strokeWidth: 2,
				strokeLinejoin: 'round',
				strokeDasharray: '5 5',
				strokeDashoffset: '2.5'
			},
			wrapper: {
				connection: true,
				strokeWidth: 10,
				strokeLinejoin: 'round'
			}
		}
	}, {
		markup: [{
			tagName: 'path',
			selector: 'wrapper',
			attributes: {
				'fill': 'none',
				'cursor': 'pointer',
				'stroke': 'transparent'
			}
		}, {
			tagName: 'path',
			selector: 'line',
			attributes: {
				'fill': 'none',
				'pointer-events': 'none'
			}
		}]
	});
	var link = new joint.shapes.reference.CustomLink();
	link.source(source);
	link.target(target);
	link.addTo(graph);
}

function drawConstraint(source, target) {
	joint.dia.Link.define('constraint.CustomLink', {
		attrs: {
			line: {
				connection: true,
				stroke: '#333333',
				strokeWidth: 2,
				strokeLinejoin: 'round',
				strokeDasharray: '5 5',
				strokeDashoffset: '2.5',
				targetMarker: {
					'type': 'path',
					'd': 'M 10 -5 0 0 10 5 z'
				}
			},
			wrapper: {
				connection: true,
				strokeWidth: 10,
				strokeLinejoin: 'round'
			}
		}
	}, {
		markup: [{
			tagName: 'path',
			selector: 'wrapper',
			attributes: {
				'fill': 'none',
				'cursor': 'pointer',
				'stroke': 'transparent'
			}
		}, {
			tagName: 'path',
			selector: 'line',
			attributes: {
				'fill': 'none',
				'pointer-events': 'none'
			}
		}]
	});
	var link = new joint.shapes.constraint.CustomLink();
	link.source(source);
	link.target(target);
	link.addTo(graph);
}

function drawRequirement(rname) {
	if (requirement.id != null) {
		joint.ui.FlashMessage.open('requirement existed!','',{type:'alert',closeAnimation:{delay:3000}});
		return;
	}
	rname = typeof(rname) != 'undefined' ? rname : "requirement";
	var CustomElement = joint.dia.Element.define('requirement.CustomElement', {
		attrs: {
			label: {
				fill: 'black'
			},
			body: {
				ref: 'label',
				refRx: '60%',
				refRy: '150%',
			},
			button: {
				cursor: 'pointer',
				ref: 'buttonLabel',
				refWidth: '150%',
				refHeight: '150%',
				refX: '-25%',
				refY: '-25%'

			},
			buttonLabel: {
				pointerEvents: 'none',
				ref: 'body',
				refX: '90%',
				refY: '30',
				y: -20,
				textAnchor: 'middle',
				textVerticalAnchor: 'middle'
			}
		}
	}, {
		markup: [{
			tagName: 'ellipse',
			selector: 'body'
		}, {
			tagName: 'text',
			selector: 'label'
		}, {
			tagName: 'rect',
			selector: 'button'
		}, {
			tagName: 'text',
			selector: 'buttonLabel'
		}]
	});
	var element = new CustomElement();
	element.attr({
		label: {
			text: rname,
			textVerticalAnchor: 'middle',
			textAnchor: 'middle',
			refX: '0%',
			refY: '0%',
			visibility: 'visible'
		},
		body: {
			strokeWidth: 1,
			stroke: 'black',
			fill: 'white',
			strokeDasharray: '5 5',
			strokeDashoffset: '2.5',
			visibility: 'visible'
		},
		button: {
			event: 'element:button:pointerdown',
			fill: 'white',
			stroke: 'black',
			strokeWidth: 1,
			visibility: 'visible'
		},
		buttonLabel: {
			text: ' X ', // fullwidth underscore
			fill: 'black',
			fontSize: 6,
			fontWeight: 'bold',
			visibility: 'visible'
		}
	});
	element.position(300, 150);
	element.resize(60, 30);
	element.addTo(graph);
	var models = paper.model.attributes.cells.models;
	requirement.id = models[models.length - 1].id;
}

function drawProblemDomain(pname) {
	pname = typeof(pname) != 'undefined' ? pname : "problem domain";
	var CustomElement = joint.dia.Element.define('domain.CustomElement', {
		attrs: {
			label: {
				fill: 'black'
			},
			description: {
				visibility: 'hidden'
			},
			body: {
				strokeWidth: 1,
				stroke: '#000000',
				fill: 'white'
			},
			button: {
				ref: 'buttonLabel',
				cursor: 'pointer',
				refWidth: '150%',
				refHeight: '150%',
				refX: '-25%',
				refY: '-25%'
			},
			buttonLabel: {
				pointerEvents: 'none',
				textAnchor: 'middle',
				textVerticalAnchor: 'middle'
			}
		}
	}, {
		markup: [{
			tagName: 'rect',
			selector: 'body'
		}, {
			tagName: 'text',
			selector: 'label'
		}, {
			tagName: 'rect',
			selector: 'button'
		}, {
			tagName: 'text',
			selector: 'buttonLabel'
		}, {
			tagName: 'text',
			selector: 'description'
		}]
	});
	var element = new CustomElement();
	element.attr({
		label: {
			text: pname,
			textVerticalAnchor: 'middle',
			textAnchor: 'middle',
		},
		description: {
			text: null
		},
		body: {
			ref: 'label',
			refWidth: '110%',
			refHeight: '300%',
			refX: '-5%',
			refY: '-90%'
		},
		button: {
			event: 'element:button:pointerdown',
			fill: 'white',
			stroke: 'black',
			strokeWidth: 1
		},
		buttonLabel: {
			ref: 'body',
			refX: '100%',
			refY: '0%',
			text: ' X ', // fullwidth underscore
			fill: 'black',
			fontSize: 6,
			fontWeight: 'bold'
		}
	});
	element.position(300, 150);
	element.resize(130, 50);
	element.addTo(graph);
	updateElement();
	var models = paper.model.attributes.cells.models;
	domainList.item.push({
		id: models[models.length - 1].id
	})
}

var textBlock = new joint.shapes.standard.TextBlock();
textBlock.resize(100, 100);
textBlock.position(250, 610);
textBlock.attr('root/title', 'joint.shapes.standard.TextBlock');
textBlock.attr('body/fill', 'lightgray');
textBlock.attr('label/text', 'Hyper Text Markup Language');
// Styling of the label via `style` presentation attribute (i.e. CSS).
textBlock.attr('label/style/color', 'red');
textBlock.addTo(graph)

function drawMachine(mname) {
	if (machine.id != null) {
		alert('machine existed!');
		return;
	}
	mname = typeof(mname) != 'undefined' ? mname : "machine";
	var CustomElement = joint.dia.Element.define('machine.CustomElement', {
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
			},
			button: {
				ref: 'buttonLabel',
				cursor: 'pointer',
				refWidth: '150%',
				refHeight: '150%',
				refX: '-25%',
				refY: '-25%'
			},
			buttonLabel: {
				pointerEvents: 'none',
				textAnchor: 'middle',
				textVerticalAnchor: 'middle'
			}
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
			tagName: 'rect',
			selector: 'button'
		}, {
			tagName: 'text',
			selector: 'buttonLabel'
		}, {
			tagName: 'text',
			selector: 'description'
		}]
	});
	var element = new CustomElement();
	element.attr({
		label: {
			text: mname
		},
		description: {
			text: null
		},
		r1: {
			ref: 'r3',
			refWidth: '100%',
			refHeight: '100%',
			refX: '0%',
			refY: '0%',
			x: -20
		},
		r2: {
			ref: 'r3',
			refWidth: '100%',
			refHeight: '100%',
			refX: '0%',
			refY: '0%',
			x: -10
		},
		r3: {
			ref: 'label',
			refWidth: '110%',
			refHeight: '300%',
			refX: '-5%',
			refY: '-90%'
		},
		button: {
			event: 'element:button:pointerdown',
			fill: 'white',
			stroke: 'black',
			strokeWidth: 1
		},
		buttonLabel: {
			ref: 'r3',
			refX: '100%',
			refY: '0%',
			text: ' X ', // fullwidth underscore
			fill: 'black',
			fontSize: 6,
			fontWeight: 'bold'
		}
	});
	element.position(280, 130);
	element.resize(80, 50);
	element.addTo(graph);
	updateElement();
	var models = paper.model.attributes.cells.models;
	machine.id = models[models.length - 1].id;
}

function changeReferenceToConstraint(linkView) {
	var link = linkView.model;
	link.attr({
		line: {
			targetMarker: {
				'type': 'path',
				'd': 'M 10 -5 0 0 10 5 z'
			}
		}});
}
