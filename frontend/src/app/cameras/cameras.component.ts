import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Camera } from '../camera';
import { CameraService } from '../camera.service';

@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.css']
})
export class CamerasComponent implements OnInit {
  cameras: Camera[];
  tgChatId: number;

  constructor(
    private cameraService : CameraService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getTgChatId();
    this.getCameras();
  }

  getTgChatId() {
    this.tgChatId = +this.route.snapshot.paramMap.get('tgChatId');
  }

  getCameras(): void {
    this.cameraService.getCameras(this.tgChatId).subscribe(
      cameras => {
        this.cameras = cameras;
        for (var i = 0; i < cameras.length; ++i) {
          this.cameras[i].display_order = i+1;
        }
    });
  }

  delete(camera: Camera): void {
    this.cameras = this.cameras.filter(c => c !== camera);
    this.cameraService.deleteCamera(camera).subscribe();
  }
}
