import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';


@Component({
  selector: 'map-child',
  templateUrl: './map-child.component.html',
  styleUrls: ['./map-child.component.scss']
})
export class MapChildComponent implements OnInit {

	@Output() onMapLoad: EventEmitter<{}> = new EventEmitter<{}>();

	constructor(public gMaps: GoogleMapsAPIWrapper) { }

	ngOnInit() {
		this.gMaps.getNativeMap().then(map => {
			this.onMapLoad.emit(map);
		});
	}
}
