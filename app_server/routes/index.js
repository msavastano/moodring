var express = require('express');
var router = express.Router();

var ctrlMain = require('../controllers/main_controller');
var ctrlFriendPage = require('../controllers/friend_controller');
var ctrlFriendList = require('../controllers/friend_list_controller');
var ctrlComment = require('../controllers/comment_controller');
var ctrlCommentOnComment = require('../controllers/comment_on_comment_controller');


/* GET home page. */
router.get('/', ctrlMain.index);

/* POST new mood */
router.post('/', ctrlMain.new_mood);

/* GET home page. */
router.get('/friend/:userid', ctrlFriendPage.index);

/* GET friend list page. */
router.get('/friendlist', ctrlFriendList.index);

/* GET comment new screen */
router.get('/:moodid/comment/new', ctrlComment.index);
/*POST new comment*/
router.post('/:moodid/comment/new', ctrlComment.new_comment);

/* GET comment on comment new screen */
router.get('/:moodid/comment/:commentid/commentoncomment/new', ctrlCommentOnComment.index);
/*POST new comment on comment*/
router.post('/:moodid/comment/:commentid/commentoncomment/new', ctrlCommentOnComment.new_comment_on_comment);


module.exports = router;
