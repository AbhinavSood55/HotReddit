from django.shortcuts import render
import praw
import json


# Create your views here.
def index(request, *args, **kwargs):
    # reddit = praw.Reddit(
    #     client_id="2VoNNO8E4tfbrg",
    #     client_secret="z1fkyTK7AjNOupKGq3dQ4jpE2CNOZQ",
    #     user_agent="my user agent"
    # )
    
    # subreddit = reddit.subreddit('python')
    
    # hot_sub = subreddit.hot(limit = 5)

    # sub_dict = { "subreddit-"+sub.id:
    #         {
    #         # "selftext":sub.selftext, 
    #         # "selftext_html":sub.selftext_html, 
    #         "media":sub.media, 
    #         # "media_embed":sub.media_embed, 
    #         "media_only":sub.media_only
    #     } 
    #     for sub in hot_sub
    # }

    # appData = {"col_sub":sub_dict}

    return render(request, 'frontend_root/index.html')#, appData) #sub_dict)