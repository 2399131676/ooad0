var toolbar = new joint.ui.Toolbar({
	groups: {
		clear: {
			index: 1
		},
		show: {
			index: 2
		},
		zoom: {
			index: 3
		},
		check: {
			index: 4
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
			name: 'context',
			group: 'show',
			text: 'Show Context Diagram'
		},
		{
			type: 'button',
			name: 'problem',
			group: 'show',
			text: 'Show Problem Diagram'
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
		},
		{
			type: 'button',
			name: 'check',
			group: 'check',
			text: 'check'
		}
	],
	references: {
		paperScroller: paperScroller // built in zoom-in/zoom-out control types require access to paperScroller instance
	}
});
toolbar.on({
	'clear:pointerclick': graph.clear.bind(graph)
});
toolbar.on('context:pointerclick', function(event) {
	showContextDiagram();
});
toolbar.on('problem:pointerclick', function(event) {
	showProblemDiagram();
});
toolbar.on('check:pointerclick', function(event) {
	check();
});

document.querySelector('.toolbar-container').appendChild(toolbar.el);
toolbar.render();

function showContextDiagram() {
    var models = paper.model.attributes.cells.models;
    for (var i = 0; i < models.length; i++) {
        if (models[i].attributes.type === "requirement.entity") {
            models[i].attr('label/visibility', 'hidden');
            models[i].attr('body/visibility', 'hidden');
            models[i].attr('button/visibility', 'hidden');
            models[i].attr('buttonLabel/visibility', 'hidden');
        } else if (models[i].attributes.type === "reference.CustomLink") { //constraint.CustomLink
            models[i].attr('line/visibility', 'hidden')
        } else if (models[i].attributes.type === "constraint.CustomLink") {
            models[i].attr('line/visibility', 'hidden');
        }
    }
}

function showProblemDiagram() {
    var models = paper.model.attributes.cells.models;
    for (var i = 0; i < models.length; i++) {
        if (models[i].attributes.type === "requirement.entity") {
            models[i].attr('label/visibility', 'visible');
            models[i].attr('body/visibility', 'visible');
            models[i].attr('button/visibility', 'visible');
            models[i].attr('buttonLabel/visibility', 'visible');
        } else if (models[i].attributes.type === "reference.CustomLink") {
            models[i].attr('line/visibility', 'visible')
        } else if (models[i].attributes.type === "constraint.CustomLink") {
            models[i].attr('line/visibility', 'visible');
        }
    }
}

function check() {
    var models = paper.model.attributes.cells.models;
    var element = new Array();
    var correct = true;
    for (var i = 0; i < models.length; i++) {
        var modelType = models[i].attributes.type;
        var modelId = models[i].id;
        if ((modelType === "requirement.entity") || (modelType === 'machine.entity') || (modelType === 'domain.entity')) {
            element.push(modelId);
        } else if ((modelType === 'interface.CustomLink') || (modelType === 'reference.CustomLink') || (modelType ===
            'constraint.CustomLink')) {
            if (models[i].phenomenon === undefined) {
                joint.ui.FlashMessage.open('Connection should have phenomenons!', '', {
                    type: 'alert',
                    closeAnimation: {
                        delay: 2000
                    }
                });
                correct = false;
            }
            for (var j = 0; j < element.length; j++) {
                if (element[j] === models[i].attributes.source.id || element[j] === models[i].attributes.target.id) {
                    element.splice(j, 1);
                    j--;
                }
            }
        }
    }
    if (element.length !== 0) {
        for (var i = 0; i < element.length; i++) {
            var modelType = getTypeById(element[i]);
            if (modelType === 'machine.entity') {
                joint.ui.FlashMessage.open('Machine shouldn\'t be isolated!', '', {
                    type: 'alert',
                    closeAnimation: {
                        delay: 2000
                    }
                });
            } else if (modelType === 'domain.entity') {
                joint.ui.FlashMessage.open('Problem domain shouldn\'t be isolated!', '', {
                    type: 'alert',
                    closeAnimation: {
                        delay: 2000
                    }
                });
            } else if (modelType === 'requirement.entity') {
                joint.ui.FlashMessage.open('Requirement shouldn\'t be isolated!', '', {
                    type: 'alert',
                    closeAnimation: {
                        delay: 2000
                    }
                });
            }
        }
    } else if (element.length === 0 && correct) {
        joint.ui.FlashMessage.open('Correct!', '', {
            type: 'alert',
            closeAnimation: {
                delay: 2000
            }
        });
    }
}
