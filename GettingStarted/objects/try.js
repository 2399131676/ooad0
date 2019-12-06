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

paper.on('element:pointerclick', function(elementView) {
    joint.ui.Inspector.create('.inspector-container', {
        cell: elementView.model,
        inputs: {
            'attrs/label/text': {
                type: 'text',
                label: 'Name',
                group: 'basic',
                index: 1
            }
        },
        groups: {
            basic: {
                label: 'List',
                index: 1
            }
        }
    });
});

var lock = false;
var source = null;
var target = null;

function drawInterface()
{
    var link = new joint.shapes.standard.Link();
    link.source(source);
    link.target(target);
    link.attr({
        line:{
            targetMarker:{
                'type': 'rect',
                'width':1,
                'height':1
            }
        }
    });
    link.addTo(graph);
}

var refe;
function drawReference()
{
    refe = new joint.shapes.standard.Link();
    refe.source(source);
    refe.target(target);
    refe.attr({
        line:{
            strokeDasharray: '5 5',
            strokeDashoffset: '2.5',
            targetMarker:{
                'type': 'rect',
                'width':1,
                'height':1
            }
        }
    });
    refe.addTo(graph);
}

// var constraint=new joint.shapes.standard.Link();
function problemDiagram(){
    requ.remove(graph);
    constraint.remove(graph);
    refe.remove(graph);
}

function contextDiagram(){
    requ.addTo(graph);
    constraint.addTo(graph);
    refe.addTo(graph);
}

var constraint;
function drawConstraint()
{
    // var link = new constraint();
    constraint = new joint.shapes.standard.Link();
    constraint.source(source);
    constraint.target(target);
    constraint.attr({
        line:{
            strokeDasharray: '5 5',
            strokeDashoffset: '2.5'
        }
    });
    constraint.addTo(graph);
}

var requ;
function drawRequirement(rname)
{
    rname=typeof(rname) !='undefined' ? rname : "requirement";
    requ = new joint.shapes.standard.Ellipse();
    //rect.position(300, 150);
    requ.resize(100, 50);
    requ.attr({
        body: {
            fill: 'white',
            strokeDasharray: '5 5',
            strokeDashoffset: '2.5'
        },
        label: {
            text: rname,
            fill: 'black',

        }
    });
    requ.addTo(graph);
}

function drawProblemDomain(pname)
{
    pname=typeof(pname) !='undefined' ? pname : "problemDomain";
    var rect = new joint.shapes.standard.Rectangle();
    rect.position(100, 50);
    rect.resize(100, 50);
    rect.attr({
        body: {
            fill: 'white'
        },
        label: {
            text: pname,
            fill: 'black'
        }
    });
    rect.addTo(graph);
}
paper.on('link:pointerclick', function(linkView) {
    var link = linkView.model;
    var val = prompt("输入描述","interface");
    link.labels([{
        attrs: {
            text: {
                text: val
            }
        }
    }])
});


function drawMachine(mname)
{
    var CustomElement = joint.dia.Element.define('examples.CustomElement', {
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
        }]
    });

    var element = new CustomElement();

    mname=typeof(mname) !='undefined' ? mname : "machine";

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
}

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
    }
    return;
}