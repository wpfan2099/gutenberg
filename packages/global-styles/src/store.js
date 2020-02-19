/**
 * WordPress dependencies
 */
import { useState, useContext, createContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { useRenderedGlobalStyles } from './renderer';
import { getInitialDesignAttributes } from './attributes';

/**
 * TODO: Replace everything below with wp.data store mechanism
 */

export const GlobalStylesContext = createContext( {} );
export const useGlobalStylesState = () => useContext( GlobalStylesContext );

export function GlobalStylesStateProvider( { children } ) {
	const state = useGlobalStylesStore();

	return (
		<GlobalStylesContext.Provider value={ state }>
			{ children }
		</GlobalStylesContext.Provider>
	);
}

export function useGlobalStylesStore() {
	// TODO: Replace with data/actions from wp.data
	const [ styles, setStyles ] = useState( {
		global: getInitialDesignAttributes(),
	} );
	const [ attributes, setAttributes ] = useState( {} );
	const [ currentBlock, setCurrentBlock ] = useState( 'global' );

	useRenderedGlobalStyles( styles );

	const updateStyles = ( nextStyles = {} ) => {
		const prevBlockStyles = styles[ currentBlock ] || {};
		setStyles( {
			...styles,
			[ currentBlock ]: {
				...prevBlockStyles,
				...nextStyles,
			},
		} );
	};

	return {
		styles,
		attributes,
		setStyles,
		setAttributes,
		currentBlock,
		setCurrentBlock,
		updateStyles,
	};
}
