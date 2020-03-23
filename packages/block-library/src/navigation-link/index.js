/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { mapMarker as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';

export const name = 'core/navigation-link';

export const settings = {
	title: __( 'Navigation Link' ),

	parent: [ 'core/navigation' ],

	icon,

	description: __( 'Add a page, link, or another item to your navigation.' ),

	category: 'layout',

	supports: {
		reusable: false,
		html: false,
		lightBlockWrapper: true,
	},

	__experimentalLabel: ( { label } ) => label,

	edit,
	save,
};
