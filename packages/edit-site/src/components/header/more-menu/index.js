/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { DropdownMenu, MenuGroup } from '@wordpress/components';
import { moreVertical } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import FeatureToggle from '../feature-toggle';
import ToolsMoreMenuGroup from '../tools-more-menu-group';

const POPOVER_PROPS = {
	className: 'edit-site-more-menu__content',
	position: 'bottom left',
};
const TOGGLE_PROPS = {
	tooltipPosition: 'bottom',
};

const MoreMenu = () => (
	<DropdownMenu
		className="edit-site-more-menu"
		icon={ moreVertical }
		label={ __( 'More tools & options' ) }
		popoverProps={ POPOVER_PROPS }
		toggleProps={ TOGGLE_PROPS }
	>
		{ ( { onClose } ) => (
			<>
				<MenuGroup label={ _x( 'View', 'noun' ) }>
					<FeatureToggle
						feature="fullscreenMode"
						label={ __( 'Fullscreen mode' ) }
						info={ __( 'Work without distraction' ) }
						messageActivated={ __( 'Fullscreen mode activated' ) }
						messageDeactivated={ __(
							'Fullscreen mode deactivated'
						) }
					/>
				</MenuGroup>
				<ToolsMoreMenuGroup.Slot fillProps={ { onClose } } />
			</>
		) }
	</DropdownMenu>
);

export default MoreMenu;
