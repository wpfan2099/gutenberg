/**
 * External dependencies
 */
import { noop, isUndefined } from 'lodash';

/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { useRef } from '@wordpress/element';

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

export const useGlobalStylesControls = () => {
	const { setCurrentBlock = noop } = useGlobalStylesState();

	const blockIdRef = useRef();
	const block = useSelectedBlock();
	const { clientId, name } = block;

	// Work around to help sync wp.data block selection with current global styles state
	if ( ! blockIdRef.current !== clientId ) {
		blockIdRef.current = clientId;
		// setAttributes( attributes );
		setCurrentBlock( clientId ? name : 'global' );
	}
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

// TODO: NEED A BETTER WAY TO DO THIS!!!!!
// Currently very unstable as the update cycles are not synced with wp.data
export const useSelectedBlock = () => {
	const block = useSelect( ( select ) => {
		const { getBlockSelectionStart, getBlock } = select(
			'core/block-editor'
		);
		const selectedBlockId = getBlockSelectionStart();
		const selectedBlock = selectedBlockId
			? getBlock( selectedBlockId )
			: {};

		return selectedBlock;
	}, [] );

	return { name: 'global', ...block };
};
