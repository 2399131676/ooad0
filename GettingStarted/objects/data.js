var vphenomenons = new Vue({
    el:'#vue_phenomenon',
    data: {
        items: null
    }
});
vphenomenons.items = new Array();

var selector = new Vue({
    el:'#selector',
    data:{
        options: null,
        initiator: null,
        reciever: null,
        content:null
    }
});
selector.options = new Array();

var machine = new Vue({
    el:'#machine',
    data:{
        id:null,
        connected:false
    }
});

var requirement = new Vue({
    el:'#requirement',
    data:{
        id:null,
        connected:false
    }
});

var domainList = new Vue({
    el:'domainList',
    data:{
        items:null
    }
});
domainList.item = new Array();

var domain = new Vue({
    el:"domain",
    data:{
        id:null,
        connected:false
    }
});


function updateElement(){
    var models = paper.model.attributes.cells.models;
    selector.options.push(models[models.length-1].attributes.attrs.label.text);
}

function updatePhenomenon(){
    vphenomenons.items.push({initiator:selector.initiator,reciever:selector.reciever,content:selector.content});
}

function getLabelById(id)
{
    var models = paper.model.attributes.cells.models;
    for(i=0;i<models.length;i++){
        if(models[i].id==id) return modes[i].attrs.label.text;
    }
}