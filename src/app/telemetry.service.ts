import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class TelemetryService {
	private connected: boolean = false;
	public telemSub: BehaviorSubject<{lat: number, lon: number}> = new BehaviorSubject<{lat: number, lon: number}>({lat: 0, lon: 0});

	constructor(private http: Http) { }
	
	public connect(): Observable<Response> {
		return this.http
		.post('/api/connect', {headers: this.getHeaders()})
		.map(res => this.mapTelem(res))
		.catch(this.handelError);
	}

	private getCoords(): Observable<Response> {
		return this.http
		.get('api/getCoords', { headers: this.getHeaders()})
		.map(res => res.json())
		.catch(this.handelError);
	}

	private mapTelem(res): Response {
		console.log(res);
		this.connected = true;
		this.contUpdate();
		return res.json();
	}

	private contUpdate() {
		if (this.connected) {
			setTimeout(() => {
				let getCoordsSub = this.getCoords().subscribe(res => {
					this.telemSub.next(res["telem"]);
					this.contUpdate();
					getCoordsSub.unsubscribe();
				});
			}, 500);
		}
	}

	private getHeaders() {
		let headers = new Headers();
		headers.append('Accept', 'application/json');
		return headers;
	}
	
	private handelError(err: any) {
		try {
			var errObj = JSON.parse(err._body);
		} catch(e) {
		}
		let errMsg = errObj.err || "stuff went wrong";
		alert(errMsg);
		return Observable.throw(errMsg);
	}
}
