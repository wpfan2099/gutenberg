<?php
/**
 * Server-side rendering of the `core/navigation-link` block.
 *
 * @package gutenberg
 */

/**
 * Returns the top-level submenu SVG chevron icon.
 *
 * @return string
 */
function block_core_navigation_link_render_submenu_icon() {
	return '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" transform="rotate(90)"><path d="M8 5v14l11-7z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';
}

/**
 * Renders the `core/navigation-link` block.
 *
 * @param array $content The saved content.
 * @param array $block   The parsed block.
 *
 * @return string Returns the post content with the legacy widget added.
 */
function render_block_core_navigation_link( $content, $block ) {
	if ( 'core/navigation-link' !== $block['blockName'] ) {
		return $content;
	}

	// Don't render the block's subtree if it has no label.
	if ( empty( $block['attrs']['label'] ) ) {
		return '';
	}

	// TODO Font sizes and colors were previously specified on the Navigation Link
	// $classes         = array_merge(
	// 	$colors['css_classes'],
	// 	$font_sizes['css_classes']
	// );
	// $classes[]       = 'wp-block-navigation-link';
	// $style_attribute = ( $colors['inline_styles'] || $font_sizes['inline_styles'] )
	// 	? sprintf( ' style="%s"', esc_attr( $colors['inline_styles'] ) . esc_attr( $font_sizes['inline_styles'] ) )
	// 	: '';

	// TODO $classes and $style_attribute below are temporary until font sizes and colors are working again.
	$classes         = array( 'wp-block-navigation-link' );
	$style_attribute = '';

	$css_classes = trim( implode( ' ', $classes ) );
	$has_submenu = count( (array) $block['innerBlocks'] ) > 0;
	$is_active   = ! empty( $block['attrs']['id'] ) && ( get_the_ID() === $block['attrs']['id'] );

	$class_name = ! empty( $block['attrs']['className'] ) ? implode( ' ', (array) $block['attrs']['className'] ) : false;

	if ( false !== $class_name ) {
		$css_classes .= ' ' . $class_name;
	};

	$html = '<li class="' . esc_attr( $css_classes . ( $has_submenu ? ' has-child' : '' ) ) .
		( $is_active ? ' current-menu-item' : '' ) . '"' . $style_attribute . '>' .
		'<a class="wp-block-navigation-link__content"';

	// Start appending HTML attributes to anchor tag.
	if ( isset( $block['attrs']['url'] ) ) {
		$html .= ' href="' . esc_url( $block['attrs']['url'] ) . '"';
	}

	if ( isset( $block['attrs']['opensInNewTab'] ) && true === $block['attrs']['opensInNewTab'] ) {
		$html .= ' target="_blank"  ';
	}
	// End appending HTML attributes to anchor tag.

	// Start anchor tag content.
	$html .= '>' .
		// Wrap title with span to isolate it from submenu icon.
		'<span class="wp-block-navigation-link__label">';

	if ( isset( $block['attrs']['label'] ) ) {
		$html .= wp_kses(
			$block['attrs']['label'],
			array(
				'code'   => array(),
				'em'     => array(),
				'img'    => array(
					'scale' => array(),
					'class' => array(),
					'style' => array(),
					'src'   => array(),
					'alt'   => array(),
				),
				's'      => array(),
				'span'   => array(
					'style' => array(),
				),
				'strong' => array(),
			)
		);
	}

	$html .= '</span>';

	// TODO - showSubmenuIcon relies on nav block attribute. Refactor.
	// Append submenu icon to top-level item.
	// it shows the icon as default, when 'showSubmenuIcon' is not set,
	// or when it's set and also not False.
	// if (
	// 	(
	// 		isset( $attributes['showSubmenuIcon'] ) && false !== $attributes['showSubmenuIcon'] ||
	// 		! isset( $attributes['showSubmenuIcon'] )
	// 	) &&
	// 	$has_submenu
	// ) {
	// 	$html .= '<span class="wp-block-navigation-link__submenu-icon">' . block_core_navigation_link_render_submenu_icon() . '</span>';
	// }

	$html .= '</a>';
	// End anchor tag content.

	if ( $has_submenu ) {
		$inner_blocks_html = implode( array_map( 'render_block', $block['innerBlocks'] ) );

		// TODO - classname is wrong!
		$html .= sprintf(
			'<ul class="wp-block-navigation__container">%s</ul>',
			$inner_blocks_html
		);
	}

	$html .= '</li>';

	return $html;
}

/**
 * Register the navigation block.
 *
 * @uses render_block_core_navigation_link()
 * @throws WP_Error An WP_Error exception parsing the block definition.
 */
function register_block_core_navigation_link() {
	register_block_type(
		'core/navigation-link',
		array(
			'attributes' => array(
				'label'         => array(
					'type' => 'string',
				),
				'nofollow'      => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'type'          => array(
					'type' => 'string',
				),
				'description'   => array(
					'type' => 'string',
				),
				'id'            => array(
					'type' => 'number',
				),
				'opensInNewTab' => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'url'           => array(
					'type' => 'string',
				),
			),
		),
	);
}
add_action( 'init', 'register_block_core_navigation_link' );
add_filter( 'render_block', 'render_block_core_navigation_link', 10, 2 );
