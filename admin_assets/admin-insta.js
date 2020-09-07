var apiurl = 'https://ushasi.pythonanywhere.com/';

Vue.component ( 'instacard', {
	template: `<div class="insta-card">
					<img class="insta-card-im" :src="scard.post_url+'media/'">
					<div class="insta-card-subtitle">{{scard.date}}: {{scard.post_url}}</div>
					<button class="insta-view-delete" v-on:click="$emit('delete',scard.ID)">delete</button>
				</div>`,
	data: function () {
		return {
		data_apiurl:apiurl
		}
	},
	props:["scard"]
});

var insta_admin_disp =new Vue ({
	el:'#insta-mid-end',
	
	data: {
		insta_array:[],
		instaurl:"",
		pop_notification:"",
		loader:false,
	},
	
	methods: {
		create_post () {
			if(this.instaurl == "")	return "";
			if(!this.instaurl.includes("www.instagram.com")) {
				this.pop_notification = "doesnt seem like a valid instagram post... sorry"
				$('.hover_bkgr_fricc').show();
				return "";
			}
			
			const formData1 = new FormData();
			formData1.append('post_url', this.instaurl);
			
			axios.post(apiurl+'kumaran/create-insta-post/', formData1,
			{headers:{
				'Content-Type': 'multipart/form-data'
			}})
			     .then(res => {
					 this.instaurl="";
					 this.pop_notification=res.data;
					 $('.hover_bkgr_fricc').show();
						axios.get(apiurl+'kumaran/view-all-insta-post/')
							.then(resp => {
								this.insta_array=JSON.parse(JSON.stringify(resp.data));
							});
				 })
				 .catch(e => {
					 this.pop_notification = "some authorisation error probably... try again or contact customer support"
					 $('.hover_bkgr_fricc').show();
				 });
		},
		
		delete_post (id) {
			axios.delete(apiurl+'kumaran/delete-insta-post/'+id)
				 .then(res => {
					 console.log(res);
					 axios.get(apiurl+'kumaran/view-all-insta-post/')
						  .then(resp => {
							  this.insta_array=JSON.parse(JSON.stringify(resp.data));
						  });
				 });
		},
		
	},
	
	mounted (){ 
		axios.get(apiurl+'kumaran/view-all-insta-post/')
			 .then(res => {
				 this.insta_array=JSON.parse(JSON.stringify(res.data));
			 });
	},	

});
