var apiurl = 'https://ushasi.pythonanywhere.com/';

Vue.component ( 'eventcard', {
	template: `<div class="forum-card">
					<div class="forum-card-title">{{scard.event_name}}</div>
					<div class="forum-card-subtitle">{{scard.date_of_event}} </div>
					<button class="view-delete" v-on:click="$emit('view',scard)"> view details</button>
					<button class="view-delete" v-on:click="$emit('delete',scard.ID)"> delete </button>
				</div>`,
	data: function () {
		return {
		data_apiurl:apiurl
		}
	},
	props:["scard"]
});

Vue.component ( 'neweventcard', {
	template: `<div class="new-forum-card">
					<div class="forum-card-title">{{scard.event_name}}</div>
					<div class="forum-card-subtitle">{{scard.date_of_event}} </div>
					<button class="view-delete" v-on:click="$emit('update',scard)"> update</button>
					<button class="view-delete" v-on:click="$emit('delete')"> delete</button>
				</div>`,
	data: function () {
		return {
		data_apiurl:apiurl
		}
	},
	props:["scard"]
});

var event_disp =new Vue ({
	el:'#event-mid-end',
	
	data: {
		event_array:[],
		newevent_array:[],
		pop_notification:"",
		tempindex:0,
		loader:false,
		
		name:"",
		date:"",
		time:"",
		contact:"",
		venue:"",
		links:"",
		quote:"",
		img:"",
		ID:"",
	},
	
	methods: {
		sort()	{
			var temp=[];
			var today= new Date();
			var j=0; var k=0;
			for(i=0; i<this.event_array.length; i++)	{
				var otherdate = new Date(this.event_array[i].date_of_event);
				if( otherdate.getTime() > today.getTime())	this.newevent_array[j++] = this.event_array[i];
				else temp[k++] = this.event_array[i];
			}
			this.event_array = temp;
		},
		
		search()	{
			if(this.key==null || this.key== "") {
				if(this.master_array.length==0)  return "";
				this.event_array=this.master_array;	
				return "";
			}
			this.master_array=this.event_array;
			var temp=[];
			var j=0;
			for(i=0; i<this.event_array.length; i++)	{
				if(this.event_array[i].event_name!=null) { if(this.event_array[i].event_name.includes(this.key))	{temp[j++]=this.event_array[i]; continue;}}
			    if(this.event_array[i].event_desc!=null) {if(this.event_array[i].event_desc.includes(this.key))	{temp[j++]=this.event_array[i]; continue;}}
				if(this.event_array[i].venue!=null) {if(this.event_array[i].venue.includes(this.key))	{temp[j++]=this.event_array[i]; continue;}}
				if(this.event_array[i].link!=null) {if(this.event_array[i].link.includes(this.key))	{temp[j++]=this.event_array[i]; continue;}}
			}
			this.event_array = temp;
		},
		
		reset_search()	{
			if(this.key!=null && this.key!= "") { console.log(this.key); this.event_array=this.master_array;}
		},
		
		opencreatewindow() {
			$('#div-1').addClass('display-close').removeClass('display-open');
			$('#div-3').addClass('display-open').removeClass('display-close');
		},
		
		openviewwindow(obj) {
			this.name=obj.event_name;
			this.contact=obj.contact_concerned;
			this.date=obj.date_of_event;
			this.time=obj.time_of_event;
			this.quote=obj.event_desc;
			this.venue=obj.venue;
			this.links=obj.link;
			this.img=obj.event_image;
			$('#div-1').addClass('display-close').removeClass('display-open');
			$('#div-2').addClass('display-open').removeClass('display-close');
		},
		
		openupdatewindow(obj)	{
			this.name=obj.event_name;
			this.contact=obj.contact_concerned;
			this.date=obj.date_of_event;
			this.time=obj.time_of_event;
			this.venue=obj.venue;
			this.quote=obj.event_desc;
			this.links=obj.link;
			this.img=obj.event_image;
			this.ID=obj.ID;
			this.tempindex= this.newevent_array.indexOf(obj);
			if(this.img==null || this.img=="")	this.img="Image";
			$('#div-1').addClass('display-close').removeClass('display-open');
			$('#div-4').addClass('display-open').removeClass('display-close');
		},
		
		closebutton() {
			$('#div-4').addClass('display-close').removeClass('display-open');
			$('#div-3').addClass('display-close').removeClass('display-open');
			$('#div-2').addClass('display-close').removeClass('display-open');
			$('#div-1').addClass('display-open').removeClass('display-close');
			this.tempindex=0;
			this.name="";
			this.date="";
			this.time="";
			this.contact="";
			this.venue="";
			this.quote=0;
			this.links="";
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
			formData1.append('event_name', this.name);
			formData1.append('contact_concerned', this.contact);
			formData1.append('date_of_event', this.date);
			formData1.append('time_of_event', this.time);
			formData1.append('event_desc', this.quote);
			formData1.append('venue', this.venue);
			formData1.append('event_image', this.img);
			formData1.append('link', this.links);
			
			axios.post(apiurl+'kumaran/enter-event/', formData1,
			{headers:{
				'Content-Type': 'multipart/form-data'
			}})
			     .then(res => {
					 console.log(res);
					 this.pop_notification=res.data;
					 this.loader=false;
					 $('.hover_bkgr_fricc').show();
						axios.get(apiurl+'kumaran/view-all-events/')
							.then(resp => {
								this.event_array=JSON.parse(JSON.stringify(resp.data));
								this.sort();
							});
				 })
				 .catch(e => {
					 this.loader=false;
					 this.pop_notification = "some authorisation error probably... try again or contact customer support"
					 $('.hover_bkgr_fricc').show();
				 });
		},
		
		updateentry() {
			this.loader=true;
			const formData1 = new FormData();
			if(this.name!= this.newevent_array[this.tempindex].event_name) formData1.append('event_name', this.name);
			if(this.contact!= this.newevent_array[this.tempindex].contact_concerned) formData1.append('contact_concerned', this.contact);
			if(this.date!= this.newevent_array[this.tempindex].date_of_event) formData1.append('date_of_event', this.date);
			if(this.time!= this.newevent_array[this.tempindex].time_of_event) formData1.append('time_of_event', this.time);
			if(this.venue!= this.newevent_array[this.tempindex].venue) formData1.append('venue', this.venue);
			if(this.quote!= this.newevent_array[this.tempindex].event_desc) formData1.append('event_desc', this.quote);
			if(this.img!= this.newevent_array[this.tempindex].event_image) formData1.append('event_image', this.img);
			if(this.links!= this.newevent_array[this.tempindex].link) formData1.append('link', this.links);
			
			axios.post(apiurl+'kumaran/update-event/'+this.ID, formData1,
			{headers:{
				'Content-Type': 'multipart/form-data'
			}})
			     .then(res => {
					 console.log(res);
					 this.pop_notification=res.data;
					 this.loader=false;
					 $('.hover_bkgr_fricc').show();
						axios.get(apiurl+'kumaran/view-all-events/')
							.then(resp => {
								this.event_array=JSON.parse(JSON.stringify(resp.data));
								this.sort();
							});
				 })
				 .catch(e => {
					 this.pop_notification = "some authorisation error probably... try again or contact customer support";
					 this.loader=false;
					 $('.hover_bkgr_fricc').show();
				 });
		},
		
		deleteentry(id) {
			axios.delete(apiurl+'kumaran/delete-event/'+id)
				 .then(res => {
					 console.log(res);
					 axios.get(apiurl+'kumaran/view-all-events/')
						  .then(resp => {
							  this.event_array=JSON.parse(JSON.stringify(resp.data));
						 	  this.sort();
						  });
				 });
		},
		
	},
	
	mounted (){ 
		axios.get(apiurl+'kumaran/view-all-events/')
			 .then(res => {
				 this.event_array=JSON.parse(JSON.stringify(res.data));
				 this.sort();
			 });
	},	

});
