
// Typescript can infer object composition using generics and automatically assign the correct return type 

const addIdToObject = <TObj>(obj: TObj) => {
    return {
        ...obj,
        id: '123'
    };
}

const result = addIdToObject({ title: 'Galaxy Quest', year: '1999' });  // type of result includes props 'title', 'year' AND 'id'
