joint.setTheme('material');

	var graph = new joint.dia.Graph;
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
					},
					label: {
						text: 'link'
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

document.querySelector('.paper-container').appendChild(paperScroller.el);
	paperScroller.render().center();