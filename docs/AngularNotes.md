## Services
- The naming convention for service files is the service name in lowercase followed by .service. For a multi-word service name, use lower dash-case. For example, the filename for SpecialSuperHeroService is ```special-super-hero.service.ts```


    import { Injectable } from '@angular/core';    

    @Injectable() // do not forget "()" cause it leads to an error dificult to diagnose
    export class JsonReaderService {
    }
    
## Copy Extra Files On Building
To use extra files in the app, we have to ask angular to copy them. To do so, we have to write the path of those files
in the "assets" property of ```.angular-cli.json```