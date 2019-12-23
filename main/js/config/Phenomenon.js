var vphenomenons = new Vue({
	el: '#vue_phenomenon',
	data: {
		items: null
	}
});
vphenomenons.items = new Array();

var selector = new Vue({
	el: '#selector',
	data: {
		options: null,
		initiator: null,
		receiver: null,
		content: null
	}
});

function phenomenon(link) {
    var source_id = link.attributes.source.id;
    var target_id = link.attributes.target.id;
    if (link.phenomenon == undefined) {
        link.phenomenon = new Array();
    };
    var dialog = new joint.ui.Dialog({
        events: {
            'click .add': function() {
                var phenomenon = this.$('.phenomenon').val();
                var selected = this.$('.select option:selected').val();
                var unselected = selected == target_id ? source_id : target_id;
                var p = {
                    Initiator: selected,
                    Receiver: unselected,
                    content: phenomenon
                };
                link.phenomenon.push(p);
                addPhenomenon(p);
            },
			'click .cancel':function(){
				dialog.close();
			}
        },
		title:'ADD PHENOMENON',
		width:210,
		closeButton:false,
		draggable:true,
        content: '<div>' +
            'Initiator<br>' +
            '<select class="select">' +
            '<option value ="' + source_id + '">' + getLabelById(source_id) + '</option><br>' +
            '<option value ="' + target_id + '">' + getLabelById(target_id) + '</option><br>' +
            '</select><br>' +
            'phenomenon<br>' +
            '<input type="text" class="phenomenon" name="phenomenon"><br>' +
            'phenomenonList<br>' +
            getPhenomenonList(link) +
            '<br><button class="add" style="background-color: beige;float:right">add</button><button class="cancel" style="background-color: beige;float:right">cancel</button><br>' +
            '</div>',
        target: document.getElementById('selector')
    });
    dialog.open();
}

function updatePhenomenon() {
    vphenomenons.items.push({
        initiator: selector.initiator,
        receiver: selector.receiver,
        content: selector.content
    });
}

function getPhenomenonList(model) {
    var phenomenons = model.phenomenon;
    var str = "<table border='1px' cellspacing='0' cellpadding='0'>" +
        "<tr>" +
        "<th bgcolor='#edf1f8'>Initiator</th>" +
        "<th bgcolor='#edf1f8'>Receiver</th>" +
        "<th bgcolor='#edf1f8'>Content</th>" +
        "</tr>";
    for (var i = 0; i < phenomenons.length; i++) {
        str += '<tr bgcolor="#ecf0f8">' + '<td>' + getLabelById(phenomenons[i].Initiator) + '</td>' + '<td>' + getLabelById(
            phenomenons[i].Receiver) + '</td>' + '<td>' + phenomenons[i].content + '</td>' + '</tr>'
    }
    str += '</table>';
    return str;
}

function addPhenomenon(phenomenon) {
    vphenomenons.items.push({
        initiator: getLabelById(phenomenon.Initiator),
        receiver: getLabelById(phenomenon.Receiver),
        content: phenomenon.content
    });
}
