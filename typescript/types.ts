
// type Required2<T> = {
//     [P in keyof T]-?: T[P]
// }

interface Person {
    name?: string
    age: number
}

// type person2 = Required2<Person>;

// let personinfo: person2 = {
//     age: 20,
//     name: ''
// }

// type Pick2<T, K extends keyof T> = {
//     [P in K]: T[P]
// }

// interface Person {
//     name?: string
//     age: number
// }

// type person3 = Pick2<Person, 'name'>;

// let personinfo2: person2 = {
//     name: 'string',
//     age: 20,
// }


// type Record2<K extends string,T> = {
//     [P in K]: T
// }

// interface Person {
//     name?: string
//     age: number
// }

// type person4 = Record2<'name'|'age',string>;

// let personinfo3: person4 = {
//     name: 'string',
//     age: '20',
// }



// type Partial2<T> = {
//     [P in keyof T]?: T[P]
// }

// type Readonly2<T> = {
//     readonly [P in keyof T]: T[P]
// }

// type Require2<T> = {
//     [P in keyof T]-?:T[P]
// }

// type Pick2<T,K extends keyof T> = {
//     [P in K]: T[P]
// }

// type Record2<K extends string,T> = {
//     [P in K]: T
// }

// type Pick3<T,K extends keyof T> = {
//     [P in K]:T[P]
// }
// type Pratial3<T> = {
//     [P in keyof T]?: T[P]
// }

// type isTrue<T> = T extends true? true: false;

// type typ22 = isTrue<true>


// let val: typ22 = true;
type Pick3<T,K extends keyof T> = {
    [P in K]: T[P]
}

type Partial4<T> = {
    [P in keyof T]: T[P]
}

type person2 = Pick3<Person,'name'>
