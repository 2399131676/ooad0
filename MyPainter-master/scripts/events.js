paper.on('blank:pointerclick', function() {
	//resetAll(this);
	let rq = document.getElementById("requirement");
	let p = document.getElementById("problemDomain");
	let m = document.getElementById("machine");

	if (rq.checked === true) {
		drawRequirement();
		rq.checked = false;
		return;
	}

	if (p.checked === true) {
		drawProblemDomain();
		p.checked = false;
		return;
	}

	if (m.checked === true) {
		drawMachine();
		m.checked = false;
		return;
	}


})

paper.on('element:pointerdblclick', function(elementView) {
	joint.ui.Inspector.create('.elementEditor', {
		cell: elementView.model,
		inputs: {
			'attrs/label/text': {
				type: 'text',
				label: 'Name',
				group: 'basic',
				index: 1
			},
			'attrs/description/text': {
				type: 'text',
				label: 'Description',
				group: 'basic',
				index: 1
			}
		},
		groups: {
			basic: {
				label: 'edit element',
				index: 1
			}
		}
	});
});

paper.on('element:button:pointerdown', function(elementView, evt) {
	evt.stopPropagation(); // stop any further actions with the element view (e.g. dragging)

	var model = elementView.model;
	if (model.attributes.type == "machine.CustomElement") machine.id = null;
	else if (model.attributes.type == "requirement.CustomElement") requirement.id = null;
	else {
		for (i = 0; i < domainList.item.length; i++) {
			if (domainList.item[i].id == model.id) {
				domainList.item.splice(i, 1);
				break;
			}
		}
	}
	model.remove();
});



paper.on('link:pointerclick', function(linkView) {
	joint.ui.Inspector.create('.inspector-container', {
		cell: linkView.model,
		inputs: {
			'labels/0/attrs/text/text': { //
				type: 'text',
				label: 'Label',
				group: 'basic',
				index: 1
			}
		},
		groups: {
			basic: {
				label: 'Basic',
				index: 1
			}
		}
	});
});


paper.on({



	'element:pointerdown': function(elementView, evt) {

		evt.data = elementView.model.position();
	},

	'element:pointerup': function(elementView, evt, x, y) {

		var coordinates = new g.Point(x, y);
		var elementAbove = elementView.model;
		var elementBelow = this.model.findModelsFromPoint(coordinates).find(function(el) {
			return (el.id !== elementAbove.id);
		});

		// If the two elements are connected already, don't
		// connect them again (this is application-specific though).
		if (elementBelow && graph.getNeighbors(elementBelow).indexOf(elementAbove) === -1) {

			// Move the element to the position before dragging.
			elementAbove.position(evt.data.x, evt.data.y);

			// Create a connection between elements.
			if ((elementAbove.attributes.type == "machine.CustomElement" && elementBelow.attributes.type ==
					"domain.CustomElement") ||
				(elementAbove.attributes.type == "domain.CustomElement" && elementBelow.attributes.type ==
					"machine.CustomElement"))
				drawInterface(elementAbove, elementBelow);
			else if ((elementAbove.attributes.type == "requirement.CustomElement" && elementBelow.attributes.type ==
					"domain.CustomElement") ||
				(elementAbove.attributes.type == "domain.CustomElement" && elementBelow.attributes.type ==
					"requirement.CustomElement"))
				drawReference(elementAbove, elementBelow);
		}
	}
});
