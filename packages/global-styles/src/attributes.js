/**
 * External dependencies
 */
import { noop, isUndefined } from 'lodash';

/**
 * WordPress dependencies
 */
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { useGlobalStylesState } from './store';

export const coreDesignAttributes = {
	colorText: {
		type: 'string',
		default: null,
	},
	colorBackground: {
		type: 'string',
		default: null,
	},
};

export const createAttributesExtractor = ( dataset = {} ) => (
	attributes = {}
) => {
	const keys = dataset;
	const nextAttributes = {};

	for ( const key in keys ) {
		if ( ! isUndefined( attributes[ key ] ) ) {
			nextAttributes[ key ] = attributes[ key ];
		}
	}

	return nextAttributes;
};

export const textDesignAttributes = {
	textUnit: 'px',
	textFontSize: {
		type: 'number',
		default: 16,
	},
	textFontFamily: {
		type: 'string',
		default: null,
	},
	textFontWeight: {
		type: 'string',
		default: 'normal',
	},
	textLineHeight: {
		type: 'number',
		default: 1.5,
	},
	textLetterSpacing: {
		type: 'number',
		default: 0,
	},
	textAlignment: {
		type: 'string',
		default: 'left',
	},
};

export const designAttributes = {
	...coreDesignAttributes,
	...textDesignAttributes,
};

export const getDesignAttributes = () => designAttributes;

export const getInitialDesignAttributes = () => {
	const attributes = getDesignAttributes();
	const nextAttributes = {};

	for ( const key in attributes ) {
		nextAttributes[ key ] = attributes[ key ].default;
	}

	return nextAttributes;
};

export const enhanceMetaDataWithDesignAttributes = ( metadata = {} ) => {
	const attributes = metadata.attributes || {};

	return {
		...metadata,
		attributes: {
			...attributes,
			...getDesignAttributes(),
		},
	};
};

export const extractCoreDesignAttributes = createAttributesExtractor(
	coreDesignAttributes
);
export const extractTextDesignAttributes = createAttributesExtractor(
	textDesignAttributes
);

export const extractGlobalStylesDesignAttributes = createAttributesExtractor(
	getDesignAttributes()
);

export const useGlobalStylesControls = ( {
	attributes = {},
	isSelected = false,
	name,
} ) => {
	const {
		setAttributes = noop,
		setCurrentBlock = noop,
	} = useGlobalStylesState();

	useEffect( () => {
		const resetAttributes = () => {
			setAttributes( {} );
			setCurrentBlock( 'global' );
		};

		if ( isSelected ) {
			const currentAttributes = extractGlobalStylesDesignAttributes(
				attributes
			);
			setAttributes( currentAttributes );
			// HACK: Work-around
			window.requestAnimationFrame( () => {
				setCurrentBlock( name );
			} );
		} else {
			resetAttributes();
		}

		return () => {
			resetAttributes();
		};
	}, [ isSelected ] );
};

export const useGlobalStylesCurrentAttributes = () => {
	const { styles, currentBlock } = useGlobalStylesState();
	const globalValues = styles.global;
	const currentStyles = styles[ currentBlock ] || {};

	return { ...globalValues, ...currentStyles };
};

export const useGlobalStylesCoreDesignAttributes = () => {
	const attributes = useGlobalStylesCurrentAttributes();

	return extractCoreDesignAttributes( attributes );
};

export const useGlobalStylesTextDesignAttributes = () => {
	const attributes = useGlobalStylesCurrentAttributes();
	return extractTextDesignAttributes( attributes );
};
