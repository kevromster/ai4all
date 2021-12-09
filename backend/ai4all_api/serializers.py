from rest_framework import serializers
from ai4all_api import models


class SubmitCameraItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SubmitCameraItem
        fields = ('id', 'date_created', 'tg_chat_id', 'name', 'url', 'what_to_detect', 'detection_threshold', 'notification_type', 'last_time_object_presented', 'detection_enabled', 'edge_left', 'edge_top', 'edge_right', 'edge_bottom')
        read_only_fields = ('date_created',)
