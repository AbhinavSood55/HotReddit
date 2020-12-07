from rest_framework import serializers


class RedditSerializer(serializers.Serializer):
    id = serializers.CharField()
    title = serializers.CharField()
    media = serializers.CharField()
    media_only = serializers.BooleanField()
    selftext = serializers.CharField()
    selftext_html = serializers.CharField()

class GetSubRedSerializer(serializers.Serializer):
    subred = serializers.CharField()