/**
 * @packageDocumentation
 * Captioning Interface
 */

interface CaptionUnit {
    text: string;
    r: number;
    g: number;
    b: number;
    a: number;
}

interface Caption {
    bLowPriority: boolean;
    bSFX: boolean;
    noRepeat: number;
    delay: number;
    lifetimeOverride: number;
    units: Array<CaptionUnit>;
    options: Map<string, string>;
}

interface GlobalEventNameMap {
    BadCaptionRequest: (token: string, lifetime: number) => void;
    DisplayCaptionRequest: (token: string, caption: Caption, lifetime: number) => void;
    DisplayRawCaptionRequest: (text: string, lifetime: number) => void;
    CaptionTick: (time: number) => void;
}
