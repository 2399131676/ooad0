joint.dia.Link.define('interface.CustomLink', {
		attrs: {
			line: {
				connection: true,
				strokeWidth: 2,
				strokeLinejoin: 'round'
			},
			wrapper: {
				connection: true,
				strokeWidth: 10,
				strokeLinejoin: 'round'
			},
			source: {
				visibility: 'hidden'
			},
			target: {
				visibility: 'hidden'
			},
			label: {
				visibility: 'hidden'
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
		}, {
			tagName: 'text',
			selector: 'source'
		}, {
			tagName: 'text',
			selector: 'target'
		}, {
			tagName: 'text',
			selector: 'label'
		}]
	});
	
	
	function updateLink(linkView) {
		var link = linkView.model;
		var sourceName = getLabelById(link.attributes.source.id);
		var targetName = getLabelById(link.attributes.target.id);
		// var name = "link";
		
		link.attr({
			source: {
				text: sourceName
			},
			target: {
				text: targetName
			},
			label:{
				text:'link'
			}
		});
	}