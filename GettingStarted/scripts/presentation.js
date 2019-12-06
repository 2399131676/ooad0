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
		else if (models[i].attributes.type == "standard.Link") {
			models[i].attr('line/visibility','hidden');
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
			else if (models[i].attributes.type == "standard.Link") {
				models[i].attr('line/visibility','visible');
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