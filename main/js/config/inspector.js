paper.on('element:pointerclick', function(elementView) {
	if (elementView.model.attributes.type === 'domain.entity') {
		joint.ui.Inspector.create('.inspector-container', {
			cell: elementView.model,
			inputs: {
				attrs: {
					label: {
						text: {
							type: 'textarea',
							label: 'NAME',
							group: 'edit',
							index: 1
						},
						'font-size': {
							type: 'range',
							min: 3,
							max: 25,
							label: 'Size',
							group: 'edit',
							index: 2
						}
					},
					description: {
						text: {
							type: 'textarea',
							label: 'DESCRIPTION',
							group: 'edit',
							index: 3
						}
					},
					type: {
						text: {
							type: 'select',
							options: ['C', 'B', 'X'],
							label: 'TYPE (C-Causal/B-Biddable/X-Lexical)',
							group: 'edit',
							index: 4
						}
					},
				}
			},
			groups: {
				edit: {
					label: 'ELEMENT',
					index: 1
				}
			}
		});
	} else {
		joint.ui.Inspector.create('.inspector-container', {
			cell: elementView.model,
			inputs: {
				attrs: {
					label: {
						text: {
							type: 'textarea',
							label: 'NAME',
							group: 'edit',
							index: 1
						},
						'font-size': {
							type: 'range',
							min: 3,
							max: 25,
							label: 'Size',
							group: 'edit',
							index: 2
						}
					},
					description: {
						text: {
							type: 'textarea',
							label: 'DESCRIPTION',
							group: 'edit',
							index: 2
						}
					}
				}
			},
			groups: {
				edit: {
					label: 'ELEMENT',
					index: 1
				}
			}
		});
	}

});

paper.on('link:pointerclick', function(linkView) {
	updateLink(linkView);
	joint.ui.Inspector.create('.inspector-container', {
		cell: linkView.model,
		inputs: {
			attrs: {
				source: {
					text: {
						type: 'content-editable',
						label: 'SOURCE',
						group: 'edit',
						index: 1
					}
				},
				target: {
					text: {
						type: 'content-editable',
						label: 'TARGET',
						group: 'edit',
						index: 2
					}
				},
				name: {
					text: {
						type: 'content-editable',
						label: 'NAME',
						group: 'edit',
						index: 3
					}
				}

			}
		},
		groups: {
			edit: {
				label: 'LINK',
				index: 1
			}
		}
	});
});
