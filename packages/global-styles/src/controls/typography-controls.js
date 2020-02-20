/**
 * External dependencies
 */
import { isEmpty } from 'lodash';
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { TextControls } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { GlobalStylesPanelBody } from '../global-styles-panel-body';
import { useGlobalStylesState } from '../store';
import { useGlobalStylesTextDesignAttributes } from '../attributes';

export default function TypographyControls() {
	const { updateStyles } = useGlobalStylesState();
	const attributes = useGlobalStylesTextDesignAttributes();

	const {
		textFontFamily,
		textFontSize,
		textFontWeight,
		textLineHeight,
		textLetterSpacing,
		textAlignment,
	} = attributes;

	if ( isEmpty( attributes ) ) return null;

	const handleOnChange = ( { prop: nextProp, value: nextValue } ) => {
		switch ( nextProp ) {
			case 'fontFamily':
				updateStyles( { textFontFamily: nextValue } );
				break;
			case 'fontSize':
				updateStyles( { textFontSize: nextValue } );
				break;
			case 'fontWeight':
				updateStyles( { textFontWeight: nextValue } );
				break;
			case 'letterSpacing':
				updateStyles( { textLetterSpacing: nextValue } );
				break;
			case 'lineHeight':
				updateStyles( { textLineHeight: nextValue } );
				break;
			case 'textAlign':
				updateStyles( { textAlignment: nextValue } );
				break;
			default:
				break;
		}
	};

	return (
		<GlobalStylesPanelBody title={ __( 'Text' ) }>
			<TextControls
				fontFamily={ textFontFamily }
				fontSize={ textFontSize }
				fontWeight={ textFontWeight }
				lineHeight={ textLineHeight }
				letterSpacing={ textLetterSpacing }
				textAlign={ textAlignment }
				onChange={ handleOnChange }
			/>
		</GlobalStylesPanelBody>
	);
}
