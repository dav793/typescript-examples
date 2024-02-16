
// These are conditional types:

type Result = true extends boolean ? 1 : 0;     // Result type is 1

type Result2<T> = T extends 'hello' ? boolean : never;
let test1: Result2<'hello'>;        // test1 type is boolean
let test2: Result2<'goodbye'>;      // test2 type is never

// Within conditional types, you can use the keyword 'infer' to get whatever is being matched in the condition.
// Here are some examples:




const func = (check: boolean) => {
    return 'hello';
};

const obj = {};

type FakeReturnType<T> = T extends (
    ...args: any
) => infer R        // if type T is function...
    ? R             // ...result will be the type returned by the function T
    : never;        // ...otherwise result will be type never

type Result3 = FakeReturnType<typeof func>;     // here type is string
type Result4 = FakeReturnType<typeof obj>;      // here type is never




const func2 = (check: boolean) => {
    return 'world' as const;            // if we add 'as const' the return type of func will be static...
}

type FakeReturnType2<T> = T extends ((
    ...args: any
) => infer R extends string)            // ...and if we constrain it to be a string
    ? `${R}_return_type`                // ...then we can use the static return type for operations
    : never;

type Result5 = FakeReturnType2<typeof func2>;   // here type is 'world_return_type'




type GetFromDeepObject<T> = T extends {     // we can use 'infer' to get the type of any property, even if deeply-nested...
    a: {
        b: {
            c: infer C;
        }
    }
}
    ? C                                     // ...we can then use a conditional type to return the type of that property
    : never;

type C = GetFromDeepObject<{        // here type 'C' is resolved as number
    a: {
        b: {
            c: number
        }
    }
}>;




type GetFromDeepObject2<T> = T extends {    // this is a crazy example where we match property 'c' from many different options
    a: {
        b: {
            c: infer C
        }
    }
} | {
    c: infer C
} | {
    a: {
        c: infer C
    }
}
    ? C
    : never;

type C2 = GetFromDeepObject2<{      // here type 'C2' is resolved as number
    c: number;
}>;

type C3 = GetFromDeepObject2<{      // here type 'C3' is resolved as boolean
    a: {
        c: boolean;
    }
}>;