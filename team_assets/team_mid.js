var apiurl = 'https://ushasi.pythonanywhere.com/';

Vue.component ( 'teamcard', {
	template: `<div class="team-card">
			<img class="team-card-img" :src="this.data_apiurl+scard.member_image">
				<div class="team-card-desc">
					<h1>{{scard.name}}</h1>
					<p>{{scard.quote}}</p>
					<div class="team-card-tag">{{scard.desg}}</div>
					<div class="team-card-tag">{{scard.emai_id}}</div>
					<div class="team-card-tag">{{scard.contact_no}}</div>
				</div>
			</div>`,
	data: function () {
		return {
		data_apiurl:apiurl
		}
	},
	props:["scard"]
});

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
