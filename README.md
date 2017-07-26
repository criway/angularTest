# angularTest
We will build an app to test angular2 framework

## Setup the Development Environment
1. install Node.js and npm
2. install Angular CLI globally
		
		npm install -g @angular/cli
3. create a new proyect

		ng new my-proyect-name
4. go to the project directory and launch the server

		cd my-proyect-name
		ng serve --open 

	or

		cd my-proyect-name
		npm start 

## Add some node_modules:

### Menu component
To use the [menu component](https://material.angular.io/components/menu/overview), (```MdMenuModule```) we must first add the dependencies needed

Open ```package.json```, add dependencies:

	"@angular/cdk": "^2.0.0-beta.8"
	"@angular/material": "^2.0.0-beta.8"

Now we can import the module:
	
	import { MdMenuModule } from '@angular/material';
