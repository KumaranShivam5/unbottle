var apiurl = 'https://ushasi.pythonanywhere.com/';

Vue.component ( 'joincard', {
	template: `<div class="forum-card">
					<div class="forum-card-title">{{scard.name}}</div>
					<div class="forum-card-subtitle">{{scard.email_id}}</div>
					<button class="view-delete" v-on:click="$emit('view', scard)"> view details</button>
					<button class="view-delete" v-on:click="$emit('delete',scard.ID)"> delete </button>
				</div>`,
	data: function () {
		return {
		data_apiurl:apiurl
		}
	},
	props:["scard"]
});

Vue.component ( 'newjoincard', {
	template: `<div class="new-forum-card">
					<div class="forum-card-title">{{scard.name}} </div>
					<div class="forum-card-subtitle">{{scard.email_id}} </div>
					<button class="view-delete" v-on:click="$emit('view', scard)"> view</button>
					<button class="view-delete" v-on:click="$emit('approve',scard.ID)"> approve </button>
					<button class="view-delete" v-on:click="$emit('delete',scard.ID)"> delete</button>
				</div>`,
	data: function () {
		return {
		data_apiurl:apiurl
		}
	},
	props:["scard"]
});

var team_disp =new Vue ({
	el:'#join-mid-end',
	
	data: {
		join_array:[],
		master_array:[],
		newjoin_array:[],
		disp:"",
		key:null,
		pop_notification:"",
		loader:false,
	},
	
	methods: {
		sort()	{
			var temp=[];
			var j=0; var k=0;
			for(i=0; i<this.join_array.length; i++)	{
				if(this.join_array[i].is_approved)	temp[j++] = this.join_array[i];
				else this.newjoin_array[k++] = this.join_array[i];
			}
			this.join_array = temp;
		},
		
		search()	{
			if(this.key==null || this.key== "") {
				if(this.master_array.length==0)  return "";
				this.join_array=this.master_array;	
				return "";
			}
			this.master_array=this.join_array;
			var temp=[];
			var j=0;
			for(i=0; i<this.join_array.length; i++)	{
				if(this.join_array[i].name!=null) { if(this.join_array[i].name.includes(this.key))	{temp[j++]=this.join_array[i]; continue;}}
			    if(this.join_array[i].email_id!=null) {if(this.join_array[i].email_id.includes(this.key))	{temp[j++]=this.join_array[i]; continue;}}
				if(this.join_array[i].profession!=null) {if(this.join_array[i].profession.includes(this.key))	{temp[j++]=this.join_array[i]; continue;}}
				if(this.join_array[i].organisation!=null) {if(this.join_array[i].organisation.includes(this.key))	{temp[j++]=this.join_array[i]; continue;}}
				if(this.join_array[i].work_capacity!=null) {if(this.join_array[i].work_capacity.includes(this.key))	{temp[j++]=this.join_array[i]; continue;}}
				if(this.join_array[i].how_long!=null) {if(this.join_array[i].how_long.includes(this.key))	{temp[j++]=this.join_array[i]; continue;}}
				if(this.join_array[i].other_comments!=null) {if(this.join_array[i].other_coments.includes(this.key))	{temp[j++]=this.join_array[i]; continue;}}
			}
			this.join_array = temp;
		},
		
		reset_search()	{
			if(this.key!=null && this.key!= "") { console.log(this.key); this.join_array=this.master_array; this.master_array=[];}
		},
		
		opendetailwindow(obj) 	{
			$('#div-1').addClass('display-close').removeClass('display-open');
			$('#div-2').addClass('display-open').removeClass('display-close');
			this.disp = obj;
		},
		
		closebutton() {
			$('#div-2').addClass('display-close').removeClass('display-open');
			$('#div-1').addClass('display-open').removeClass('display-close');
		},
		
		deleteentry(id)	{
			axios.delete(apiurl+'kumaran/delete-join-request/'+id)
				 .then(res => {
					 console.log(res);
					 axios.get(apiurl+'kumaran/view-join-request/')
						  .then(resp => {
							  this.team_array=JSON.parse(JSON.stringify(resp.data));
						  });
				 });
		},
		
		approveentry(id)	{
			axios.patch(apiurl+"kumaran/join-member-approval/"+id+"/allow")
			     .then(res => {
					 console.log(res);
					 axios.get(apiurl+'kumaran/view-all-join-request/')
						  .then(resp => {
							  this.join_array=JSON.parse(JSON.stringify(resp.data));
							  this.sort();
						  });
				 });
		},
		
	},
	
	mounted (){ 
		axios.get(apiurl+'kumaran/view-all-join-request/')
			 .then(res => {
				 this.join_array=JSON.parse(JSON.stringify(res.data));
				 this.sort();
			 });
	},	

});
