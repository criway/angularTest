import { Component, OnInit } from '@angular/core';

import { IncidentService } from "./services/incident.service";

@Component({
  selector: 'incidents',
  templateUrl: './incidents.component.html',
  styleUrls: [ './incidents.component.css' ],
  providers: [IncidentService]
})


export class IncidentsComponent implements OnInit {
  incidentList;

  constructor(private incidentService: IncidentService) {}

  ngOnInit() {
    this.getIncidents();
  }

  getIncidents(): void {
    this.incidentService.getIncidents().then(incidents => this.incidentList = incidents);
  }
}
