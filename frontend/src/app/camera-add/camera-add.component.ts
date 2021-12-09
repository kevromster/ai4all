import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { Camera }         from '../camera';
import { CameraService }  from '../camera.service';
import { DetectionItem, DETECTION_ITEMS } from '../detection-items';
import { NotificationType, NOTIFICATION_TYPES } from '../notification-types';

@Component({
  selector: 'app-camera-add',
  templateUrl: './camera-add.component.html',
  styleUrls: ['./camera-add.component.css']
})
export class CameraAddComponent implements OnInit {
  cameraToAdd: Camera;
  detectionItems: DetectionItem[];
  notificationTypes: NotificationType[];
  camera_edge_as_style: string;
  camera_edge_as_safe_style: SafeStyle;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cameraService: CameraService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.detectionItems = DETECTION_ITEMS;
    this.notificationTypes = NOTIFICATION_TYPES;
    this.createDefaultCameraItem();
    this.updateCameraEdgeStyle();
  }

  createDefaultCameraItem(): void {
    const tgChatId = +this.route.snapshot.paramMap.get('tgChatId');
    this.cameraToAdd = {
      tg_chat_id: tgChatId,
      name: '',
      url: '',
      what_to_detect: DETECTION_ITEMS[2].db_value,
      detection_threshold: 95,
      notification_type: NOTIFICATION_TYPES[0].db_value,
      edge_left: 0,
      edge_top: 0,
      edge_right: 100,
      edge_bottom: 100
    } as Camera;
  }

  goToCamerasList(): void {
    this.router.navigate([`/cameras/${this.cameraToAdd.tg_chat_id}`]);
  }

  add(): void {
    this.cameraService.addCamera(this.cameraToAdd)
      .subscribe(() => this.goToCamerasList());
  }

  whatToDetectChanged(): void {
    if (this.cameraToAdd.what_to_detect == 'car') {
      this.cameraToAdd.detection_threshold = 95;
    } else {
      this.cameraToAdd.detection_threshold = 60;
    }
  }

  updateCameraEdgeStyle(): void {
    this.camera_edge_as_style=`left:${this.cameraToAdd.edge_left|0}%;top:${this.cameraToAdd.edge_top|0}%;bottom:${100-this.cameraToAdd.edge_bottom|0}%;right:${100-this.cameraToAdd.edge_right|0}%`;
    this.camera_edge_as_safe_style=this.sanitizer.bypassSecurityTrustStyle(this.camera_edge_as_style);
  }

  edgeChanged(): void {
    this.updateCameraEdgeStyle();
  }
}
