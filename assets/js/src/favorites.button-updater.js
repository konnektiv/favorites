/**
* Updates Favorite Buttons as Needed
*/
var Favorites = Favorites || {};

Favorites.ButtonUpdater = function()
{
	var plugin = this;
	var $ = jQuery;

	plugin.utilities = new Favorites.Utilities;
	plugin.formatter = new Favorites.Formatter;

	plugin.activeButton;
	plugin.data = {};

	plugin.bindEvents = function()
	{
		$(document).on('favorites-user-favorites-loaded', function(){
			plugin.updateAllButtons();
		});
		$(document).on('favorites-cleared', function(){
			plugin.updateAllButtons();
		});
		$(document).on('favorites-updated-single', function(){
			plugin.updateAllButtons();
		});
	}

	/*
	* Update all favorites buttons to match the user favorites
	*/
	plugin.updateAllButtons = function()
	{
		for ( var i = 0; i < $(Favorites.selectors.button).length; i++ ){
			plugin.activeButton = $(Favorites.selectors.button)[i];
			plugin.setButtonData();

			if ( plugin.utilities.isFavorite( plugin.data.postid, plugin.data.site_favorites ) ){
				plugin.data.favorite_count = Favorites.userFavorites[plugin.data.site_index].posts[plugin.data.postid].total;
				var html = plugin.formatter.addFavoriteCount(Favorites.jsData.favorited, plugin.data.favorite_count);
				$(plugin.activeButton).addClass(Favorites.cssClasses.active);
				$(plugin.activeButton).removeClass(Favorites.cssClasses.loading);
				$(plugin.activeButton).html(html);
				continue;
			}

			var html = plugin.formatter.addFavoriteCount(Favorites.jsData.favorite, plugin.data.favorite_count);
			$(plugin.activeButton).removeClass(Favorites.cssClasses.active);
			$(plugin.activeButton).removeClass(Favorites.cssClasses.loading);
			$(plugin.activeButton).html(html);
		}
	}

	/**
	* Set the button data
	*/
	plugin.setButtonData = function()
	{
		plugin.data.postid = $(plugin.activeButton).attr('data-postid');
		plugin.data.siteid = $(plugin.activeButton).attr('data-siteid');
		plugin.data.favorite_count = $(plugin.activeButton).attr('data-favoritecount');
		plugin.data.site_index = plugin.utilities.siteIndex(plugin.data.siteid);
		plugin.data.site_favorites = Favorites.userFavorites[plugin.data.site_index].posts;
	}

	return plugin.bindEvents();
}