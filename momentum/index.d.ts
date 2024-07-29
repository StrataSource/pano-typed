/**
 * @packageDocumentation
 * Momentum-specific types.
 */

/// <reference path="../shared/index.d.ts" />
/// <reference path="./panels.d.ts" />
/// <reference path="./apis.d.ts" />

declare type TimerEvent = TimerEventEnum[keyof TimerEventEnum];
declare interface TimerEventEnum {
	Started:     0,
	Finished:    1,
	Stopped:     2,
	Failed:      3,
}

declare type TimerState = TimerStateEnum[keyof TimerStateEnum];
declare interface TimerStateEnum {
	NotRunning:  0,
	Running:     1,
	Practice:    2,
}

declare interface GlobalEventNameMap {
	'OnMomentumTimerStateChange':		(ent: unknown, type: TimerEvent) => void,
	'OnMomentumZoneChange':				(enter: unknown, linear: unknown, curZone: unknown, curTrack: unknown, timerState: TimerState) => void,
	'OnSaveStateUpdate':				(count: number, current: unknown, usingMenu: boolean) => void,
	'OnMomentumReplayStopped':			() => void,
}
