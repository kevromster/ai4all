import os

from django.db import models

from ai4all_api.detection_items import DETECTION_ITEMS
from ai4all_api.notification_types import NOTIFICATION_TYPES


class SubmitCameraItem(models.Model):
    date_created = models.DateTimeField(auto_now_add=True)
    tg_chat_id = models.BigIntegerField()
    name = models.CharField(max_length=255, blank=True, default='')
    url = models.CharField(max_length=2048, blank=False)
    what_to_detect = models.CharField(choices=DETECTION_ITEMS, max_length=100)
    detection_threshold = models.IntegerField()
    detection_enabled = models.BooleanField(default=True)

    notification_type = models.CharField(choices = NOTIFICATION_TYPES, max_length=100)

    # used for 'appearance/disappearance' notification type
    last_time_object_presented = models.BooleanField(default=False)

    # Region of image where the detection to be run.
    # Specified in percents from the image size.
    edge_left = models.IntegerField(default=0)
    edge_top = models.IntegerField(default=0)
    edge_right = models.IntegerField(default=100)
    edge_bottom = models.IntegerField(default=100)

    def __str__(self):
        return "{}".format(self.name)

    class Meta:
        ordering = ('date_created',)
