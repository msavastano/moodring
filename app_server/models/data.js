db.users.save({
  "username" : "crocket",
  "password" : "pass",
  "OauthId": "",
  "OauthToken": ""
});

db.moods.save({
  "label" : "Relaxed",
  "latestMood" : "true",
  "comments":[{
    "comment": "Sounds great!",
    "postedBy" : "571026107ccc3adb0f242973",
    "commentsOnComments":[{
      "commentOnComment":"Thanks!",
      "postedBy" : "571026287ccc3adb0f242974"

    }]
  }]
});

db.users.update(
  {"_id":"570ef16bdabe53761514d4a7"},
  {"moods":"570f06e33604d6e21653954e"},
  { upsert: true }
)

// User id = "571026107ccc3adb0f242973" - crocket
// User id  = "571026287ccc3adb0f242974" - stubs
// Mood id = "5710270213aace17105ae078"
// Comment id = "5710270213aace17105ae079"
// Comment on Comment id = "5710270213aace17105ae07a"
