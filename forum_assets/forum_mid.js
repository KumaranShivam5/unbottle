var apiurl='https://ushasi.pythonanywhere.com/';

Vue.component ( 'forumcard', {
	template: `<div class=card>
                        <img class="card-image" :src="this.data_apiurl+scard.image">
                        <div class="card-content">
                            <span class="card-title">
								{{scard.topic}}
                            </span>
                            <div class="card-subtext">
                                <span class="msg-writer">Anonymus</span>
                                <span class="card-message">this is the placeholder that contains most recent message in this thread</span>
                            </div>
                            <div class="card-details">
                                <div class="card-detail-item">
                                    <span class="card-detail-head">Created BY - </span><span class="card-detail-text">{{scard.creator}}</span>
                                </div>
                                <div class="card-detail-item">
                                    <span class="card-detail-head">Date - </span><span class="card-detail-text">{{scard.date}}</span>
                                </div>

                            </div>
                            <div class="open-btn" v-on:click="$emit('read', scard.ID)">read</div>
                        </div>
                    </div>`,
	data: function () {
		return {
		data_apiurl:apiurl
		}
	},
	props:["scard"]
});

var forum_disp =new Vue ({
	el:'#forum-mid-end',
	
	data: {
		forum_array:[],
		ctg_array:[],
		namestore:null,
		topic:"",
		img:"",
		ctg:"",
		creator:"",
		pop_notification:"",
		notf_show:false,
	},
	
	methods: {
		get_right_stuff() {
			var temp=[];
			var j=0;
			for(i=0 ; i<this.forum_array.length ; ++i)	{
				if(this.forum_array[i].is_approved == true) 
					temp[j++]= this.forum_array[i];
			}
			this.forum_array= temp;
		},
		
		searchstuff(id) {
			const url="forum_view.html?id="+id;
			window.location.href=url;
		},
		
		forum_by_category(field) {
			const url="forum.html?name="+field;
			window.location.href=url;
		},
		
		forum_all()	{
			const url="forum.html";
			window.location.href=url;
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
		
		new_forum() {
			const formData1 = new FormData();
			formData1.append('topic', this.topic);
			formData1.append('image', this.img);
			formData1.append('forum_ctg', this.ctg);
			formData1.append('creator', this.creator);
			
			axios.post(apiurl+'kumaran/create-forum/', formData1,
			{headers:{
				'Content-Type': 'multipart/form-data'
			}})
			     .then(res => {
					 axios.get('https://script.google.com/macros/s/AKfycbxeNRyxUJhr4B_P6Uj9xCfZLXoYjdcqKHJJuxesj19p-NEFOmtB/exec?name='+this.creator+'&title='+this.topic)
					 this.pop_notification=res.data;
					 this.notf_show=true;
				 })
				 .catch(e => {
					 this.pop_notification = "some authorisation error probably... try again or contact customer support";
					 this.notf_show=true;
				 });
		},
		
		reset_data() {
			this.topic="";
			this.img="";
			this.ctg="";
			this.creator="";
		},
		
		close_button() {
			$('#create-forum-popup').fadeOut();
			this.topic="";
			this.img="";
			this.ctg="";
			this.creator="";
		},
		
	},
	
	mounted (){ 
		this.queryString = window.location.search;
		this.urlParams = new URLSearchParams(this.queryString);
		this.namestore= this.urlParams.get("name");
		
		if (this.namestore == null)	{
	
			axios.all([axios.get(apiurl+'kumaran/view-forum-list/'),
					axios.get(apiurl+'kumaran/view-forum-ctg/')])
				.then(axios.spread ( (a,b)=> {
					this.forum_array=JSON.parse(JSON.stringify(a.data));
					this.ctg_array=JSON.parse(JSON.stringify(b.data));
				 //this.get_right_stuff();
				} ));
		}
		
		else {
			axios.all([axios.get(apiurl+'kumaran/view-forum-list-by-ctg/'+this.namestore),
					axios.get(apiurl+'kumaran/view-forum-ctg/')])
				.then(axios.spread ( (a,b)=> {
					this.forum_array=JSON.parse(JSON.stringify(a.data));
					this.ctg_array=JSON.parse(JSON.stringify(b.data));
				 //this.get_right_stuff();
				} ));
		}
	},	

});
