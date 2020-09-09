var apiurl = 'https://ushasi.pythonanywhere.com/';

Vue.component ( 'therapycard', {
	template: `<div class="help-card">
					<div class="help-card-desc">
						<div class="help-card-title">{{scard.org_name}}</div>
						<div class="help-card-subtitle">{{scard.contact_no}},{{scard.emai_id}} </div>
					</div>
					<button class="help-update-button" v-on:click="$emit('update', scard)"><i class="fas fa-edit"></i></button>
					<button class="help-delete-button" v-on:click="$emit('delete')"><i class="fas fa-trash-alt"></i></button>
				</div>`,
	data: function () {
		return {
		data_apiurl:apiurl
		}
	},
	props:["scard"]
});

var therapy_disp =new Vue ({
	el:'#therapy-mid-end',
	
	data: {
		master_array:[],
		key:null,
		therapy_array:[],
		pop_notification:"",
		tempindex:0,
		loader:false,
		
		name:"",
		contact:"",
		category:"",
		website:"",
		mail:"",
		quote:"",
		logo:"",
		ID:0,
	},
	
	methods: {
		search()	{
			if(this.key==null || this.key== "") {
				if(this.master_array.length==0)  return "";
				this.therapy_array=this.master_array;	
				return "";
			}
			this.master_array=this.therapy_array;
			var temp=[];
			var j=0;
			for(i=0; i<this.therapy_array.length; i++)	{
				if(this.therapy_array[i].org_category!=null) { if(this.therapy_array[i].org_category.includes(this.key))	{temp[j++]=this.therapy_array[i]; continue;}}
			    if(this.therapy_array[i].website!=null) {if(this.therapy_array[i].website.includes(this.key))	{temp[j++]=this.therapy_array[i]; continue;}}
				if(this.therapy_array[i].org_name!=null) {if(this.therapy_array[i].org_name.includes(this.key))	{temp[j++]=this.therapy_array[i]; continue;}}
				if(this.therapy_array[i].emai_id!=null) {if(this.therapy_array[i].emai_id.includes(this.key))	{temp[j++]=this.therapy_array[i]; continue;}}
				if(this.therapy_array[i].quote!=null) {if(this.therapy_array[i].quote.includes(this.key))	{temp[j++]=this.therapy_array[i]; continue;}}
			}
			this.therapy_array = temp;
		},
		
		reset_search()	{
			if(this.key!=null && this.key!= "") { console.log(this.key); this.therapy_array=this.master_array;}
		},
		
		opencreatewindow() {
			$('#div-1').addClass('display-close').removeClass('display-open');
			$('#div-2').addClass('display-open').removeClass('display-close');
		},
		
		openupdatewindow(obj)	{
			this.name=obj.org_name;
			this.contact=obj.contact_no;
			this.category=obj.org_category;
			this.website=obj.website;
			this.mail=obj.emai_id;
			this.quote=obj.quote;
			this.logo=obj.org_logo;
			this.ID=obj.ID;
			this.tempindex= this.therapy_array.indexOf(obj);
			if(this.logo==null || this.logo=="")	this.logo="Logo";
			$('#div-1').addClass('display-close').removeClass('display-open');
			$('#div-3').addClass('display-open').removeClass('display-close');
		},
		
		closebutton() {
			$('#div-3').addClass('display-close').removeClass('display-open');
			$('#div-2').addClass('display-close').removeClass('display-open');
			$('#div-1').addClass('display-open').removeClass('display-close');
			this.name="";
			this.contact="";
			this.category="";
			this.website="";
			this.mail="";
			this.quote="";
			this.logo="";
			this.ID=0;
		},
		
		chooseimage(event) {
			this.logo = event.target.files[0];
			var file = event.target.files[0].name;
			var dflt = $(event.target).attr("placeholder");
			console.log(this.logo);
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
			formData1.append('org_name', this.name);
			formData1.append('contact_no', this.contact);
			formData1.append('org_category', this.category);
			formData1.append('website', this.website);
			formData1.append('emai_id', this.mail);
			formData1.append('org_logo', this.logo);
			formData1.append('quote', this.quote);
			
			axios.post(apiurl+'kumaran/enter-org/', formData1,
			{headers:{
				'Content-Type': 'multipart/form-data'
			}})
			     .then(res => {
					 console.log(res);
					 this.pop_notification=res.data;
					 this.loader=false;
					 $('.hover_bkgr_fricc').show();
						axios.get(apiurl+'kumaran/view-all-org/')
							.then(resp => {
								this.therapy_array=JSON.parse(JSON.stringify(resp.data));
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
			if(this.name!= this.therapy_array[this.tempindex].org_name) formData1.append('org_name', this.name);
			if(this.contact!= this.therapy_array[this.tempindex].contact_no) formData1.append('contact_no', this.contact);
			if(this.category!= this.therapy_array[this.tempindex].org_category) formData1.append('org_category', this.category);
			if(this.website!= this.therapy_array[this.tempindex].website) formData1.append('website', this.website);
			if(this.mail!= this.therapy_array[this.tempindex].emai_id) formData1.append('emai_id', this.mail);
			if(this.logo!= "Logo") formData1.append('org_logo', this.logo);
			if(this.quote!= this.therapy_array[this.tempindex].quote) formData1.append('quote', this.quote);
			
			axios.post(apiurl+'kumaran/update-org/'+this.ID, formData1,
			{headers:{
				'Content-Type': 'multipart/form-data'
			}})
			     .then(res => {
					 console.log(res);
					 this.pop_notification=res.data;
					 this.loader=false;
					 $('.hover_bkgr_fricc').show();
						axios.get(apiurl+'kumaran/view-all-org/')
							.then(resp => {
								this.therapy_array=JSON.parse(JSON.stringify(resp.data));
							});
				 })
				 .catch(e => {
					 this.pop_notification = "some authorisation error probably... try again or contact customer support";
					 this.loader=false;
					 $('.hover_bkgr_fricc').show();
				 });
		},
		
		deleteentry(id) {
			axios.delete(apiurl+'kumaran/delete-org/'+id)
				 .then(res => {
					 console.log(res);
					 axios.get(apiurl+'kumaran/view-all-org/')
						  .then(resp => {
							  this.therapy_array=JSON.parse(JSON.stringify(resp.data));
						  });
				 });
		},
		
	},
	
	mounted (){ 
		axios.get(apiurl+'kumaran/view-all-org/')
			 .then(res => {
				 this.therapy_array=JSON.parse(JSON.stringify(res.data));
			 });
	},	

});
