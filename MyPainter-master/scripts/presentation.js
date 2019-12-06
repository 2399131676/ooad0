var toolbar = new joint.ui.Toolbar({
    groups: {
        clear: { index: 1 },
        zoom: { index: 2 }
    },
    tools: [
        { type: 'button', name: 'clear', group: 'clear', text: 'Clear Diagram' },
		{ type: 'button', name: 'problem', group: 'problem', text: 'Problem Diagram' },
		{ type: 'button', name: 'context', group: 'context', text: 'Context Diagram' },
        // { type: 'zoom-out', name: 'zoom-out', group: 'zoom' },
        // { type: 'zoom-in', name: 'zoom-in', group: 'zoom' }
    ],
    references: {
        // paperScroller: paperScroller // built in zoom-in/zoom-out control types require access to paperScroller instance
    }
});

toolbar.on({
    'clear:pointerclick': graph.clear.bind(graph),
	'problem:pointerclick':showProblemDiagram(),
	'context:pointerclick':showContextDiagram()
});


document.querySelector('.head').appendChild(toolbar.el);
toolbar.render();

function showProblemDiagram()
{
	var models = paper.model.attributes.cells.models;
	for(var i=0;i<models.length;i++){
	    if(models[i].attributes.type == "requirement.CustomElement")
	        {
				models[i].attr('label/visibility','hidden');
				models[i].attr('body/visibility','hidden');
				models[i].attr('button/visibility','hidden');
				models[i].attr('buttonLabel/visibility','hidden');
			}
		else if (models[i].attributes.type == "reference.CustomLink"){//constraint.CustomLink
			models[i].attr('line/visibility','hidden')
		}
		else if (models[i].attributes.type == "constraint.CustomLink") {
			models[i].attr('line/visibility','hidden');
		}
	}
	return;
}

function showContextDiagram(){
	var models = paper.model.attributes.cells.models;
	for(var i=0;i<models.length;i++){
	    if(models[i].attributes.type == "requirement.CustomElement")
	        {
				models[i].attr('label/visibility','visible');
				models[i].attr('body/visibility','visible');
				models[i].attr('button/visibility','visible');
				models[i].attr('buttonLabel/visibility','visible');
			}
			else if (models[i].attributes.type == "reference.CustomLink"){
				models[i].attr('line/visibility','visible')
			}
			else if (models[i].attributes.type == "constraint.CustomLink") {
				models[i].attr('line/visibility','visible');
			}
	}
	return;
}