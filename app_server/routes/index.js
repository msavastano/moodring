var express = require('express');
var router = express.Router();
var Verify = require('../controllers/verify');
var multer = require('multer');
var ctrlMain = require('../controllers/main_controller');
var ctrlFriendPage = require('../controllers/friend_controller');
var ctrlFriendList = require('../controllers/friend_list_controller');
var ctrlComment = require('../controllers/comment_controller');
var ctrlCommentOnComment = require('../controllers/comment_on_comment_controller');
var upload = multer({ dest: './uploads' });
var stringify = require('json-stringify-safe');

//router.post('/image', upload.single('avatar'), function(req, res, next) {
  //console.log("REQ FILES = "+req.file.path);
  //var stream = cloudinary.uploader.upload(req.file.path, function(result) {
    //console.log(result);
    //res.redirect('/');
  //});
//});

router.post('/image', Verify.verifyOrdinaryUser, upload.single('avatar'), ctrlMain.image_cl_upload);

router.get('/image', Verify.verifyOrdinaryUser, ctrlMain.get_image_page);

/* GET Old Moods page. */
router.get('/oldmoods', Verify.verifyOrdinaryUser, ctrlMain.old_moods);

/* GET home page. */
router.get('/', Verify.verifyOrdinaryUser, ctrlMain.index);

/* POST new mood */
router.post('/', Verify.verifyOrdinaryUser, ctrlMain.new_mood);

/* GET friend search page */
router.get('/searchfriends', Verify.verifyOrdinaryUser, ctrlMain.searchFriends);

/* POST friend search page */
router.post('/searchfriends', Verify.verifyOrdinaryUser, ctrlMain.findFriends);

/* GET friend page. */
router.get('/friend/:friendid', Verify.verifyOrdinaryUser, ctrlFriendPage.index);

/* POST add friend page. */
router.post('/friend/:friendid', Verify.verifyOrdinaryUser, ctrlFriendPage.addFriend);

/* GET friend list page. */
router.get('/friendlist', Verify.verifyOrdinaryUser, ctrlFriendList.index);

/* GET  old mood*/
router.get('/oldmoods/:moodid', Verify.verifyOrdinaryUser, ctrlMain.old_mood);

/* GET comment new screen */
router.get('/:moodid/comment/:userid/new', Verify.verifyOrdinaryUser, ctrlComment.index);
/*POST new comment*/
router.post('/:moodid/comment/:userid/new', Verify.verifyOrdinaryUser, ctrlComment.new_comment);
/* GET comment on comment new screen */
router.get('/:moodid/comment/:commentid/commentoncomment/:userid/new', Verify.verifyOrdinaryUser, ctrlCommentOnComment.index);
/*POST new comment on comment*/
router.post('/:moodid/comment/:commentid/commentoncomment/:userid/new', Verify.verifyOrdinaryUser, ctrlCommentOnComment.new_comment_on_comment);


module.exports = router;
