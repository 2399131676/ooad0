function phenomenon(link) {
    joint.ui.FlashMessage.open('Add phenomenon', '', {
        type: 'alert',
        closeAnimation: {
            delay: 2000
        }
    });
    var source_id = link.attributes.source.id;
    var target_id = link.attributes.target.id;
    if (link.phenomenon == undefined) {
        link.phenomenon = new Array();
    };
    var popup = new joint.ui.Popup({
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
                popup.remove();
            }
        },
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
            '<br><button class="add" style="background-color: beige;float:right">add</button><br>' +
            '</div>',
        target: document.getElementById('selector')
    });
    popup.render();
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
