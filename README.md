# Typescript examples

Tiny sandbox made to test various Typescript use-cases in a NodeJS environment and use as reference.

Uses:
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

**Windows:**
```cmd
docker run --name typescript-examples-container -v %cd%:/projects -it --rm typescript-examples-image /bin/sh
```

**Mac OS/Linux:**
```bash
docker run --name typescript-examples-container -v $(pwd):/projects -it --rm typescript-examples-image /bin/sh
```