import { Component, OnInit } from '@angular/core';
import { TelemetryService } from '../telemetry.service';
import { GoogleMapsAPIWrapper } from '@agm/core';
import * as $ from 'jquery';
declare let google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	telem = {lat: 0, lon: 0};
	connected = false;
	map: any;
	markers: Marker[] = [];
	constructor(
		private teleServ: TelemetryService,
		private gMaps: GoogleMapsAPIWrapper
	) { }

	ngOnInit() {
		this.teleServ.telemSub.subscribe(telem => {
			this.telem = telem;
		});
	}

	private getLatLng(lat, lng) {
		return new google.maps.LatLng(lat, lng);
	}

	public loadAPIWrapper(map) {
		this.map = map;
	}

	public loadNewPos() {
		const pos = this.getLatLng(38.8756844,-104.7583595);
		this.map.panTo(pos)
	}
	public pushMarker() {
		var marker = {
			label: "test",
			lat: 0,
			lng: 0,
			draggable: false
		}
		this.markers.push(marker);
	}

	public connect() {
		let telSub = this.teleServ.connect().subscribe(res => {
			if (res["conStatus"] == true) {
				this.connected = true;
				setTimeout(() => {
					const pos = this.getLatLng(this.telem.lat, this.telem.lon);
					this.map.panTo(pos);
				}, 1000);
				setTimeout(() => {
					var droneMarker = {
						lat: Number(this.telem.lat),
						lng: Number(this.telem.lon),
						label: "Copter",
						draggable: false
					};
					this.markers.push(droneMarker);
					console.log(this.markers);
				}, 2000);
			} else {
				this.connected = false;
			}
			telSub.unsubscribe();
		});
	}
}

interface Marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
