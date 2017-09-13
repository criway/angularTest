## Isolated Unit Tests VS Angular Testing utilites.
Isolated unit tests examine an instance of a class all by itself without any dependence on Angular or any injected values. The tester creates a test instance of the class with new, supplying test doubles for the constructor parameters as needed, and then probes the test instance API surface.

You should write isolated unit tests for pipes and services. However, isolated unit tests don't reveal how components interact with Angular. In particular, they can't reveal how a component class interacts with its own template or with other components.

Such tests require the Angular testing utilities. The Angular testing utilities include the TestBed class and several helper functions from @angular/core/testing.
### Test a Component

1. ```TestBed``` is the first and most important of the Angular testing utilities. It creates an Angular testing module—an ```@NgModule``` class—that you configure with the ```configureTestingModule``` method to produce the module environment for the class you want to test.

    In effect, you detach the tested component from its own application module and re-attach it to a dynamically-constructed Angular test module tailored specifically for this battery of tests.
    
    The ```configureTestingModule``` method takes an @NgModule-like metadata object. The metadata object can have most of the properties of a normal NgModule.
    
    Call ```configureTestingModule``` within a beforeEach so that TestBed can reset itself to a base state before each test runs.
   
2. ```createComponent```. After configuring ```TestBed```, you tell it to create an instance of the component-under-test.

3. ```componentFixture, debugElement, query(By.css)```. The ```createComponent``` method returns a ```ComponentFixture```, a handle on the test environment surrounding the created component. The fixture provides access to the component instance itself and to the ```DebugElement```, which is a handle on the component's DOM element.

    The ```query``` method takes a predicate function and searches the fixture's entire DOM tree for the first element that satisfies the predicate. The result is a different ```DebugElement```, one associated with the matching DOM element
    
    he By class is an Angular testing utility that produces useful predicates. Its ```By.css``` static method produces a standard CSS selector predicate that filters the same way as a jQuery selector.
    


* *detectChanges*: Each test tells Angular when to perform change detection by calling ```fixture.detectChanges()```
* *Automatic Change detection*:

    That's possible by configuring the TestBed with the ```ComponentFixtureAutoDetect``` provider. First import it from the testing utility library: 
    
        import { ComponentFixtureAutoDetect } from '@angular/core/testing'
    
    Then add it to the providers array of the testing module configuration:
    
        TestBed.configureTestingModule({
          declarations: [ BannerComponent ],
          providers: [
            { provide: ComponentFixtureAutoDetect, useValue: true }
          ]
        })
        
### Test a component with an external template
That's a problem for the tests. The ```TestBed.createComponent``` method is synchronous. But the Angular template compiler must read the external files from the file system before it can create a component instance. That's an **asynchronous activity**. The previous setup for testing the inline component won't work for a component with an external template.

* The first asynchronous *beforeEach*:

    The logic in the beforeEach of the previous spec is split into two beforeEach calls: 

    1. The first beforeEach handles asynchronous compilation. Notice the ```async``` function called as the argument to ```beforeEach```. The ```async``` function is one of the Angular testing utilities and has to be imported.
            
            import { async } from '@angular/core/testing';
            //----
    
            // async beforeEach
            beforeEach(async(() => {
              TestBed.configureTestingModule({
                declarations: [ BannerComponent ], // declare the test component
              })
              .compileComponents();  // compile template and css
            }));
        All this is necessary in order to call the asynchronous TestBed.compileComponents method.
        
* *compileComponents*: 
    The ```TestBed.configureTestingModule``` method returns the ```TestBed``` class so you can chain calls to other ```TestBed``` static methods such as ```compileComponents```.
    The ```TestBed.compileComponents``` method asynchronously compiles all the components configured in the testing module.
    
* The second synchronous *beforeEach*:
    
    A synchronous ```beforeEach``` containing the remaining setup steps follows the asynchronous ```beforeEach```.

* Waiting for *compileComponents*:

    The ```compileComponents``` method returns a promise so you can perform additional tasks immediately after it finishes. For example, you could move the synchronous code in the second beforeEach into a ```compileComponents().then(...)``` callback and write only one ```beforeEach```.
    
    Most developers find that hard to read. The two ```beforeEach``` calls are widely preferred.
    
### Test a component with a dependency
    
We have a component that depends on a service. So:

        TestBed.configureTestingModule({
           declarations: [ WelcomeComponent ],
        // providers:    [ UserService ]  // NO! Don't provide the real service!
                                          // Provide a test-double instead
           providers:    [ {provide: UserService, useValue: userServiceStub } ]
        });
This time, in addition to declaring the *component-under-test*, the configuration adds a ```UserService``` provider to the providers list. But not the real ```UserService```.

* Provide service test doubles:

    **A *component-under-test* doesn't have to be injected with real services. In fact, it is usually better if they are test doubles (stubs, fakes, spies, or mocks). The purpose of the spec is to test the component, not the service, and real services can be trouble.**
    
* Get injected services

    The safest way to get the injected service, the way that always works, is to get it from the injector of the component-under-test. The component injector is a property of the fixture's DebugElement.
        
        // UserService actually injected into the component
        userService = fixture.debugElement.injector.get(UserService);
        
        
### Test a component with an async service




### Test Services. Isolated Unit Test
 It's often more productive to explore the inner logic of application classes with isolated unit tests that don't depend upon Angular. Such tests are often smaller and easier to read, write, and maintain.
 