db.users.save({
  username : "crocket",
  password : "pass",
  OauthId: "",
  OauthToken: "",
});

db.moods.save({
  "label" : "Relaxed",
  "latestMood" : "true",
  "comments":[{
    "comment": "Sounds great!",
    "postedBy" : "570ef16bdabe53761514d4a7",
    "commentsOnComments":[{
      "commentOnComment":"Thanks!",
      "postedBy" : "570ef16bdabe53761514d4a7"

    }]
  }]
});

// User id = "570ef16bdabe53761514d4a7"
// Mood id = "570f06e33604d6e21653954e"
// Comment id = "570f06e33604d6e21653954f"
// Comment on Comment id = "570f06e33604d6e216539550"
