/**
 * @packageDocumentation Shared types, present in all Strata games.
 * See the {@link shared/apis | APIs module} for a full list of APIs.
 * 
 * For more information, see the [official documentation](https://wiki.stratasource.org/shared/panorama/overview).
 */

/// <reference path="./primitives.d.ts" />
/// <reference path="./panels.d.ts" />
/// <reference path="./apis.d.ts" />
/// <reference path="./style.d.ts" />
/// <reference path="./events.d.ts" />
/// <reference path="./enums.d.ts" />

// ======== Primitives ========
declare type float = number;
declare type double = number;

declare type uint8 = number;
declare type uint16 = number;
declare type uint32 = number;

declare type int8 = number;
declare type int16 = number;
declare type int32 = number;

/**
 * A STRING representing an int64.
 *
 * JavaScript `number`s are IEEE floats and lose precision when used for values greater than 2^53. Most of Panorama was
 * implemented before native JS BigInts were a thing, and not worth the refactoring work to use them.
 *
 * In C++, when a C++ method/events exposed to JS have a int64/uint64 param, either a number or string can be passed
 * from JS, and both will be converted to the corresponding 64-bit integer. If precision is a concern (e.g. SteamIDs),
 * use a string.
 *
 * For methods/events that *return* a int64/uint64, Panorama will return a JS string!
 *
 * To be super explicit this, we have separate type aliases for both numbers and strings. When typing C++ methods,
 * those taking int64 params in C++ should have TS params with type `int64_str | int64_num`, whilst methods returning
 * `int64`s from C++ should return only `int64_str` in TS.
 */
declare type int64_str = string;

/** @see {int64_str} */
declare type int64_num = number;

/** @see {int64_str} */
declare type uint64_str = string;

/** @see {int64_str} */
declare type uint64_num = number;

/**
 * String of a SteamID64. Might look like a uint64 in C++ but it's always a string in JS!
 * @see {int64_str}
 */
declare type steamID = string;

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

/** @internal Encourages IDEs to flatten types when displaying. */
declare type Simplify<T> = { [Key in keyof T]: T[Key] } & {};

/** @internal Make a type incompatible with types that'd otherwise be compatible. */
declare type Brand<Type, Brand> = Type & { __brand: Brand };

/** @internal Type to signify flags/bitfield of some enum, ultimately just a `number`. */
declare type Flags<_Enum, Underlying = number> = Underlying;
