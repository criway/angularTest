# TestApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.1.

## Start the app
1. Clone the repo
2. With terminal go to ```angularTest/test-app``` folder
3. ```npm install```
4. ```ng serve```
Probably an error will jump about the *Md2MenuModule* module. This is a module implemented for the home menu. To avoid the error:
    1. go to ```angularTest/test-app/src/app.module.ts``` and remove the module from the ```imports``` array.
    2. ```ng serve```
    3. If it compiles, then insert again the *Md2MenuModule* module into ```imports``` array from ```angularTest/test-app/src/app.module.ts```.
    4. Save it and automatically the project will be compiled.
5. Go to ```localhost:4200``` 