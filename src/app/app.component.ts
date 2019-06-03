import { AfterViewInit, Component } from '@angular/core';

import { BrowserMultiFormatReader } from '@zxing/library';
import { from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements AfterViewInit {
	codeReader: any;

	code$: Observable<string>;

	selectedDevice$: Observable<string>;

	constructor() {
		this.codeReader = new BrowserMultiFormatReader();
	}

	ngAfterViewInit() {
		this.selectedDevice$ = from(this.codeReader.getVideoInputDevices()).pipe(
			map((videoInputDevices) => videoInputDevices[0].deviceId)
		);

		this.code$ = this.selectedDevice$.pipe(
			switchMap((id) => this.codeReader.decodeFromInputVideoDevice(id, 'video')),
			map((result: any) => result.text)
		);
	}

	public turnOff() {
		this.codeReader.reset();
	}
}
