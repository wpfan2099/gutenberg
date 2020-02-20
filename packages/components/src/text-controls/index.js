/**
 * External dependencies
 */
import styled from '@emotion/styled';
import { noop } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	Icon,
	alignCenter,
	alignLeft,
	alignJustify,
	alignRight,
} from '@wordpress/icons';

/**
 * Internal dependencies
 */
import ButtonGroup from '../button-group';
import Button from '../button';
import BaseTextControl from '../text-control';
import BaseSelectControl from '../select-control';
import VisuallyHidden from '../visually-hidden';

const fontWeightOptions = [
	{
		value: 'lighter',
		label: 'Lighter',
	},
	{
		value: 'normal',
		label: 'Normal',
	},
	{
		value: 'bold',
		label: 'Bold',
	},
	{
		value: 'bolder',
		label: 'Bolder',
	},
];

const createOnChangeHandler = ( onChange = noop, prop ) => ( value ) =>
	onChange( { prop, value } );

export function TextControls( {
	fontFamily,
	fontSize,
	fontWeight,
	letterSpacing,
	lineHeight,
	textAlign,
	onChange = noop,
} ) {
	const groupLabel = __( 'Text Controls' );
	return (
		<ContainerView role="group" aria-label={ groupLabel }>
			<VisuallyHidden>
				<legend>{ groupLabel }</legend>
			</VisuallyHidden>
			<TextControl
				label={ __( 'Font Family' ) }
				placeholder={ __( 'Font Family' ) }
				onChange={ createOnChangeHandler( onChange, 'fontFamily' ) }
				value={ fontFamily }
			/>
			<WeightSizeControls
				fontSize={ fontSize }
				fontWeight={ fontWeight }
				onChange={ onChange }
			/>
			<LineHeightSpacingControls
				letterSpacing={ letterSpacing }
				lineHeight={ lineHeight }
				onChange={ onChange }
			/>
			<AlignControls value={ textAlign } onChange={ onChange } />
		</ContainerView>
	);
}

function WeightSizeControls( { fontWeight, fontSize, onChange = noop } ) {
	return (
		<Flex>
			<FlexBlock>
				<SelectControl
					label={ __( 'Font Weight' ) }
					options={ fontWeightOptions }
					onChange={ createOnChangeHandler( onChange, 'fontWeight' ) }
					value={ fontWeight }
				/>
			</FlexBlock>
			<FontSizeWrapper>
				<TextControl
					label={ __( 'Font Size' ) }
					type="number"
					onChange={ createOnChangeHandler( onChange, 'fontSize' ) }
					value={ fontSize }
				/>
			</FontSizeWrapper>
		</Flex>
	);
}

function LineHeightSpacingControls( {
	letterSpacing,
	lineHeight,
	onChange = noop,
} ) {
	return (
		<Flex>
			<FlexBlock>
				<LabelledTextControl
					label={ __( 'Line Height' ) }
					type="number"
					onChange={ createOnChangeHandler( onChange, 'lineHeight' ) }
					value={ lineHeight }
					step={ 0.1 }
				/>
			</FlexBlock>
			<FlexBlock>
				<LabelledTextControl
					label={ __( 'Spacing' ) }
					type="number"
					onChange={ createOnChangeHandler(
						onChange,
						'letterSpacing'
					) }
					value={ letterSpacing }
					step={ 0.1 }
				/>
			</FlexBlock>
		</Flex>
	);
}

function AlignButton( { icon, isSelected, value, onChange = noop, ...props } ) {
	return (
		<Button
			isSecondary
			isSmall
			isPrimary={ isSelected }
			onClick={ () => onChange( value ) }
			{ ...props }
		>
			<Icon icon={ icon } size={ 16 } />
		</Button>
	);
}

function AlignControls( { onChange = noop, value } ) {
	const handleOnChange = createOnChangeHandler( onChange, 'textAlign' );

	return (
		<ButtonGroupView>
			<AlignButton
				isSelected={ value === 'left' }
				value={ 'left' }
				onChange={ handleOnChange }
				icon={ alignLeft }
			/>
			<AlignButton
				isSelected={ value === 'center' }
				value={ 'center' }
				onChange={ handleOnChange }
				icon={ alignCenter }
			/>
			<AlignButton
				isSelected={ value === 'right' }
				value={ 'right' }
				onChange={ handleOnChange }
				icon={ alignRight }
			/>
			<AlignButton
				isSelected={ value === 'justify' }
				value={ 'justify' }
				onChange={ handleOnChange }
				icon={ alignJustify }
			/>
		</ButtonGroupView>
	);
}

function LabelledTextControl( { label, ...props } ) {
	return (
		<LabelledControlWrapperView>
			<ControlLabel>{ label }</ControlLabel>
			<BaseTextControl
				{ ...props }
				label={ label }
				name={ label }
				hideLabelFromVision
			/>
		</LabelledControlWrapperView>
	);
}

function TextControl( { label, ...props } ) {
	return (
		<ControlWrapperView>
			<BaseTextControl
				{ ...props }
				label={ label }
				name={ label }
				hideLabelFromVision
			/>
		</ControlWrapperView>
	);
}

function SelectControl( { label, ...props } ) {
	return (
		<ControlWrapperView>
			<BaseSelectControl
				{ ...props }
				label={ label }
				name={ label }
				hideLabelFromVision
			/>
		</ControlWrapperView>
	);
}

const ContainerView = styled.fieldset`
	display: block;
	max-width: 300px;
`;

const Flex = styled.div`
	display: flex;

	> * {
		margin-right: 4px;

		&:last-child {
			margin-right: 0;
		}
	}
`;

const FlexItem = styled.div`
	min-width: 0;
	max-width: 100%;
`;

const FlexBlock = styled( FlexItem )`
	min-width: 0;
	flex: 1;
`;

const ControlWrapperView = styled.div`
	font-size: 12px;
	margin-bottom: 2px;

	input[type='number'],
	input[type='text'],
	select {
		display: block;
		font-size: 12px !important;
		height: 24px !important;
		min-height: 24px !important;
		line-height: 1;
		margin: 0;
		padding: 2px 8px !important;
		width: 100%;
	}
`;

const FontSizeWrapper = styled( FlexItem )`
	width: 72px;
`;

const LabelledControlWrapperView = styled( ControlWrapperView )`
	position: relative;

	input[type='number'],
	input[type='text'],
	select {
		padding-left: 80px;
		text-align: right;
	}
`;

const ControlLabel = styled.div`
	opacity: 0.5;
	position: absolute;
	line-height: 1;
	top: 6px;
	left: 8px;
	pointer-events: none;
`;

const ButtonGroupView = styled( ButtonGroup )`
	display: flex !important;

	button {
		display: block;
		width: 100%;
		flex: 1;

		svg {
			display: block;
			margin: auto;
		}
	}
`;

export default TextControls;
