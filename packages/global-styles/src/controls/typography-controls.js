/**
 * External dependencies
 */
import { isEmpty } from 'lodash';
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';

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
		textLineHeight,
		textLetterSpacing,
	} = attributes;

	if ( isEmpty( attributes ) ) return null;

	return (
		<GlobalStylesPanelBody title={ __( 'Text' ) }>
			<TextControl
				label={ __( 'Font Family' ) }
				value={ textFontFamily }
				placeholder="Default"
				name="Font Family"
				onChange={ ( value ) =>
					updateStyles( { textFontFamily: value } )
				}
			/>
			<TextControl
				label={ __( 'Font Size' ) }
				value={ textFontSize }
				step={ 1 }
				name="Font Size"
				type="number"
				onChange={ ( value ) =>
					updateStyles( { textFontSize: value } )
				}
			/>
			<TextControl
				label={ __( 'Line Height' ) }
				value={ textLineHeight }
				max={ 2 }
				step={ 0.1 }
				name="Line Height"
				type="number"
				onChange={ ( value ) =>
					updateStyles( { textLineHeight: value } )
				}
			/>
			<TextControl
				label={ __( 'Letter Spacing' ) }
				value={ textLetterSpacing }
				type="number"
				name="Letter Spacing"
				step={ 0.1 }
				onChange={ ( value ) =>
					updateStyles( { textLetterSpacing: value } )
				}
			/>
		</GlobalStylesPanelBody>
	);
}
