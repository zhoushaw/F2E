


type Exclude2<T,U> = T extends U? never: T;

type Pratial2<T> = {
    [P in keyof T]?: T[P]
}

type Pick2<T,K extends keyof T> = {
    [P in K]: T[P]
}


interface Person {
    name: string
    age: number
}

type person1 = Pratial2<Person>