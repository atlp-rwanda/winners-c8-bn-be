# winners-c8-bn-be

## Basic folder structure:

```
ROOT FOLDER: WINNERS-C8-BN-BE
├───lib                        : /lib folder contains codes compiled by babel from the /src folder
│   ├───controllers
│   ├───database
│   │   ├───migrations
│   │   ├───models
│   │   └───seeders
│   ├───routes
│   └───validations
├───node_modules                  : /node_modules folder is mentioned in the .gitignore file
│   ├─── ...
│   └─── ...
│       └─── ...
│           └─── ...
└───src                            : /src folder contains the source code,
    ├───controllers                  and should be written using **ES6**, 
    ├───database                     and can be compiled by running 
    │   ├───config                    "npm run build"  (this uses babel to compile)
    │   ├───migrations
    │   ├───models
    │   └───seeders
    ├───routes
    └───validations
```


## Dotenv usage:

To use dotenv, one should:
 1. Add the `.env` file in the root folder of the project, with the environment variables declarations;
 for e.g, the `.env` file can contain this text:
    ```
    SOME_TEXT=this_is_a_text
    SOME_KEY=this_is_a_key
    ```
2. Next, use `import 'dotenv/config';` in any JS file (in the `/src` folder) to ensure that the `process.env` object's properties will include those from the `.env` file.
for e.g, as a continuation to the example given above, the JS file may look like:
    ```
    import 'dotenv/config';
    console.log(process.env.SOME_TEXT); // This displays "this_is_a_text"
    console.log(process.env.SOME_KEY); // This displays "this_is_a_key"
    ```
    Note that the JS file will need to be compiled using babel.

