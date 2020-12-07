from rest_framework import views, permissions, status
from rest_framework.response import Response
from .serializers import RedditSerializer, GetSubRedSerializer
import praw
import json

# Create your views here.
class reddit_views(views.APIView):
    serializer_class = GetSubRedSerializer
    
    def post(self, request, format=None):
        reddit = praw.Reddit(
            client_id= "2VoNNO8E4tfbrg",
            client_secret="z1fkyTK7AjNOupKGq3dQ4jpE2CNOZQ",
            user_agent="my user agent"
        )
        
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            subred = serializer.data['subred']

        subreddit = reddit.subreddit(subred)
        hot_sub = subreddit.hot(limit = 5)
        try:
        
            sub_dict = [
                    {  
                    "id":sub.id,
                    "title":sub.title,
                    "media":sub.media, 
                    "media_only":sub.media_only,
                    "selftext":sub.selftext,
                    "selftext_html":sub.selftext_html,
                } 
                for sub in hot_sub  #fetching reddit lists
            ]

            results = RedditSerializer(sub_dict, many=True).data
            return Response(results)
        except:
            return Response( "Invalid Search no list returned", status=status.HTTP_400_BAD_REQUEST)