var apiurl = 'https://ushasi.pythonanywhere.com/';

Vue.component ( 'teamcard', {
	template: `<div class="trial-card">
                    <div class="trial-card-wrap">
                        <div class="trial-card-skew"></div>
                        <div class="trial-card-img" :style="{'background-image':'url('+data_apiurl+scard.member_image+')'}"></div>
                        <div class="trial-overlay-dark"></div>
                        <div class="trial-overlay">
                            <p class="overlay-quote">{{scard.quote}}</p>
                            <div class="trial-card-details">
                                <span class="trial-card-detail">{{scard.name}}</span>
                                <span class="trial-card-detail">{{scard.desg}}</span>
                                <span class="trial-card-detail">{{scard.emai_id}}</span>
                            </div>
                        </div>
                    </div>
                </div>`,
	data: function () {
		return {
		data_apiurl:apiurl
		}
	},
	props:["scard"]
});

//:style="{'background-image':'url('+data_apiurl+scard.member_image+')'}"
var team_disp =new Vue ({
	el:'#team-mid-end',
	
	data: {
		team_array:[],
	},
	
	methods: {
		
		
	},
	
	mounted (){ 
		axios.get(apiurl+'kumaran/view-all-members/')
			 .then(res => {
				 this.team_array=JSON.parse(JSON.stringify(res.data));
			 });
	},	

});
