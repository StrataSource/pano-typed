/**
 * @packageDocumentation Captioning Interface
 */

interface Caption {
	bLowPriority: boolean;
	bSFX: boolean;
	flNoRepeat: number;
	flDelay: number;
	flLifetimeOverride: number;
	text: string;
	options: Map<string, string>;
}

declare enum CloseCaptioningExpiryMethod {
	STACK = 0,
	INDIVIDUAL = 1
}

interface GlobalEventNameMap {
	DisplayCaption: (token: string, caption: Caption, lifetime: number, emitTime: number) => void;
	BadCaption: (token: string, lifetime: number, emitTime: number) => void;
	EndCaption: (token: string) => void;
}

declare namespace ClosedCaptionsAPI {
	function SetMaxCaptionEntries(num: number): void;
	function GetAvailableLanguages(): Array<string>;
	function SetCaptioningExpiryMethod(method: CloseCaptioningExpiryMethod): void;
}
