function updateLink(linkView) {
    var link = linkView.model;
    var sourceName = getLabelById(link.attributes.source.id);
    var targetName = getLabelById(link.attributes.target.id);
    link.attr({
        source: {
            text: sourceName
        },
        target: {
            text: targetName
        }
    });
}