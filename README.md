# Typescript examples

Tiny sandbox made to test various Typescript use-cases in a NodeJS environment.

The examples are located in `server/src/examples`.

This project uses:
* NodeJS 20.11.0
* Typescript 5.3.3

## Install dependencies

```bash
npm install
```

## Run

```bash
npm start
```

## (Optional) Run in docker container

### Build image

```cmd
docker build -f Dockerfile -t typescript-examples-image .
```

### Run container

**Windows CMD:**
```cmd
docker run --name typescript-examples-container -v %cd%:/projects -it --rm typescript-examples-image /bin/sh
```

**Mac OS/Linux:**
```bash
docker run --name typescript-examples-container -v $(pwd):/projects -it --rm typescript-examples-image /bin/sh
```

Then, install the dependencies and run as shown above. 

Alternatively, running the Node server may not be necessary as the typescript compiler works directly in many IDEs.

## Extras

Reference these resources:
* [Typescript: Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
* [Typescript: Cheatsheets](https://www.typescriptlang.org/cheatsheets)
* [Matt Pocock's YouTube channel](https://www.youtube.com/@mattpocockuk)