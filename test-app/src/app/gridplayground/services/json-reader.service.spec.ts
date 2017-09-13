import {ComponentFixture, TestBed, inject, async, getTestBed} from '@angular/core/testing';
import {JsonReaderService} from './json-reader.service';
import {BaseRequestOptions, Http, HttpModule, XHRBackend, ResponseOptions, Response} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';


fdescribe('JsonReaderService without TestBed', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        JsonReaderService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory:
            (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(backend, defaultOptions);
            }
        }
      ],
      imports: [
        HttpModule
      ]
    });
    TestBed.compileComponents();
  }));

  it('should run a test that finishes eventually', done => {
    // kick off an asynchronous call in te background
    setTimeout(() => {
      console.log('now we are done');
      done();
    }, 500);
  });

  it('should get data from json', async(() => {
    const jsonReaderService: JsonReaderService = getTestBed().get(JsonReaderService);
    const mockBackend: MockBackend = getTestBed().get(MockBackend);

    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
              body: [
                {
                  id: 26,
                  contentRendered: '<p><b>Hi there</b></p>',
                  contentMarkdown: '*Hi there*'
                }]
            }
          )));
      });
    jsonReaderService.getDataFromJson('filename.json').then(
      (data) => {
        expect(true).toBeTruthy();
      }
    );
  }));

  it('JsonReaderService is injected', () => {
    inject([JsonReaderService], (jsonReaderService) => {
      expect(jsonReaderService).toBeDefined();
    });
  });
});

