/**
 * WordPress dependencies
 */
import { BlockInspector } from '@wordpress/block-editor';
import { Platform } from '@wordpress/element';

/**
 * Internal dependencies
 */
import SettingsHeader from '../settings-header';
import PostStatus from '../post-status';
import LastRevision from '../last-revision';
import PostTaxonomies from '../post-taxonomies';
import FeaturedImage from '../featured-image';
import PostExcerpt from '../post-excerpt';
import PostLink from '../post-link';
import DiscussionPanel from '../discussion-panel';
import PageAttributes from '../page-attributes';
import MetaBoxes from '../../meta-boxes';
import PluginDocumentSettingPanel from '../plugin-document-setting-panel';
import PluginSidebarEditPost from '../../sidebar/plugin-sidebar';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';

const SIDEBAR_ACTIVE_BY_DEFAULT = Platform.select( {
	web: true,
	native: false,
} );

const SettingsSidebar = () => {
	const sidebarName = useSelect( ( select ) => {
		const _sidebarName = select(
			'core/interface'
		).getActiveComplementaryArea( 'core/edit-post' );
		return _sidebarName === undefined ? 'edit-post/document' : _sidebarName;
	}, [] );

	if (
		! [ 'edit-post/document', 'edit-post/block' ].includes( sidebarName )
	) {
		return null;
	}
	return (
		<PluginSidebarEditPost
			identifier={ sidebarName }
			header={ <SettingsHeader sidebarName={ sidebarName } /> }
			closeLabel={ __( 'Close settings' ) }
			headerClassName="edit-post-sidebar__panel-tabs"
			isPinnable={ false }
			isActiveByDefault={ SIDEBAR_ACTIVE_BY_DEFAULT }
		>
			{ sidebarName === 'edit-post/document' && (
				<>
					<PostStatus />
					<PluginDocumentSettingPanel.Slot />
					<LastRevision />
					<PostLink />
					<PostTaxonomies />
					<FeaturedImage />
					<PostExcerpt />
					<DiscussionPanel />
					<PageAttributes />
					<MetaBoxes location="side" />
				</>
			) }
			{ sidebarName === 'edit-post/block' && <BlockInspector /> }
		</PluginSidebarEditPost>
	);
};

export default SettingsSidebar;
