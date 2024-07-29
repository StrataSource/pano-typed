/**
 * @packageDocumentation
 * Shared types.
 */

/// <reference path="./panels.d.ts" />
/// <reference path="./apis.d.ts" />
/// <reference path="./style.d.ts" />
/// <reference path="./events.d.ts" />

// ======== Primitives ========
declare type float = number;
declare type double = number;

declare type uint16 = number;
declare type uint32 = number;
declare type uint64 = number;

declare type int16 = number;
declare type int32 = number;
declare type int64 = number;

/** A duration in seconds. */
declare type duration = number;

/** Represents a unique id return. */
declare type uuid = int32;

/** Represents a keyframes animation return. */
declare type Keyframes = unknown;

// ======== Utility Types ========
// Many of these are from https://github.com/sindresorhus/type-fest
// We'd rather avoid the dependency, but feel free to pinch stuff from there.

type ValueOf<T> = T[keyof T];
type Func = (...args: any[]) => any;
type Primitive = null | undefined | string | number | boolean | symbol | bigint;

type JsonPrimitive = string | number | boolean | null;
type JsonObject = { [Key in string]: JsonValue } & { [Key in string]?: JsonValue | undefined };
type JsonArray = JsonValue[] | readonly JsonValue[];
type JsonValue = JsonPrimitive | JsonObject | JsonArray;
