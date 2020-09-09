var apiurl = 'https://unbottle.pythonanywhere.com/';

Vue.component ( 'teamcard', {
	template: `<div class="help-card">
					<div class="help-card-desc">
						<div class="help-card-title">{{scard.name}}</div>
						<div class="help-card-subtitle">{{scard.contact_no}}, {{scard.emai_id}}</div>
					</div>
					<button class="help-update-button" v-on:click="$emit('update',scard)"><i class="fas fa-edit"></i></button>
					<button class="help-delete-button" v-on:click="$emit('delete',scard.ID)"><i class="fas fa-trash-alt"></i></button>
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
		master_array:[],
		key:null,
		team_array:[],
		pop_notification:"",
		tempindex:0,
		loader:false,
		
		name:"",
		mail:"",
		contact:"",
		quote:"",
		desg:"",
		img:"",
		ID:0,
	},
	
	methods: {
		search()	{
			if(this.key==null || this.key== "") {
				if(this.master_array.length==0)  return "";
				this.team_array=this.master_array;	
				return "";
			}
			this.master_array=this.team_array;
			var temp=[];
			var j=0;
			for(i=0; i<this.team_array.length; i++)	{
				if(this.team_array[i].name!=null) { if(this.team_array[i].name.includes(this.key))	{temp[j++]=this.team_array[i]; continue;}}
			    if(this.team_array[i].emai_id!=null) {if(this.team_array[i].emai_id.includes(this.key))	{temp[j++]=this.team_array[i]; continue;}}
				if(this.team_array[i].quote!=null) {if(this.team_array[i].quote.includes(this.key))	{temp[j++]=this.team_array[i]; continue;}}
				if(this.team_array[i].desg!=null) {if(this.team_array[i].desg.includes(this.key))	{temp[j++]=this.team_array[i]; continue;}}
			}
			this.team_array = temp;
		},
		
		reset_search()	{
			if(this.key!=null && this.key!= "") { console.log(this.key); this.team_array=this.master_array;}
		},
		
		opencreatewindow() {
			$('#div-1').addClass('display-close').removeClass('display-open');
			$('#div-2').addClass('display-open').removeClass('display-close');
		},
		
		
		openupdatewindow(obj)	{
			this.name=obj.name;
			this.mail=obj.emai_id;
			this.contact=obj.contact_no;
			this.quote=obj.quote;
			this.desg=obj.desg;
			this.img=obj.member_image;
			this.ID=obj.ID;
			this.tempindex= this.team_array.indexOf(obj);
			if(this.img==null || this.img=="")	this.img="Image";
			$('#div-1').addClass('display-close').removeClass('display-open');
			$('#div-3').addClass('display-open').removeClass('display-close');
		},
		
		closebutton() {
			$('#div-3').addClass('display-close').removeClass('display-open');
			$('#div-2').addClass('display-close').removeClass('display-open');
			$('#div-1').addClass('display-open').removeClass('display-close');
			this.tempindex=0;
			this.name="";
			this.mail="";
			this.contact="";
			this.quote="";
			this.desg="";
			this.img="";
			this.ID=0;
		},

		chooseimage(event) {
			this.img = event.target.files[0];
			var file = event.target.files[0].name;
			var dflt = $(event.target).attr("placeholder");
			console.log(this.img);
			if($(event.target).val()!=""){
			$(event.target).next().text(file);
			console.log($(event.target).val());
				} else {
			$(event.target).next().text(dflt);
				}
		},
		
		
		createentry()	{
			this.loader=true;
			const formData1 = new FormData();
			formData1.append('name', this.name);
			formData1.append('emai_id', this.mail);
			formData1.append('member_image', this.img);
			formData1.append('contact_no', this.contact);
			formData1.append('quote', this.quote);
			formData1.append('desg', this.desg);
			
			axios.post(apiurl+'kumaran/enter-team-member/', formData1,
			{headers:{
				'Content-Type': 'multipart/form-data'
			}})
			     .then(res => {
					 console.log(res);
					 this.pop_notification=res.data;
					 this.loader=false;
					 $('.hover_bkgr_fricc').show();
						axios.get(apiurl+'kumaran/view-all-members/')
							.then(resp => {
								this.team_array=JSON.parse(JSON.stringify(resp.data));
							});
				 })
				 .catch(e => {
					 this.pop_notification = "some authorisation error probably... try again or contact customer support";
					 this.loader=false;
					 $('.hover_bkgr_fricc').show();
				 });
		},
		
		updateentry() {
			this.loader=true;
			const formData1 = new FormData();
			if(this.name!= this.team_array[this.tempindex].name) formData1.append('name', this.name);
			if(this.contact!= this.team_array[this.tempindex].contact_no) formData1.append('contact_no', this.contact);
			if(this.mail!= this.team_array[this.tempindex].emai_id) formData1.append('emai_id', this.mail);
			if(this.desg!= this.team_array[this.tempindex].desg) formData1.append('desg', this.desg);
			if(this.img!= this.team_array[this.tempindex].member_image) formData1.append('member_image', this.img);
			if(this.quote!= this.team_array[this.tempindex].quote) formData1.append('quote', this.quote);
			
			axios.post(apiurl+'kumaran/update-team-member/'+this.ID, formData1,
			{headers:{
				'Content-Type': 'multipart/form-data'
			}})
			     .then(res => {
					 console.log(res);
					 this.pop_notification=res.data;
					 this.loader=false;
					 $('.hover_bkgr_fricc').show();
						axios.get(apiurl+'kumaran/view-all-members/')
							.then(resp => {
								this.team_array=JSON.parse(JSON.stringify(resp.data));
							});
				 })
				 .catch(e => {
					 this.pop_notification = "some authorisation error probably... try again or contact customer support";
					 this.loader=false;
					 $('.hover_bkgr_fricc').show();
				 });
		},
		
		deleteentry(id) {
			axios.delete(apiurl+'kumaran/delete-team-member/'+id)
				 .then(res => {
					 console.log(res);
					 axios.get(apiurl+'kumaran/view-all-members/')
						  .then(resp => {
							  this.team_array=JSON.parse(JSON.stringify(resp.data));
						  });
				 });
		},
		
	},
	
	mounted (){ 
		axios.get(apiurl+'kumaran/view-all-members/')
			 .then(res => {
				 this.team_array=JSON.parse(JSON.stringify(res.data));
			 });
	},	

});

