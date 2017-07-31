import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';
import { IncidentService} from './services/incident.service';

@Component({
  selector: 'incident-detail',
  templateUrl: './incident-detail.component.html',
  styleUrls: [ './incident-detail.component.css' ]
})

export class IncidentDetailComponent implements OnInit {
  incident;

  constructor(
    private incidentService: IncidentService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.incidentService.getIncident(+params.get('id')))
      .subscribe(incident => this.incident = incident);
  }

  goBack(): void {
    this.location.back();
  }
}
