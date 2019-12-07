// 定义了theme/graph/paper和被我删掉的缩放功能 里面还有一些不知所云的东西
{
	joint.setTheme('material');

	var graph = new joint.dia.Graph;

	joint.dia.Link.define('interface.CustomLink', {
		attrs: {
			line: {
				connection: true,
				strokeWidth: 2,
				strokeLinejoin: 'round'
			},
			wrapper: {
				connection: true,
				strokeWidth: 10,
				strokeLinejoin: 'round'
			},
			source: {
				visibility: 'hidden'
			},
			target: {
				visibility: 'hidden'
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
		}, {
			tagName: 'text',
			selector: 'source'
		}, {
			tagName: 'text',
			selector: 'target'
		}]
	});

	var paper = new joint.dia.Paper({
		width: 1000,
		height: 1000,
		gridSize: 10,
		drawGrid: true,
		model: graph, // Set graph as the model for paper
		defaultLink: function(elementView, magnet) {
			return new joint.shapes.interface.CustomLink({
				attrs: {
					line: {
						stroke: '#717d98'
					},
					source: {
						text: null
					},
					target: {
						text: null
					}
				}
			});
		},
		interactive: {
			linkMove: false
		},
		snapLinks: {
			radius: 70
		},
		defaultConnectionPoint: {
			name: 'boundary'
		}
	});

	var paperScroller = new joint.ui.PaperScroller({
		paper: paper,
		autoResizePaper: true,
		cursor: 'grab'
	});
}

function changeReferenceAndConstraint(link) {
	if (link.attributes.type == 'reference.CustomLink') {
		link.attr({
			line: {
				targetMarker: {
					'type': 'path',
					'd': 'M 10 -5 0 0 10 5 z'
				}
			}
		});
		link.attributes.type = 'constraint.CustomLink';
	} else if (link.attributes.type == 'constraint.CustomLink') {
		link.attr({
			line: {
				targetMarker: {
					'type':null,
					'd':null
				}
			}
		});
		link.attributes.type = 'reference.CustomLink';
	}

}

function changeInterfaceToReference(link) {
	link.attr({
		line: {
			strokeDasharray: '5 5',
			strokeDashoffset: '2.5'
		}
	});
	link.attributes.type = 'reference.CustomLink';
}


//中间的框框
{
	document.querySelector('.paper-container').appendChild(paperScroller.el);
	paperScroller.render().center();
}

function updateLink(linkView) {
	var link = linkView.model;
	var sourceName = getLabelById(link.attributes.source.id);
	var targetName = getLabelById(link.attributes.target.id);
	link.attr({
		source: {
			text: sourceName
		},
		target: {
			text: targetName
		}
	});
}

// 自定义图形
{
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
			body: {
				strokeWidth: 1,
				stroke: '#000000',
				fill: 'white'
			}
		},
		markup: [{
			tagName: 'rect',
			selector: 'body'
		}, {
			tagName: 'text',
			selector: 'label'
		}, {
			tagName: 'text',
			selector: 'description'
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
}

//神奇不知道干啥的stencil
var stencil = new joint.ui.Stencil({
	paper: paperScroller,
	scaleClones: true,
	label: 'Element',
	width: 240,
	groups: {
		step1: {
			index: 1,
			label: '1. create a machine',

		},
		step2: {
			index: 2,
			label: '2. create problem domains',
		},
		step3: {
			index: 3,
			label: '3. add interfaces',
			closed: true,
			height: 1 / 3
		},
		step4: {
			index: 4,
			label: '4. create requirement',
			height: 80
		},
		step5: {
			index: 5,
			label: '5. add references & constraint',
			height: 1 / 3
		},
		step6: {
			index: 6,
			height: 297,
			label: '  '
		}

	},
	dropAnimation: true,
	// groupsToggleButtons: true,
	layout: {
		columnWidth: 240,
		columns: 1
	}
});

graph.on('add', function(cell, collection, opt) {
	var models = paper.model.attributes.cells.models;
	if (opt.stencil && cell.attributes.type == 'machine.entity') {
		for (i = 0; i < models.length - 1; i++) {
			if (models[i].attributes.type == 'machine.entity') {
				joint.ui.FlashMessage.open('Machine already existed!', '', {
					type: 'alert',
					closeAnimation: {
						delay: 3000
					}
				});
				cell.remove();
				break;
			}
		}
	} else if (opt.stencil && cell.attributes.type == 'requirement.entity') {
		for (i = 0; i < models.length - 1; i++) {
			if (models[i].attributes.type == 'requirement.entity') {
				joint.ui.FlashMessage.open('requirement already existed!', '', {
					type: 'alert',
					closeAnimation: {
						delay: 3000
					}
				});
				cell.remove();
				break;
			}
		}
	}
});

//左边的框框
document.querySelector('.stencil-container').appendChild(stencil.el);
stencil.render().load({
	step1: [{
		type: 'machine.entity',
		attrs: {
			label: {
				text: 'machine'
			},
			description: {
				text: null,
				y: 3
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
			}
		}
	}],
	step2: [{
		type: 'domain.entity',
		attrs: {
			label: {
				text: 'problemDomain',
				x: -31
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
			}
		}
	}],
	step3: [],
	step4: [{
		type: 'requirement.entity',
		attrs: {
			label: {
				text: 'requirement',
				visibility: 'visible',
				y: 20,
				x: -18
			},
			body: {
				ref: 'label',
				refRx: '60%',
				refRy: '150%',
				refX: '50%',
				refY: '50%'
			}
		}
	}]
});

// 点击显示的东西和右面的框框
paper.on('element:pointerclick', function(elementView) {
	joint.ui.Inspector.create('.inspector-container', {
		cell: elementView.model,
		inputs: {
			attrs: {
				label: {
					text: {
						type: 'textarea',
						label: 'NAME',
						group: 'edit',
						index: 1
					}
				},
				description: {
					text: {
						type: 'textarea',
						label: 'DESCRIPTION',
						group: 'edit',
						index: 2
					}
				}

			}
		},
		groups: {
			edit: {
				label: 'ELEMENT',
				index: 1
			}
		}
	});
});

paper.on('link:pointerclick', function(linkView) {
	updateLink(linkView);
	joint.ui.Inspector.create('.inspector-container', {
		cell: linkView.model,
		inputs: {
			attrs: {
				source: {
					text: {
						type: 'content-editable',
						label: 'SOURCE',
						group: 'edit',
						index: 1
					}
				},
				target: {
					text: {
						type: 'content-editable',
						label: 'TARGET',
						group: 'edit',
						index: 2
					}
				}

			}
		},
		groups: {
			edit: {
				label: 'LINK',
				index: 1
			}
		}
	});
});

function getTypeById(id) {
	var models = paper.model.attributes.cells.models;
	for (i = 0; i < models.length; i++) {
		if (models[i].id == id) return models[i].attributes.type;
	}
}

function getLabelById(id) {
	var models = paper.model.attributes.cells.models;
	for (i = 0; i < models.length; i++) {
		if (models[i].id == id) return models[i].attributes.attrs.label.text;
	}
}

// 点element显示的东西,还有一个不知道干啥的halo
paper.on('element:pointerclick', function(elementView) {
	var handles = [{
		name: 'remove',
		position: 'nw',
		events: {
			pointerdown: 'removeElement'
		}
	}];
	handles.push({
		name: 'link',
		position: 'e',
		events: {
			pointerdown: 'startLinking',
			pointermove: 'doLink',
			pointerup: 'stopLinking'
		}
	});
	var halo = new joint.ui.Halo({
		cellView: elementView,
		handles: handles
	}).render();

	halo.on('action:link:add', function(link) {
		var sourceId = link.get('source').id;
		var targetId = link.get('target').id;
		var sourceType = getTypeById(sourceId);
		var targetType = getTypeById(targetId);

		if (!sourceId || !targetId || (sourceType == 'domain.entity' && targetType == 'domain.entity') || (sourceType ==
				'machine.entity' && targetType == 'requirement.entity') || (sourceType == 'requirement.entity' && targetType ==
				'machine.entity')) {
			link.remove();
		} else if ((sourceType ==
				'domain.entity' && targetType == 'requirement.entity') || (sourceType == 'requirement.entity' && targetType ==
				'domain.entity')) {
			changeInterfaceToReference(link);
		}
	});
});

// 点link显示link上的tool
paper.on('link:pointerup', function(linkView) {
	paper.removeTools();
	var toolsView = new joint.dia.ToolsView({
		name: 'my-link-tools',
		tools: [
			new joint.linkTools.Remove({
				offset: -20,
				distance: 40
			})
		]
	});
	linkView.addTools(toolsView);
	var link = linkView.model;
	if (link.attributes.type == 'reference.CustomLink' || link.attributes.type == 'constraint.CustomLink') {
		var handles = [{
			name: 'change',
			position: 'ne',
			icon: 'data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7'
		}];
		var halo = new joint.ui.Halo({
			cellView: linkView,
			handles: handles
		}).render();
		halo.on('action:change:pointerdown', function(evt) {
			changeReferenceAndConstraint(link);
		});
	}





});
//点空白处
paper.on('blank:pointerdown', function() {
	paper.removeTools();
});

//上面的框框
var toolbar = new joint.ui.Toolbar({
	groups: {
		clear: {
			index: 1
		},
		zoom: {
			index: 2
		}
	},
	tools: [{
			type: 'button',
			name: 'clear',
			group: 'clear',
			text: 'New Project'
		},
		{
			type: 'button',
			name: 'problem',
			group: 'problem',
			text: 'Problem Diagram'
		},
		{
			type: 'button',
			name: 'context',
			group: 'context',
			text: 'Context Diagram'
		},
		{
			type: 'zoom-out',
			name: 'zoom-out',
			group: 'zoom'
		},
		{
			type: 'zoom-in',
			name: 'zoom-in',
			group: 'zoom'
		}
	],
	references: {
		paperScroller: paperScroller // built in zoom-in/zoom-out control types require access to paperScroller instance
	}
});
toolbar.on({
	'clear:pointerclick': graph.clear.bind(graph)
});
toolbar.on('problem:pointerclick', function(event) {
	showProblemDiagram();
});
toolbar.on('context:pointerclick', function(event) {
	showContextDiagram();
});

document.querySelector('.toolbar-container').appendChild(toolbar.el);
toolbar.render();

function showProblemDiagram() {
	var models = paper.model.attributes.cells.models;
	for (var i = 0; i < models.length; i++) {
		if (models[i].attributes.type == "requirement.entity") {
			models[i].attr('label/visibility', 'hidden');
			models[i].attr('body/visibility', 'hidden');
			models[i].attr('button/visibility', 'hidden');
			models[i].attr('buttonLabel/visibility', 'hidden');
		} else if (models[i].attributes.type == "reference.CustomLink") { //constraint.CustomLink
			models[i].attr('line/visibility', 'hidden')
		} else if (models[i].attributes.type == "constraint.CustomLink") {
			models[i].attr('line/visibility', 'hidden');
		}
	}
}

function showContextDiagram() {
	var models = paper.model.attributes.cells.models;
	for (var i = 0; i < models.length; i++) {
		if (models[i].attributes.type == "requirement.entity") {
			models[i].attr('label/visibility', 'visible');
			models[i].attr('body/visibility', 'visible');
			models[i].attr('button/visibility', 'visible');
			models[i].attr('buttonLabel/visibility', 'visible');
		} else if (models[i].attributes.type == "reference.CustomLink") {
			models[i].attr('line/visibility', 'visible')
		} else if (models[i].attributes.type == "constraint.CustomLink") {
			models[i].attr('line/visibility', 'visible');
		}
	}
}
