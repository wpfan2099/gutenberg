( function() {
	var el = wp.element.createElement;
	var registerBlockVariation = wp.blocks.registerBlockVariation;
	var __ = wp.i18n.__;
	var Path = wp.primitives.Path;
	var SVG = wp.primitives.SVG;

	var columnsPath = el( Path, {
		fillRule: 'evenodd',
		d:
			'M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM28.5 34h-9V14h9v20zm2 0V14H39v20h-8.5zm-13 0H9V14h8.5v20z',
	} );
	var columnsIcon = el(
		SVG,
		{ width: 48, height: 48, viewBox: '0 0 48 48' },
		columnsPath
	);

	registerBlockVariation( 'core/quote', {
		name: 'large',
		title: 'Large Quote',
		isDefault: true,
		attributes: { className: 'is-style-large' },
		icon: 'format-quote',
		scope: [ 'inserter' ],
	} );

	registerBlockVariation( 'core/paragraph', {
		name: 'success',
		title: __( 'Success Message' ),
		description:
			'This block displays a success message. This description overrides the default one provided for the Paragraph block.',
		attributes: {
			content: 'This is a success message!',
			backgroundColor: 'vivid-green-cyan',
			dropCap: false,
		},
		icon: 'yes-alt',
		scope: [ 'inserter' ],
	} );

	registerBlockVariation( 'core/paragraph', {
		name: 'warning',
		title: __( 'Warning Message' ),
		attributes: {
			content: 'This is a warning message!',
			backgroundColor: 'luminous-vivid-amber',
			dropCap: false,
		},
		icon: 'warning',
		scope: [ 'inserter' ],
	} );

	registerBlockVariation( 'core/columns', {
		name: 'three-columns',
		title: '40 / 20 / 40',
		description: 'Three columns; narrow center column',
		innerBlocks: [
			[ 'core/column' ],
			[ 'core/column', { width: 20 } ],
			[ 'core/column' ],
		],
		icon: columnsIcon,
		scope: [ 'block' ],
	} );
} )();
