var lock = false;
var source = null;
var target = null;

var graph = new joint.dia.Graph;
var paper = new joint.dia.Paper({
    el: document.getElementById('myholder'),
    model: graph,
    width: 780,
    height: 1000,
    gridSize: 1,
    drawGrid:true,
    background: {
        color:'whitesmoke'
    },
    elementView: joint.dia.ElementView.extend({
        pointerdblclick: function(evt, x, y) {
            this.model.remove();
        }
    }),
	linkView: joint.dia.LinkView.extend({
        pointerdblclick: function(evt, x, y) {
            this.model.remove();
        }
    })
});

 function drawInterface()
 {
    joint.dia.Link.define('interface.CustomLink',{
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
	
	var removeButton = new joint.linkTools.Remove();
	var toolsView = new joint.dia.ToolsView({
			tools:[removeButton]
		});	
	var linkView = link.findView(paper);
	linkView.addTools(toolsView);
	linkView.showTools();
}

function drawReference()
{
	joint.dia.Link.define('reference.CustomLink',{
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

function drawConstraint()
{
joint.dia.Link.define('constraint.CustomLink',{
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

function drawRequirement(rname)
{
	// if(requirement.id!=null)
	// {
	// 	alert('requirement existed!');
	// 	return;
	// }
    rname=typeof(rname) !='undefined' ? rname : "requirement";
	var CustomElement = joint.dia.Element.define('requirement.CustomElement', {
		    attrs: {
				label: {
				    fill:'black'
				},
		        body: {
		            refRx: '100%',
		            refRy: '100%',
		        }
		    }
		}, {
		    markup: [{
				tagName: 'ellipse',
		        selector: 'body'
		    }, {
				tagName:'text',
				selector:'label'
			},{
			tagName: 'rect',
		    selector: 'button'
			}, {
		    tagName: 'text',
		    selector: 'buttonLabel'
			}]
		});
	var element = new CustomElement();
	element.attr({
		label:{
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
	    }
	});
	element.position(300, 150);
	element.resize(60, 30);
	element.addTo(graph);
	var models = paper.model.attributes.cells.models;
	requirement.id=models[models.length-1].id;
}

function drawProblemDomain(pname)
{
    pname=typeof(pname) !='undefined' ? pname : "problem domain";
    var CustomElement = joint.dia.Element.define('domain.CustomElement', {
            attrs: {
        		label: {
        		    fill:'black'
        		},
                body: {
                    strokeWidth: 1,
                    stroke: '#000000',
        			fill: 'white'
                }
            }
        }, {
            markup: [{
                tagName: 'rect',
                selector: 'body'
            }, {
        		tagName:'text',
        		selector:'label'
        	},{
        	tagName: 'rect',
            selector: 'button'
        	}, {
            tagName: 'text',
            selector: 'buttonLabel'
        	}]
        });
    var element = new CustomElement();
    element.attr({
    	label:{
    		text: pname,
    		textVerticalAnchor: 'middle',
    		textAnchor: 'middle',
    		refX: '50%',
    		refY: '50%',
        },
        body: {
            refWidth: '100%',
            refHeight: '100%',
        }
    });
	element.position(300, 150);
	element.resize(130, 50);
    element.addTo(graph);
	updateElement();
	var models = paper.model.attributes.cells.models;
	domainList.item.push({id:models[models.length-1].id})
}

function drawMachine(mname)
{
	// if(machine.id!=null)
	// {
	// 	alert('machine existed!');
	// 	return;
	// }
    mname=typeof(mname) !='undefined' ? mname : "machine";	
	var CustomElement = joint.dia.Element.define('machine.CustomElement', {
	    attrs: {
			label: {
			    fill:'black'
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
	    },{
			tagName:'text',
			selector:'label'
		},{
		tagName: 'rect',
	    selector: 'button'
		}, {
	    tagName: 'text',
	    selector: 'buttonLabel'
		}]
	});
	var element = new CustomElement();
	element.attr({
		label:{
			text: mname,
			textVerticalAnchor: 'middle',
			textAnchor: 'middle',
			refX: '50%',
			refY: '50%',
			x:20
	    },
	    r1: {
	        refWidth: '100%',
	        refHeight: '100%',
	    },
	    r2: {
	        x: 10, // additional x offset
	        refWidth: '100%',
	        refHeight: '100%',
	    },
	    r3: {
	        x: 20, // additional x offset
	        refWidth: '100%',
	        refHeight: '100%',
	    }
	});
	element.position(280, 130);
	element.resize(80, 50);
    element.addTo(graph);
	updateElement();
	var models = paper.model.attributes.cells.models;
	machine.id=models[models.length-1].id;
}

