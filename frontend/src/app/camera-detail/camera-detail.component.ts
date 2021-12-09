import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { Camera }         from '../camera';
import { CameraService }  from '../camera.service';
import { DetectionItem, DETECTION_ITEMS } from '../detection-items';
import { NotificationType, NOTIFICATION_TYPES } from '../notification-types';

@Component({
  selector: 'app-camera-detail',
  templateUrl: './camera-detail.component.html',
  styleUrls: [ './camera-detail.component.css' ]
})
export class CameraDetailComponent implements OnInit {
  @Input() camera: Camera;
  detectionItems: DetectionItem[];
  notificationTypes: NotificationType[];
  camera_edge_as_style: string;
  camera_edge_as_safe_style: SafeStyle;

  constructor(
    private route: ActivatedRoute,
    private cameraService: CameraService,
    private location: Location,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.detectionItems = DETECTION_ITEMS;
    this.notificationTypes = NOTIFICATION_TYPES;
    this.getCamera();
  }

  getCamera(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.cameraService.getCamera(id)
      .subscribe(camera => {
        this.camera = camera;
        this.updateCameraEdgeStyle();
      });
  }

  updateCameraEdgeStyle(): void {
    this.camera_edge_as_style=`left:${this.camera.edge_left|0}%;top:${this.camera.edge_top|0}%;bottom:${100-this.camera.edge_bottom|0}%;right:${100-this.camera.edge_right|0}%`;
    this.camera_edge_as_safe_style=this.sanitizer.bypassSecurityTrustStyle(this.camera_edge_as_style);
    console.log(`as style: ${this.camera_edge_as_style}`);
  }

  goBack(): void {
    this.location.back();
  }

  update(): void {
    this.cameraService.updateCamera(this.camera)
      .subscribe(() => this.goBack());
  }

  whatToDetectChanged(): void {
    if (this.camera.what_to_detect == 'car') {
      this.camera.detection_threshold = 95;
    }
    else {
      this.camera.detection_threshold = 60;
    }
  }

  edgeChanged(): void {
    this.updateCameraEdgeStyle();
  }
}
