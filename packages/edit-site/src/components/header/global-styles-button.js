/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';

export default function GlobalStylesModeButton() {
	const globalStylesMode = useSelect(
		( select ) => select( 'core/editor' ).getGlobalStylesMode(),
		[]
	);
	const { enableGlobalStylesMode, disableGlobalStylesMode } = useDispatch(
		'core/editor'
	);

	const toggleMode = () => {
		return globalStylesMode
			? disableGlobalStylesMode()
			: enableGlobalStylesMode();
	};

	return (
		<span style={ { paddingRight: 8 } }>
			<Button
				onClick={ toggleMode }
				isSecondary
				isPrimary={ globalStylesMode }
			>
				{ __( 'Global Styles' ) }
			</Button>
		</span>
	);
}
