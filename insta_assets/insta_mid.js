var apiurl = 'https://ushasi.pythonanywhere.com/';

Vue.component ( 'instacard', {
	template: `<div class="grid-item" v-on:click="$emit('open', scard.post_url)">
                    <div class='grid-post-overlay'>
                        open Post
                    </div>
                    <img :src="scard.post_url+'media/'" />
                </div>`,
	data: function () {
		return {
		data_apiurl:apiurl
		}
	},
	props:["scard"]
});

var insta_disp =new Vue ({
	el:'#insta-mid-end',
	
	data: {
		insta_array:[],
	},
	
	methods: {
		open_post(url) { 
			var righturl= url + '?utm_source=ig_embed&amp;utm_campaign=loading';
			$('.instagram-media').attr('data-instgrm-permalink', righturl);
			$('.to-change').attr('href',righturl);
			
			this.reloadJs("//www.instagram.com/embed.js");
			console.log($('.instagram-media').attr('data-instgrm-permalink'));
			$('.post-popup').css('z-index', 2);
            $('.post-popup').css('opacity', 1);
            $('.window-wrapper').css('width', '80%');

			
        	},
		
		reloadJs(src) {
			console.log("called reload",src);
			src = $('script[src$="' + src + '"]').attr("src");
			$('script[src$="' + src + '"]').remove();
			$('<script/>').attr('src', src).appendTo('head');
		},
		
	},
	
	mounted (){ 
		axios.get(apiurl+'kumaran/view-all-insta-post/')
			 .then(res => {
				 this.insta_array=JSON.parse(JSON.stringify(res.data));
			 });
			 
	},	
	
	updated() {
		var $grid = $('.grid').masonry({
            itemSelector: '.grid-item',
            percentPosition: true,
            columnWidth: '.grid-sizer'
        });
		$grid.imagesLoaded().progress(function() {
            $grid.masonry();
        });
		
	},


});
