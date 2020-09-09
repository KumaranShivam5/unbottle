var apiurl = 'https://unbottle.pythonanywhere.com/';

Vue.component ( 'forumcard', {
	template: `<div class="forum-card">
					<div class="forum-card-title">{{scard.topic}} </div>
					<div class="forum-card-subtitle">{{scard.creator}} </div>
					<div class="forum-card-subtitle">{{scard.forum_ctg}} </div>
					<button class="view-delete" v-on:click="$emit('open',scard.ID)"> view details</button>
					<button class="view-delete" v-on:click="$emit('delete',scard.ID)"> delete</button>
					<button class="view-delete" v-on:click="$emit('update',scard)"> update</button>
				</div>`,
	data: function () {
		return {
		data_apiurl:apiurl
		}
	},
	props:["scard"]
});

Vue.component ( 'newforumcard', {
	template: `<div class="new-forum-card">
					<div class="forum-card-title">{{scard.topic}} </div>
					<div class="forum-card-subtitle">{{scard.creator}} </div>
					<div class="forum-card-subtitle">{{scard.forum_ctg}} </div>
					<button class="view-delete" v-on:click="$emit('open',scard.ID)"> view</button>
					<button class="view-delete" v-on:click="$emit('approve',scard.ID)"> approve </button>
					<button class="view-delete" v-on:click="$emit('delete',scard.ID)"> delete</button>
					<button class="view-delete" v-on:click="$emit('update',scard)"> update</button>
				</div>`,
	data: function () {
		return {
		data_apiurl:apiurl
		}
	},
	props:["scard"]
});

Vue.component ( 'messagecard', {
	template: `<div class="message-card">
				<div class="message-card-desc">
				<div class="message-card-title">{{scard.creator}}</div>
				<div class="message-card-subtitle">{{scard.date_msg}}</div>
				<div> message : {{scard.message}}</div>
				</div>
				<button class="message-card-button" v-on:click="$emit('delete',scard.ID, scard.topic_id)"><i class="fas fa-trash-alt"></i></button>
			</div>`,
	data: function () {
		return {
		data_apiurl:apiurl
		}
	},
	props:["scard"]
});

Vue.component ( 'ctglisting', {
	template: `<div class="category-item">
						{{slist.ctg_name}}<button class="category-button" v-on:click="$emit('delete',slist.ctg_name)">-</button>
					</div>`,
	data: function () {
		return {
		data_apiurl:apiurl
		}
	},
	props:["slist"]
});


var forum_admin_disp =new Vue ({
	el:'#forum-mid-end',
	
	data: {
		master_array:[],
		forum_array:[],
		newforum_array:[],
		forum_message:[],
		forum_ctg:[],
		apiurl:"",
		add_ctg:"",
		pop_notification:"",
		loader:false,
		tempobj:"",
		isdiv:false,
		key:null,
		
		title:"",
		img:"",
		ctg:"",
		author:"",
	},
	
	methods: {
		sort()	{
			var temp=[];
			var j=0; var k=0;
			for(i=0; i<this.forum_array.length; i++)	{
				if(this.forum_array[i].is_approved)	temp[j++] = this.forum_array[i];
				else this.newforum_array[k++] = this.forum_array[i];
			}
			this.forum_array = temp;
		},
		
		search()	{
			if(this.key==null || this.key== "") {
				if(this.master_array.length==0)  return "";
				this.forum_array=this.master_array;	
				return "";
			}
			this.master_array=this.forum_array;
			var temp=[];
			var j=0;
			for(i=0; i<this.forum_array.length; i++)	{
				if(this.forum_array[i].topic.includes(this.key))	{temp[j++]=this.forum_array[i]; continue; }
				if(this.forum_array[i].forum_ctg!=null) { if(this.forum_array[i].forum_ctg.includes(this.key))	{temp[j++]=this.forum_array[i]; continue;}}
			    if(this.forum_array[i].creator!=null) {if(this.forum_array[i].creator.includes(this.key))	{temp[j++]=this.forum_array[i]; continue;}}
			}
			this.forum_array = temp;
		},
		
		reset_search()	{
			if(this.key!=null && this.key!= "") { console.log(this.key); this.forum_array=this.master_array;}
		},
		
		search_message()	{
			if(this.key==null || this.key== "") {
				if(this.master_array.length==0)  return "";
				this.forum_message[1]=this.master_array;	
				return "";
			}
			this.master_array=this.forum_message;
			var temp=[[],[]];
			temp[0]=this.forum_message[0];
			console.log(temp[0]);
			var j=0;
			for(i=0; i<this.forum_message[1].length; i++)	{
				if(this.forum_message[1][i].message!=null) { if(this.forum_message[1][i].message.includes(this.key))	{temp[1][j++]=this.forum_message[1][i]; continue;}}
			    if(this.forum_message[1][i].creator!=null) {if(this.forum_message[1][i].creator.includes(this.key))	{temp[1][j++]=this.forum_message[1][i]; continue;}}
			}
			this.forum_message = temp;
			console.log(temp, this.forum_message);
		},
		
		reset_search_message()	{
			if(this.key!=null && this.key!= "") { console.log(this.key); this.forum_message=this.master_array;}
		},
		
		open_forum_message (id)	{
			axios.get(apiurl+'kumaran/view-forum-id/'+id)
			 .then(res => {
				 this.forum_message=JSON.parse(JSON.stringify(res.data));
				 $('#div-1').addClass('display-close').removeClass('display-open');
				 $('#div-2').addClass('display-open').removeClass('display-close');
			 });
		},
		
		open_update_forum (obj)	{
			this.title=obj.topic;
			this.img=obj.image;
			this.ctg=obj.forum_ctg;
			this.author=obj.creator;
			this.tempobj=obj;
			this.isdiv=true;
			$('#div-1').addClass('display-close').removeClass('display-open');
			$('#div-5').addClass('display-open').removeClass('display-close');
		},
		
		closebutton() {
			$('#div-2').addClass('display-close').removeClass('display-open');
			$('#div-5').addClass('display-close').removeClass('display-open');
			$('#div-3').addClass('display-close').removeClass('display-open');
		    $('#div-1').addClass('display-open').removeClass('display-close');
			this.title="";
			this.img="";
			this.ctg="";
			this.author="";
			this.tempobj="";
			this.notification="";
			this.loader=false;
			this.isdiv=false;
			this.key=null;
			this.master_array=[];
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
		
		delete_forum(id)	{
			axios.delete(apiurl+'kumaran/delete-forum/'+id)
				 .then(res => {
					 console.log(res);
					 axios.get(apiurl+'kumaran/view-forum-list/')
						  .then(resp => {
							  this.forum_array=JSON.parse(JSON.stringify(resp.data));
							  this.sort();
						  });
				 });
		},
		
		approve_forum(id)	{
			var tkn = getCookie('token');
			axios.patch(apiurl+"kumaran/set-forum-approval/"+id+"/approve", {headers: {'Authorization':`Token ${tkn}`} })
			     .then(res => {
					 console.log(res);
					 axios.get(apiurl+'kumaran/view-forum-list/')
						  .then(resp => {
							  this.forum_array=JSON.parse(JSON.stringify(resp.data));
							  this.sort();
						  });
				 });
		},
		
		delete_message(mid, fid)	{
			axios.delete(apiurl+'kumaran/delete-forum-message/'+mid)
				 .then(res => {
					 console.log(res);
					 axios.get(apiurl+'kumaran/view-forum-id/'+fid)
						  .then(resp => {
							  this.forum_message=JSON.parse(JSON.stringify(resp.data));
						  });
				 });
		},
		
		open_admin_forum() {
			$('#div-1').addClass('display-close').removeClass('display-open');
			$('#div-3').addClass('display-open').removeClass('display-close');
		},
		
		create_admin_forum() {
			this.loader=true;
			const formData1 = new FormData();
			formData1.append('topic', this.title);
			formData1.append('image', this.img);
			formData1.append('forum_ctg', this.ctg);
			formData1.append('creator', this.author);
			
			axios.post(apiurl+'kumaran/create-forum/', formData1,
			{headers:{
				'Content-Type': 'multipart/form-data'
			}})
			     .then(res => {
					 this.pop_notification=res.data;
					 axios.get(apiurl+'kumaran/view-forum-list/')
							.then(resp => {
								this.forum_array=JSON.parse(JSON.stringify(resp.data));
								this.sort();
							});	
					  this.loader=false;
					  $('.hover_bkgr_fricc').show();
				 })
				 .catch(e => {
					 this.pop_notification = "some authorisation error probably... try again or contact customer support"
					 this.loader=false;
					 $('.hover_bkgr_fricc').show();
				 });
		},
		
		update_admin_forum() {
			this.loader=true;
			const formData1 = new FormData();
			if(this.title!=this.tempobj.topic)  formData1.append('topic', this.title);
			if(this.img!=this.tempobj.image)  formData1.append('image', this.img);
			if(this.ctg!=this.tempobj.forum_ctg)  formData1.append('forum_ctg', this.ctg);
			if(this.author!=this.tempobj.creator)  formData1.append('creator', this.author);
			
			axios.post(apiurl+'kumaran/update-forum/'+this.tempobj.ID, formData1,
			{headers:{
				'Content-Type': 'multipart/form-data'
			}})
			     .then(res => {
					 this.pop_notification=res.data;
					 axios.get(apiurl+'kumaran/view-forum-list/')
							.then(resp => {
								this.forum_array=JSON.parse(JSON.stringify(resp.data));
								this.sort();
							});	
					  this.loader=false;
					  $('.hover_bkgr_fricc').show();
				 })
				 .catch(e => {
					 this.pop_notification = "some authorisation error probably... try again or contact customer support"
					 this.loader=false;
					 $('.hover_bkgr_fricc').show();
				 });
		},
		
		open_category() {
			$('#div-3').addClass('display-close').removeClass('display-open');
			$('#div-5').addClass('display-close').removeClass('display-open');
			$('#div-4').addClass('display-open').removeClass('display-close');
		},
		
		close_category()  {
			this.add_ctg="";
			$('#div-4').addClass('display-close').removeClass('display-open');
			if(!this.isdiv)	$('#div-3').addClass('display-open').removeClass('display-close');
			else $('#div-5').addClass('display-open').removeClass('display-close');
		},
		
		create_category()	{
			const formData1 = new FormData();
			formData1.append('ctg_name', this.add_ctg);
			
			axios.post(apiurl+'kumaran/create-forum-ctg/', formData1,
			{headers:{
				'Content-Type': 'multipart/form-data'
			}})
			     .then(res => {
					 this.add_ctg="";
					 this.pop_notification=res.data;
					 $('.hover_bkgr_fricc').show();
						axios.get(apiurl+'kumaran/view-forum-ctg/')
							.then(resp => {
								this.forum_ctg=JSON.parse(JSON.stringify(resp.data));
							});
				 })
				 .catch(e => {
					 this.pop_notification = "some authorisation error probably... try again or contact customer support"
					 $('.hover_bkgr_fricc').show();
				 });
		},
		
		delete_category(name)	{
			axios.delete(apiurl+'kumaran/delete-forum-ctg/'+name)
				 .then(res => {
					 console.log(res);
					 axios.get(apiurl+'kumaran/view-forum-ctg/')
						  .then(resp => {
							  this.forum_ctg=JSON.parse(JSON.stringify(resp.data));
						  });
				 });
		},
		
		notificationclose() {
			console.log("popupclick");
			$('.hover_bkgr_fricc').hide();
		}
	},
	
	mounted (){ 
		this.apiurl = apiurl;
		this.loader=true;
		
		axios.all([axios.get(apiurl+'kumaran/view-forum-list/'), axios.get(apiurl+'kumaran/view-forum-id/1'),axios.get(apiurl+'kumaran/view-forum-ctg/')])
			 .then(axios.spread((a,b, c) => {
				 this.forum_array=JSON.parse(JSON.stringify(a.data));
				 this.forum_message=JSON.parse(JSON.stringify(b.data));
				 this.forum_ctg=JSON.parse(JSON.stringify(c.data));
				 this.sort();
				 this.loader=false;
			 } ));
	},	

});
