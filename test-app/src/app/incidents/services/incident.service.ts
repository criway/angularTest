import { Injectable } from '@angular/core';
import * as incidentsData from '../incidentList.json';

@Injectable()

export class IncidentService {
  getIncidents(): Promise<object> {
    return Promise.resolve(<any>incidentsData[0].incidents);
  }
}
