
type FnReturnType<T extends (...args: any) => any> = ReturnType<T>;     // ReturnType will return the type returned by a function

const myFn = (one: 'one', two: 2) => {
    return true;
};
let myFnReturnType: FnReturnType<typeof myFn>;  // here myFnReturnType is inferred to be of type boolean

// PromiseReturnType will return the type emitted by a promise which is returned by a function
type PromiseReturnType<T extends (...args: any) => any> = Awaited< ReturnType<T> >;     

type Result = PromiseReturnType<                    // here Result is type { title: string, year: string } 
    () => Promise<{ title: string, year: string }>
>;
