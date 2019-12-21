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