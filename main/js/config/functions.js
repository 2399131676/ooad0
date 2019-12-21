function changeReferenceAndConstraint(link) {
	if (link.attributes.type === 'reference.CustomLink') {
		link.attr({
			line: {
				targetMarker: {
					'type': 'path',
					'd': 'M 10 -5 0 0 10 5 z'
				}
			}
		});
		link.attributes.type = 'constraint.CustomLink';
	} else if (link.attributes.type === 'constraint.CustomLink') {
		link.attr({
			line: {
				targetMarker: {
					'type': null,
					'd': null
				}
			}
		});
		link.attributes.type = 'reference.CustomLink';
	}

}

function changeDesignAnGiven(element) {
	if (element.attributes.attrs.designOrNot.visibility === 'hidden') {
		element.attr({
			designOrNot: {
				visibility: 'visible'
			},
			label: {
				text: 'designDomain'
			}
		});
	} else if (element.attributes.attrs.designOrNot.visibility === 'visible') {
		element.attr({
			designOrNot: {
				visibility: 'hidden'
			},
			label: {
				text: 'givenDomain'
			}
		});
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