// 定义了theme/graph/paper和被我删掉的缩放功能 里面还有一些不知所云的东西
{
	joint.setTheme('material');

	var graph = new joint.dia.Graph;


	var paper = new joint.dia.Paper({
		width: 1000,
		height: 1000,
		gridSize: 10,
		drawGrid: true,
		model: graph, // Set graph as the model for paper
		defaultLink: function(elementView, magnet) {
			return new joint.shapes.standard.Link({
				attrs: {
					line: {
						stroke: 'white'
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

//中间的框框
{
	document.querySelector('.paper-container').appendChild(paperScroller.el);
	paperScroller.render().center();
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
			closed:true,
			height:1/3
		},
		step4: {
			index: 4,
			label: '4. create requirement',
			height: 80
		},
		step5: {
			index: 5,
			label: '5. add references & constraint',
			height:1/3
		},
		step6:{
			index:6,
			height:297,
			label:'  '
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
		for(i=0;i<models.length-1;i++)
		{
			if(models[i].attributes.type == 'machine.entity') {
				joint.ui.FlashMessage.open('Machine already existed!','',{type:'alert',closeAnimation:{delay:3000}});
				cell.remove();
				break;
			}
		}
	}else if(opt.stencil && cell.attributes.type == 'requirement.entity') {
		for(i=0;i<models.length-1;i++)
		{
			if(models[i].attributes.type == 'requirement.entity') {
				joint.ui.FlashMessage.open('requirement already existed!','',{type:'alert',closeAnimation:{delay:3000}});
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
	step3:[],
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
{
	paper.on('element:pointerclick', function(elementView) {
		joint.ui.Inspector.create('.inspector-container', {
			cell: elementView.model,
			inputs: {
				'attrs/label/text': {
					type: 'text',
					label: 'Label',
					group: 'basic',
					index: 1
				},
				level: {
					type: 'range',
					min: 1,
					max: 10,
					unit: 'x',
					defaultValue: 6,
					label: 'Level',
					group: 'advanced',
					index: 2
				}
			},
			groups: {
				basic: {
					label: 'Basic',
					index: 1
				},
				advanced: {
					label: 'Advanced',
					index: 2
				}
			}
		});
	});

	// 点element显示的东西,还有一个不知道干啥的halo
	paper.on('element:pointerclick', function(elementView) {
		var handles = [{
			name: 'remove',
			position: 'nw',
			events: {
				pointerdown: 'removeElement'
			}
		}, {
			name: 'myCustomAction',
			position: 'ne',
			icon: 'data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7'
		}];
		if (!elementView.model.hasPorts()) {
			// Only shapes without ports will have the "link" handle in the Halo control panel. Shapes with ports can be connected by "dragging" ports.
			handles.push({
				name: 'link',
				position: 'e',
				events: {
					pointerdown: 'startLinking',
					pointermove: 'doLink',
					pointerup: 'stopLinking'
				}
			});
		}
		var halo = new joint.ui.Halo({
			cellView: elementView,
			handles: handles
		}).render();

		halo.on('action:myCustomAction:pointerdown', function(evt) {
			alert('My Control Button Clicked!');
		});
	});

	// 点link显示link上的tool
	paper.on('link:pointerup', function(linkView) {
		paper.removeTools();
		var toolsView = new joint.dia.ToolsView({
			name: 'my-link-tools',
			tools: [
				new joint.linkTools.Vertices(),
				new joint.linkTools.SourceArrowhead(),
				new joint.linkTools.TargetArrowhead(),
				new joint.linkTools.Segments,
				new joint.linkTools.Remove({
					offset: -20,
					distance: 40
				})
			]
		});
		linkView.addTools(toolsView);
	});
	//点空白处
	paper.on('blank:pointerdown', function() {
		paper.removeTools();
	});
}

//上面的框框
{
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
				text: 'Clear Diagram'
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
			 { type: 'zoom-out', name: 'zoom-out', group: 'zoom' },
			 { type: 'zoom-in', name: 'zoom-in', group: 'zoom' }
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
			if (models[i].attributes.type == "requirement.CustomElement") {
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
		joint.ui.FlashMessage.open('succeed in problem!', '', {
			type: 'alert',
			closeAnimation: {
				delay: 3000
			}
		});
		return;
	}

	function showContextDiagram() {
		var models = paper.model.attributes.cells.models;
		for (var i = 0; i < models.length; i++) {
			if (models[i].attributes.type == "requirement.CustomElement") {
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
		joint.ui.FlashMessage.open('succeed in context!', '', {
			type: 'alert',
			closeAnimation: {
				delay: 3000
			}
		});
		return;
	}
}


// 没用过的功能
// {
// 	var myShape = new joint.shapes.machine.entity({
// 		size: {
// 			width: 100,
// 			height: 100
// 		},
// 		position: {
// 			x: 50,
// 			y: 50
// 		},
// 		attrs: {
// 			label: {
// 				text: 'My machine'
// 			}
// 		},
// 	});
// 	graph.addCell(myShape);

// 	// Get element from the graph and change its properties.
// 	myShape = graph.getElements()[0];
// 	myShape.prop('attrs/label/text', 'My Updated Shape');
// 	myShape.prop('size/width', 150);
// 	myShape.prop('level', 2);
// 	myShape.prop('attrs/body/fill', '#FE854F');

// 	// Create a clone of an element.
// 	var myShape2 = myShape.clone();
// 	myShape2.translate(400, 0);
// 	graph.addCell(myShape2);

// 	// Create a link that connects two elements.
// 	var myLink = new joint.shapes.standard.Link({
// 		attrs: {
// 			line: {
// 				stroke: 'white'
// 			}
// 		},
// 		source: {
// 			id: myShape.id,
// 			port: 'out1'
// 		},
// 		target: {
// 			id: myShape2.id,
// 			port: 'in1'
// 		}
// 	});
// 	graph.addCell(myLink);

// 	// React on changes in the graph.
// 	// graph.on('change add remove', function() {
// 	// 	var diagramJsonString = JSON.stringify(graph.toJSON());
// 	// 	console.log('Diagram JSON', diagramJsonString);
// 	// });
// 	graph.on('change:level', function(cell, level) {
// 		var color = (level > 8) ? 'red' : 'white';
// 		cell.prop('attrs/body/fill', color);
// 	});
// }
