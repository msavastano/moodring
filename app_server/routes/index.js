var express = require('express');
var router = express.Router();
var Verify = require('../controllers/verify');

var ctrlMain = require('../controllers/main_controller');
var ctrlFriendPage = require('../controllers/friend_controller');
var ctrlFriendList = require('../controllers/friend_list_controller');
var ctrlComment = require('../controllers/comment_controller');
var ctrlCommentOnComment = require('../controllers/comment_on_comment_controller');


/* GET home page. */
router.get('/', Verify.verifyOrdinaryUser, ctrlMain.index);

/* POST new mood */
router.post('/', Verify.verifyOrdinaryUser, ctrlMain.new_mood);

/* GET friend search page */
router.get('/searchfriends', Verify.verifyOrdinaryUser, ctrlMain.searchFriends);

/* POST friend search page */
router.post('/searchfriends', Verify.verifyOrdinaryUser, ctrlMain.findFriends);

/* GET home page. */
router.get('/friend/:userid', ctrlFriendPage.index);

/* GET friend list page. */
router.get('/friendlist', ctrlFriendList.index);

/* GET comment new screen */
router.get('/:moodid/comment/new', Verify.verifyOrdinaryUser, ctrlComment.index);
/*POST new comment*/
router.post('/:moodid/comment/new', Verify.verifyOrdinaryUser, ctrlComment.new_comment);

/* GET comment on comment new screen */
router.get('/:moodid/comment/:commentid/commentoncomment/new', Verify.verifyOrdinaryUser, ctrlCommentOnComment.index);
/*POST new comment on comment*/
router.post('/:moodid/comment/:commentid/commentoncomment/new', Verify.verifyOrdinaryUser, ctrlCommentOnComment.new_comment_on_comment);


module.exports = router;
