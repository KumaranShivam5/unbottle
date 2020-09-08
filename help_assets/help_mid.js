var apiurl = 'https://ushasi.pythonanywhere.com/';

Vue.component ( 'helpcard', {
	template: `<div class="h-card">
                    <img :src="data_apiurl+scard.org_logo" alt="" class="card-img">
                    <div class="card-details">
                    <span class="card-ctg">{{scard.org_category}}</span>
                    <span class="card-title">{{scard.org_name}}</span>

                    <div class="detail-text-wrap">
                        <span class="detail-title">Email:</span><span class="detail-text">{{scard.emai_id}}</span>
                     </div>
                    <div class="detail-text-wrap">
						<span class="detail-title">website:</span><a href="www.seeU.com" class="detail-text">{{scard.website}}</a>
                    </div>
                    <div class="detail-text-wrap">
                        <span class="detail-title">Contact:</span><span class="detail-text">{{scard.contact_no}}</span>
                    </div>
					<div class="detail-text-wrap">
						{{scard.quote}}
					</div>
                        <div class="contact-btn" v-on:click="$emit('text',scard.emai_id)">Send A text</div>
                    </div>
                </div>`,
	data: function () {
		return {
		data_apiurl:apiurl
		}
	},
	props:["scard"]
});

var help_disp =new Vue ({
	el:'#help-mid-end',
	
	data: {
		help_array:[],
		name:"",
		email:"",
		message:"",
		pop_notification:"",
	},
	
	methods: {
		contactus()	{
			$('#contactpop').fadeIn();
		},
		
		closecontactus() {
			$('#contactpop').fadeOut();
			this.name="";
			this.message="";
			this.email="";
		},
		
		reset_button() {
			this.name="";
			this.message="";
			this.email="";
		},
		
		post_query(mail) {
			axios.get('https://script.google.com/macros/s/AKfycbyX6_TrFBz_H48N0CWKKzeJfppUh2ce2eq3Pws-YPllvjoEE9k/exec?name='+this.name+'&email='+this.email+
			'&message='+this.message+'&to_email='+mail)
				.then(res => {
					this.pop_notification = res.data;
					$('#contactpop').hide();
					$('#notfpop').show();
				})
		},
		
		close_message() {
			$('#notfpop').hide();
			$('#contactpop').show();	
		},

	},
	
	mounted (){ 
		axios.get(apiurl+'kumaran/view-all-org/')
			 .then(res => {
				 this.help_array=JSON.parse(JSON.stringify(res.data));
			 });
	},	

});
