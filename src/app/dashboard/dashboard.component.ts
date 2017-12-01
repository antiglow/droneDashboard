import { Component, OnInit } from '@angular/core';
import { TelemetryService } from '../telemetry.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

	telem = {lat: 0, lon: 0};
	connected = false;
	constructor(
		private teleServ: TelemetryService
	) { }

	ngOnInit() {
		this.teleServ.telemSub.subscribe(telem => {
			this.telem = telem;
		});
	}

	connect() {
		let telSub = this.teleServ.connect().subscribe(res => {
			alert("in connect response");
			if (res["conStatus"] == true) {
				this.connected = true;
			} else {
				this.connected = false;
			}
			alert(res["conStatus"]);
			telSub.unsubscribe();
		});
	}
}
