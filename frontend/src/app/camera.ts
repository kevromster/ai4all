export class Camera {
  id: number;
  display_order: number; // order in the cameras list; used only on UI
  tg_chat_id: number;
  name: string;
  url: string;
  what_to_detect: string;
  detection_threshold: number;
  notification_type: string;
  detection_enabled: boolean;
  edge_left: number;
  edge_right: number;
  edge_top: number;
  edge_bottom: number;
}
