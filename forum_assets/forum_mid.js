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
                                    <span class="card-detail-head">Created BY - </span><span class="card-detail-text">J Solomon Ivan</span>
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
