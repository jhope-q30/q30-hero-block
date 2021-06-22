( function( blocks, blockEditor, i18n, element, components, _ ) {

	var el               = element.createElement;
	var PlainText        = blockEditor.PlainText;
	var RichText         = blockEditor.RichText;
	var MediaUpload      = blockEditor.MediaUpload;
	var RadioControl     = components.RadioControl;

	var colorOptions     = 6;

	blocks.registerBlockType( 'q30-hero-block/q30-hero-style', {
		title: i18n.__( 'hero layout style', 'q30-hero-block' ),
		icon: 'index-card',
		category: 'layout',
		attributes: {
			mediaID: {
				type:      'number',
			},
			mediaURL: {
				type:      'string',
				source:    'attribute',
				selector:  'img',
				attribute: 'src',
			},
			mediaALT: {
				type:      'string',
				source:    'attribute',
				selector:  'img',
				attribute: 'alt',
				default:   '',
			},
			heroCOLOR: {
				type:      'string',
				source:    'attribute',
				selector:  'div',
				attribute: 'color',
				default:   'c-0',
			},
			heroprefix: {
				type:      'array',
				source:    'children',
				selector:  '.hero-prefix',
			},
			herotitle: {
				type:      'array',
				source:    'children',
				selector:  '.hero-title',
			},
			herotext: {
				type:      'array',
				source:    'children',
				selector:  '.hero-text',
			},
		},
		edit: function( props ) {
			
			var attributes = props.attributes;

			var onSelectImage = function( media ) {
				return props.setAttributes( {
					mediaURL: media.url,
					mediaID:  media.id,
					mediaALT: media.alt,
				} );
			};
			var createColorOptions = function(){
				var ref = [];
				for( var q = 0; q < colorOptions; ++q ){
					ref.push( {
						label: String( 'option: ' + ( q + 1 ) ),
						value: String( 'c-' + q ),
					} );
				}
				return ref;
			}

			return (
				el( 'div', { className: props.className },
					el( 'div', { className: 'hero-image' },
						el( MediaUpload, {
							onSelect: onSelectImage,
							allowedTypes: 'image',
							value: attributes.mediaID,
							render: function( obj ) {
								return el( components.Button, {
										className: attributes.mediaID ? 'image-button' : 'button button-large',
										onClick: obj.open
									},
									! attributes.mediaID ? i18n.__( 'Upload Image', 'q30-hero-block' ) : el( 'img', { src: attributes.mediaURL, alt: attributes.mediaALT } )
								);
							}
						} )
					),
					el( RadioControl, {
						className: 'hero-colors',
						label: i18n.__( 'Hero text color options', 'q30-hero-block' ),
						help: i18n.__( 'Choose the hero background color for title and text', 'q30-hero-block' ),
						selected: attributes.heroCOLOR,
						options: createColorOptions(),
						onChange: function( value ) {
							props.setAttributes( { heroCOLOR: value } );
						},
					} ),
					el( 'div', { className: 'hero-title-content' },
						el( PlainText, {
							value: attributes.heroprefix,
							placeholder: i18n.__( 'Add hero title prefix', 'q30-hero-block' ),
							onChange: function( value ) {
								props.setAttributes( { heroprefix: value } );
							},
						} ),
						el( 'span', { className: 'hero-prefix-space' }, ':' ),
						el( PlainText, {
							value: attributes.herotitle,
							placeholder: i18n.__( 'Add hero title', 'q30-hero-block' ),
							onChange: function( value ) {
								props.setAttributes( { herotitle: value } );
							},
						} ),
					),
					el( RichText, {
						tagName: 'p',
						placeholder: i18n.__( 'Add hero text', 'q30-hero-block' ),
						formattingControls: [ 'bold', 'italic', 'link' ],
						isSelected: true,
						value: attributes.herotext,
						onChange: function( value ) {
							props.setAttributes( { herotext: value } );
						},
					} )
				)
			);
		},
		save: function( props ) {

			var attributes   = props.attributes;
			var prefix_space = attributes.heroprefix != '' ? el( 'span', { className: 'hero-prefix-space', }, ':' ) : '';

			return (
				el( 'div', { className: props.className, color: attributes.heroCOLOR },
					attributes.mediaURL &&
					el( 'div', { className: 'hero-image' },
						el( 'img', { src: attributes.mediaURL, alt: attributes.mediaALT } ),
						el( 'div', { className: 'hero-content' },
							el( 'div', { className: attributes.heroCOLOR },
								el( 'div', { className: 'hero-title-content' },
									el( 'span', { className: 'hero-prefix' }, attributes.heroprefix ),
									prefix_space,
									el( 'span', { className: 'hero-title' }, attributes.herotitle ),
								),
								el( RichText.Content, { tagName: 'p', value: attributes.herotext, className: 'hero-text', } ),
							),
						),
					),
				)
			);

		},

	} );

} )(
	window.wp.blocks,
	window.wp.blockEditor,
	window.wp.i18n,
	window.wp.element,
	window.wp.components,
	window._,
);
