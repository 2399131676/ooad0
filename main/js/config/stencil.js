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
	if (opt.stencil && cell.attributes.type === 'machine.entity') {
		for (i = 0; i < models.length - 1; i++) {
			if (models[i].attributes.type === 'machine.entity') {
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
	} else if (opt.stencil && cell.attributes.type === 'domain.entity') {
		cell.attr({
			type: {
				visibility: 'visible'
			},
			label: {
				text: 'givenDomain'
			}
		});
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
			type: {
				text: 'C',
				visibility: 'hidden',
				ref: 'body',
				refX: '91%',
				refY: '80%'
			},
			designOrNot: {
				ref: 'body',
				refWidth: '100%',
				refHeight: '100%',
				refX: '0%',
				refY: '0%',
				x: -10
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