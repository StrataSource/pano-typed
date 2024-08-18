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

declare type uint8 = number;
declare type uint16 = number;
declare type uint32 = number;
declare type uint64 = number;

declare type int8 = number;
declare type int16 = number;
declare type int32 = number;
declare type int64 = number;

declare type vec2 = { x: number; y: number };
declare type vec3 = { x: number; y: number; z: number };

/** A duration in seconds. */
declare type duration = number;

/** Represents a unique id return. */
declare type uuid = int32;

/** Represents a keyframes animation return. */
declare type Keyframes = unknown;

/** rgba, hex etc. color string */
declare type color = string;

/** rgba color string */
declare type rgbaColor = string;

// ======== Utility Types ========
// Many of these are from https://github.com/sindresorhus/type-fest
// We'd rather avoid the dependency, but feel free to pinch stuff from there.

declare type Func<Args extends unknown[] = any[], Return = void> = (...args: Args) => Return;
declare type ValueOf<T> = T[keyof T];
declare type Primitive = null | undefined | string | number | boolean | symbol | bigint;

declare type JsonPrimitive = string | number | boolean | null;
declare type JsonObject = { [Key in string]: JsonValue } & { [Key in string]?: JsonValue | undefined };
declare type JsonArray = JsonValue[] | readonly JsonValue[];
declare type JsonValue = JsonPrimitive | JsonObject | JsonArray;

/** Encourages IDEs to flatten types when displaying. */
declare type Simplify<T> = { [Key in keyof T]: T[Key] } & {};

/** Make a type incompatible with types that'd otherwise be compatible. */
declare type Brand<Type, Brand> = Type & { __brand: Brand };
