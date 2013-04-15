var _ = require("underscore");
var path = require("path");

var helper_utils = require("punch").Utils.Helper;
var blog_content_handler = require("punch-blog-content-handler");

var categories_list = [];
var last_modified = null;

var fetch_categories = function(callback) {

  var direct_categories_obj = {};

  // reset the categories list
  categories_list = [];

	// reset posts list
	blog_content_handler.allPosts = {};

	blog_content_handler.getAllPosts(function(err, posts_obj, posts_last_modified) {
		if (!err) {
			var all_posts = _.values(posts_obj);
			last_modified = posts_last_modified;

      _.each(all_posts, function(post) {
        _.each(post.tags, function(tag) {
          var posts_list_for_tag = direct_categories_obj[tag] || [];
          posts_list_for_tag.push(post);
          direct_categories_obj[tag] = posts_list_for_tag;
        });
      });

      _.each(direct_categories_obj, function(posts, category) {
        categories_list.push({ name: category, posts: posts.slice(0, 5) });
      });

      return callback();
		} else {
			console.log(err);
			return callback();
		}
	});
}

var tag_helpers = {
	categories: function() {
		return categories_list;
	}
};

module.exports = {

	setup: function(config) {

	},

	directAccess: function(){
		return { "block_helpers": {}, "tag_helpers": {}, "options": {} };
	},

	get: function(basepath, file_extension, options, callback){
		var self = this;

		if (basepath !== "/index") {
			return callback(null, {}, {}, null);
		}

		fetch_categories(function() {
			return callback(null, { "tag": tag_helpers }, {}, last_modified);
		});
	}
}
