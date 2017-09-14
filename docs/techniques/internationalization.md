# Internationalization (i18n)
Angular's [internationalization](https://angular.io/guide/i18n) (i18n) tools help make your app available in multiple languages.

Try this [live example](https://angular.io/generated/live-examples/i18n/eplnkr.html) / [download example](https://angular.io/generated/zips/i18n/i18n.zip) of a JIT-compiled app, translated into Spanish.

The i18n template translation process has four phases:

1. Mark static text messages in your component templates for translation.
2. An angular i18n tool extracts the marked messages into an industry standard translation source file.
3. A translator edits that file, translating the extracted text messages into the target language, and returns the file to you.
4. The Angular compiler imports the completed translation files, replaces the original messages with translated text, and generates a new version of the application in the target language.

**You need to build and deploy a separate version of the application for each supported language.**

### Mark text with the i18n attribute

The angular ```i18n``` attribute is a marker for translatable content. Place it on every element tag whose fixed text should be translated.

    <h1 i18n>Hello i18n!</h1>
    
### Help the translator with a description and meaning

In order to translate it accurately, the translator may need a description of the message. Assign a description to the i18n attribute.

    <h1 i18n="An introduction header for this sample">Hello i18n!</h1>

In order to deliver a correct translation, the translator may need to know the meaning or intent nof the text within this particular application context.
You add context by beginning the string with the ```meaning``` and separating it from the ```description``` with the ```|``` character (<meaning>|<description>):
    
    <h1 i18n="site header|An introduction header for this sample">Hello i18n!</h1>

### Set a custom id to improve search and maintenance
The angular i18n extractor tool generates a file with a translation unit entry for each i18n attribute in a template. By default, it assigns each translation unit a unique id such as this one:

    <trans-unit id="ba0cc104d3d69bf669f97b8d96a4c5d8d9559aa3" datatype="html">
    
But this id is obscure and difficult for humans to read or remember. Consider specifying your own, meaningful id in the i18n attribute, prefixed nwith @@

    <h1 i18n="@@introductionHeader">Hello i18n!</h1>
    
Now the extractor tool and compiler will generate a translation unit with your custom id and never change it.

We can write it all:
    
    <h1 i18n="An introduction header for this sample@@introductionHeader">Hello i18n!</h1>
    
    
### Translate text without creating an element
There are two options:

1. Wrap the text in an ```<ng-container``` element. This element is never rendered.

        <ng-container i18n>I don't output any element</ng-container>

2. Wrap the text in a pair of HTML comments.
        
        <!--i18n: optional meaning|optional description -->
        I don't output any element either
        <!--/i18n-->
        
### Translation attributes
Use ```i18n-x``` where ```x``` is the name of the attribute to translate.
    
    <img [src]="logo" i18n-title title="Angular logo" />

### Handle Singular and Plural

    <span i18n>{wolves, plural, =0 {no wolves} =1 {one wolf} =2 {two wolves} other {a wolf pack}}</span>
    
* The first parameter is the key. It is bound to the component property (wolves) that determines the number of wolves.
* The second parameter identifies this as a plural translation type.
* The third parameter defines a pluralization pattern consisting of pluralization categories and their matching values. 


## Create a translation source file with the ng-xi18n tool
Use the ng-xi18n extraction tool to extract the i18n-marked texts into a translation source file in an industry standard format.
This is an Angular CLI tool in the @angular/compiler-cli npm package. If you haven't already installed the CLI and its platform-server peer dependency, do so now:

    npm install @angular/compiler-cli @angular/platform-server --save
    
Open a terminal window at the root of the application project and enter the ng-xi18n command:
    
    ./node_modules/.bin/ng-xi18n
    
#### Other options
You may have to specify additional options. For example, if the tsconfig.json TypeScript configuration file is located somewhere other than in the root folder, you must identify the path to it with the -p option:

    ./node_modules/.bin/ng-xi18n -p path/to/tsconfig.json
    ./node_modules/.bin/ng-xi18n  --i18nFormat=xmb -p path/to/tsconfig.json
    
#### Add an npm script for convenience
Consider adding a convenience shortcut to the scripts section of the package.json to make the command easier to remember and run:

    "scripts": {
      "i18n": "ng-xi18n",
      ...
    }
    
## Merge the completed translation file into the app
To merge the translated text into component templates, compile the application with the completed translation file. The process is the same whether the file is in .xlf format or in another format that Angular understands, such as .xtb.

You provide the Angular compiler with three new pieces of information:

* The translation file.
* The translation file format.
* The Locale ID (es or en-US for instance).

How you provide this information depends upon whether you compile with the JIT (Just-in-Time) compiler or the AOT (Ahead-of-Time) compiler.

* With JIT, you provide the information at bootstrap time.
* With AOT, you pass the information as ngc options.

### Merge with the JIT compiler
The JIT compiler compiles the application in the browser as the application loads. Translation with the JIT compiler is a dynamic process of:

1. Determining the language version for the current user.
2. Importing the appropriate language translation file as a string constant.
3. Creating corresponding translation providers to guide the JIT compiler.
4. Bootstrapping the application with those providers.

Open index.html and revise the launch script as follows:

    <script>
      // Get the locale id somehow
      document.locale = 'es';
    
      // Map to the text plugin
      System.config({
        map: {
          text: 'systemjs-text-plugin.js'
        }
      });
    
      // Launch the app
      System.import('main.js').catch(function(err){ console.error(err); });
    </script>
    
### SystemJS text plugin
Notice the SystemJS mapping of text to a systemjs-text-plugin.js. With the help of a text plugin, SystemJS can read any file as raw text and return the contents as a string. You'll need it to import the language translation file.

SystemJS doesn't ship with a raw text plugin but it's easy to add. Create the following systemjs-text-plugin.js in the src/ folder:

    /*
      SystemJS Text plugin from
      https://github.com/systemjs/plugin-text/blob/master/text.js
    */
    exports.translate = function (load) {
      if (this.builder && this.transpiler) {
        load.metadata.format = 'esm';
        return 'exp' + 'ort var __useDefault = true; exp' + 'ort default ' + JSON.stringify(load.source) + ';';
      }
    
      load.metadata.format = 'amd';
      return 'def' + 'ine(function() {\nreturn ' + JSON.stringify(load.source) + ';\n});';
    }
    
### Create translation providers

Three providers tell the JIT compiler how to translate the template texts for a particular language while compiling the application:

* TRANSLATIONS is a string containing the content of the translation file.
* TRANSLATIONS_FORMAT is the format of the file: xlf, xlf2, or xtb.
* LOCALE_ID is the locale of the target language.

The getTranslationProviders() function in the following src/app/i18n-providers.ts creates those providers based on the user's locale and the corresponding translation file:

    import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID, MissingTranslationStrategy } from '@angular/core';
    import { CompilerConfig } from '@angular/compiler';
    
    export function getTranslationProviders(): Promise<Object[]> {
    
      // Get the locale id from the global
      const locale = document['locale'] as string;
    
      // return no providers if fail to get translation file for locale
      const noProviders: Object[] = [];
    
      // No locale or U.S. English: no translation providers
      if (!locale || locale === 'en-US') {
        return Promise.resolve(noProviders);
      }
    
      // Ex: 'locale/messages.es.xlf`
      const translationFile = `./locale/messages.${locale}.xlf`;
    
      return getTranslationsWithSystemJs(translationFile)
        .then( (translations: string ) => [
          { provide: TRANSLATIONS, useValue: translations },
          { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
          { provide: LOCALE_ID, useValue: locale },
        ])
        .catch(() => noProviders); // ignore if file not found
    }
    
    declare var System: any;
    
    function getTranslationsWithSystemJs(file: string) {
      return System.import(file + '!text'); // relies on text plugin
    }
    
    
1. It gets the locale from the global document.locale variable that was set in index.html.
2. If there is no locale or the language is U.S. English (en-US), there is no need to translate. The function returns an empty noProviders array as a Promise. It must return a Promise because this function could read a translation file asynchronously from the server.
3. It creates a transaction filename from the locale according to the name and location convention described earlier.
4. The getTranslationsWithSystemJs() method reads the translation and returns the contents as a string. Notice that it appends !text to the filename, telling SystemJS to use the text plugin.
5. The callback composes a providers array with the three translation providers.
6. Finally, getTranslationProviders() returns the entire effort as a promise.

### Bootstrap with translation providers
The Angular bootstrapModule() method has a second options parameter that can influence the behavior of the compiler.

You'll create an options object with the translation providers from getTranslationProviders() and pass it to bootstrapModule. Open the src/main.ts and modify the bootstrap code as follows:

    import { platformBrowserDynamic }  from '@angular/platform-browser-dynamic';
    import { getTranslationProviders } from './app/i18n-providers';
    
    import { AppModule } from './app/app.module';
    
    getTranslationProviders().then(providers => {
      const options = { providers };
      platformBrowserDynamic().bootstrapModule(AppModule, options);
    });

    