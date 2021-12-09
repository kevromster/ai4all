from rest_framework import viewsets

from ai4all_api import models
from ai4all_api import serializers


def str2bool(v):
    return v.lower() in ("yes", "true", "t", "1")


class SubmitCameraItemViewSet(viewsets.ModelViewSet):
    queryset = models.SubmitCameraItem.objects.all()
    serializer_class = serializers.SubmitCameraItemSerializer

    def get_queryset(self):
        tg_chat_id = self.request.query_params.get('tgChatId', None)
        param_detection_enabled = self.request.query_params.get('detectionEnabled', None)
        detection_enabled = str2bool(param_detection_enabled) if param_detection_enabled is not None else None
        result = models.SubmitCameraItem.objects.all()

        if tg_chat_id is not None:
            result = result.filter(tg_chat_id=tg_chat_id)
        if detection_enabled is not None:
            result = result.filter(detection_enabled=detection_enabled)

        return result
