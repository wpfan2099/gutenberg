/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { Animate, Button, Panel, Slot, Fill } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { withPluginContext } from '@wordpress/plugins';
import { starEmpty, starFilled } from '@wordpress/icons';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import ComplementaryAreaHeader from '../complementary-area-header';
import PinnedItems from '../pinned-items';

function ComplementaryAreaSlot( { scope, ...props } ) {
	return <Slot name={ `ComplementaryArea/${ scope }` } { ...props } />;
}

function ComplementaryAreaFill( { scope, children, className } ) {
	return (
		<Fill name={ `ComplementaryArea/${ scope }` }>
			<Animate type="slide-in" options={ { origin: 'left' } }>
				{ () => <div className={ className }>{ children }</div> }
			</Animate>
		</Fill>
	);
}

function ComplementaryArea( {
	children,
	className,
	closeLabel = __( 'Close plugin' ),
	identifier,
	header,
	headerClassName,
	icon,
	isPinnable = true,
	panelClassName,
	scope,
	smallScreenTitle,
	title,
	toggleShortcut,
	isActiveByDefault,
} ) {
	const { activeComplementaryArea, isPinned } = useSelect(
		( select ) => {
			const { getActiveComplementaryArea, isItemPinned } = select(
				'core/interface'
			);
			return {
				activeComplementaryArea: getActiveComplementaryArea( scope ),
				isPinned: isItemPinned( scope, identifier ),
			};
		},
		[ identifier, scope ]
	);
	const isActive = activeComplementaryArea === identifier;
	const {
		enableComplementaryArea,
		disableComplementaryArea,
		pinItem,
		unpinItem,
	} = useDispatch( 'core/interface' );
	useEffect( () => {
		if ( isActiveByDefault && activeComplementaryArea === undefined ) {
			enableComplementaryArea( scope, identifier );
		}
	}, [ activeComplementaryArea, isActiveByDefault, scope, identifier ] );
	return (
		<>
			{ isPinned && isPinnable && (
				<PinnedItems scope={ scope }>
					<Button
						icon={ icon }
						label={ title }
						onClick={ () =>
							isActive
								? disableComplementaryArea( scope )
								: enableComplementaryArea( scope, identifier )
						}
						isPressed={ isActive }
						aria-expanded={ isActive }
					/>
				</PinnedItems>
			) }
			{ isActive && (
				<ComplementaryAreaFill
					className={ classnames(
						'interface-complementary-area',
						className
					) }
					scope={ scope }
				>
					<ComplementaryAreaHeader
						className={ headerClassName }
						closeLabel={ closeLabel }
						onClose={ () => disableComplementaryArea( scope ) }
						smallScreenTitle={ smallScreenTitle }
						toggleShortcut={ toggleShortcut }
					>
						{ header || (
							<>
								<strong>{ title }</strong>
								{ isPinnable && (
									<Button
										className="interface-complementary-area__pin-unpin-item"
										icon={
											isPinned ? starFilled : starEmpty
										}
										label={
											isPinned
												? __( 'Unpin from toolbar' )
												: __( 'Pin to toolbar' )
										}
										onClick={ () =>
											( isPinned ? unpinItem : pinItem )(
												scope,
												identifier
											)
										}
										isPressed={ isPinned }
										aria-expanded={ isPinned }
									/>
								) }
							</>
						) }
					</ComplementaryAreaHeader>
					<Panel className={ panelClassName }>{ children }</Panel>
				</ComplementaryAreaFill>
			) }
		</>
	);
}

const ComplementaryAreaWrapped = withPluginContext( ( context, ownProps ) => {
	return {
		icon: ownProps.icon || context.icon,
		identifier:
			ownProps.identifier || `${ context.name }/${ ownProps.name }`,
	};
} )( ComplementaryArea );

ComplementaryAreaWrapped.Slot = ComplementaryAreaSlot;

export default ComplementaryAreaWrapped;
