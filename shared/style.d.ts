/**
 * @packageDocumentation Defines style properties accessible through scripting
 * @see https://github.com/StrataSource/pano-typed/
 */

/** Generic panel styling properties. */
declare interface Style {
	// Foreground
	color: string;
	font: string;
	fontFamily: string;
	fontSize: number;
	fontStyle: 'normal'|'italic';
	fontWeight: 'light'|'thin'|'normal'|'medium'|'bold'|'black';
	letterSpacing: string;
	lineHeight: string;
	textAlign: 'left'|'center'|'right';
	textDecoration: 'none'|'underline'|'line-through';
	textOverflow: 'ellipses'|'clip'|'shrink'|'noclip';
	textShadow: string;
	textShadowFast: string;
	textTransform: string;
	whiteSpace: 'normal'|'nowrap';

	// Background
	backgroundColor: string;
	backgroundImage: string;
	backgroundImgOpacity: number;
	backgroundPosition: string;
	backgroundRepeat: string;
	backgroundSize: string;

	// Alignment
	align: string;
	verticalAlign: 'bottom'|'center'|'top';
	horizontalAlign: 'left'|'center'|'right';

	// Layout
	position: string;
	transform: string;
	transformOrigin: string;
	overflow: string;
	height: string;
	width: string;
	flowChildren: 'none'|'left'|'right'|'up'|'down';
	maxHeight: string;
	maxWidth: string;
	minHeight: string;
	minWidth: string;

	// Transition
	transition: string;
	transitionDelay: string;
	transitionDuration: string;
	transitionProperty: string;
	transitionTimingFunction: string;

	// UI
	uiScale: string;
	uiScaleX: string;
	uiScaleY: string;
	uiScaleZ: string;

	// Animation
	animation: string;
	animationDelay: string;
	animationDirection: string;
	animationDuration: string;
	animationFillMode: string;
	animationIterationCount: string;
	animationName: string;
	animationTimingFunction: string;

	// Border
	border: string;
	borderBottom: string;
	borderBottomColor: string;
	borderBottomLeftRadius: string;
	borderBottomRightRadius: string;
	borderBottomStyle: string;
	borderBottomWidth: string;
	borderColor: string;
	borderLeft: string;
	borderLeftColor: string;
	borderLeftStyle: string;
	borderLeftWidth: string;
	borderRadius: string;
	borderRight: string;
	borderRightColor: string;
	borderRightStyle: string;
	borderRightWidth: string;
	borderStyle: string;
	borderTop: string;
	borderTopColor: string;
	borderTopLeftRadius: string;
	borderTopRightRadius: string;
	borderTopStyle: string;
	borderTopWidth: string;
	borderWidth: string;

	// Margin
	margin: string;
	marginLeft: string;
	marginRight: string;
	marginTop: string;
	marginBottom: string;

	// Padding
	padding: string;
	paddingBottom: string;
	paddingLeft: string;
	paddingRight: string;
	paddingTop: string;

	// Effects
	blur: string;
	boxShadow: string;
	brightness: string;
	clip: string;
	contrast: string;
	washColor: string;
	washColorFast: string;
	hueRotation: string;
	imgShadow: string;
	saturation: string;
	sound: string;
	soundOut: string;
	soundTrans: string;
	textureSampling: string;

	// Perspective
	perspective: string;
	perspectiveOrigin: string;
	preTransformRotate2d: string;
	preTransformScale2d: string;

	// Opacity
	opacity: string | float;
	opacityMask: string;
	opacityMaskScrollDown: string;
	opacityMaskScrollUp: string;
	opacityMaskScrollUpDown: string;

	// Visibility
	visibility: 'visible'|'collapse';
	zIndex: number;
}
