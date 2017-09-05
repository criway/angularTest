import { Injectable } from '@angular/core';
//import * as incidentsData from '../incidentList.json';

@Injectable()

export class IncidentService {
  getIncidents(): Promise<any> {
//    return Promise.resolve((<any>incidentsData)[0].incidents);
    return Promise.resolve(0);
  }
  getIncident(id: any): Promise<any> {
    return this.getIncidents()
      .then(incidents => incidents.find(incident => incident.id === id));
  }
}
