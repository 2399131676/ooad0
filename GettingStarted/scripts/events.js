paper.on('blank:pointerclick',function(){
    //resetAll(this);
    let rq = document.getElementById("requirement");
    let p = document.getElementById("problemDomain");
    let m = document.getElementById("machine");
    
    if(rq.checked === true)
    {
        drawRequirement();
        rq.checked=false;
        return;
    }

    if(p.checked === true)
    {
        drawProblemDomain();
        p.checked=false;
        return;
    }

    if(m.checked === true)
    {
        drawMachine();
        m.checked=false;
        return;
    }

    
})

paper.on('element:pointerclick', function(elementView) {
	if(lock == false){
	    lock = true;
	    source = elementView.model;
	}
	else{
	    lock = false;
	    target = elementView.model;
		let i = document.getElementById("interface");
		let r = document.getElementById("reference");
		let c = document.getElementById("constraint");
		if(i.checked === true)
		{
		    drawInterface();
		    i.checked=false;
		    return;
		}
		if(r.checked === true)
		{
		    drawReference();
		    r.checked=false;
		    return;
		}
		if(c.checked === true)
		{
		    drawConstraint();
		    c.checked=false;
		    return;
		}
	}
	
    });
	
//paper.on('element:contextmenu', function(elementView) {
	
paper.on('element:pointerclick', function(elementView) {

    var name = prompt("Please enter your name");
    //.attributes.attrs.label.text=prompt("Please enter your name","");
    elementView.model.attr('label/text', name);
    // elementView.
});

paper.on('element:button:pointerdown', function(elementView, evt) {
    evt.stopPropagation(); // stop any further actions with the element view (e.g. dragging)

    var model = elementView.model;
	if(model.attributes.type=="machine.CustomElement") machine.id=null;
	else if(model.attributes.type=="requirement.CustomElement") requirement.id=null;
	else 
	{
		for(i=0;i<domainList.item.length;i++)
		{
			if(domainList.item[i].id==model.id) {
				domainList.item.splice(i,1);
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
            'labels/0/attrs/text/text': {//
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