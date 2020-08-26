Vue.component ( 'forumcard', {
	template: `<div class='f-msg-card'>
                        <div class='f-msg-header'>
                            <span class="f-msg-name">{{scard.creator}}</span>
                            <span class='f-msg-date'>{{scard.date_msg}}</span>
                        </div>
                        <div class="f-msg-content">
						{{scard.message}}
                        </div>
                </div>`,
	props:["scard"]
});

var apiurl='https://ushasi.pythonanywhere.com/';


var forum_disp =new Vue ({
	el:'#forum-mid-end',
	
	data: {
		forum_array:[],
		ctg_array:[],
		queryString:"",
		urlParams:"",
		idstore:0,
		reply_name:"",
		reply_content:"",
		apiurl:"",
	},
	
	methods: {

		searchstuff(id) {
			const url="forum_view.html?id="+id;
			window.location.href=url;
		},
		
		setcolor() {
			l=this.forum_array[1].length;
			console.log(l);
			for(i=0 ; i<l ; i++)	{
				if(i%2==0) $('.f-msg-card').eq(i).addClass('f-msg-card-c1').removeClass('f-msg-card-c2');
				else $('.f-msg-card').eq(i).addClass('f-msg-card-c2').removeClass('f-msg-card-c1');
			}
		},
		
		forum_by_category(field) {
			const url="forum.html?name="+field;
			window.location.href=url;
		},
		
		forum_all()	{
			const url="forum.html";
			window.location.href=url;
		},
		
		submit_reply() {
			if(this.reply_name=="")	this.reply_name = "Anonymous";
			if(this.reply_content=="")	return "";
			
			const formData1 = new FormData();
			
			formData1.append('topic_id', this.idstore);
			formData1.append('creator', this.reply_name);
			formData1.append('message', this.reply_content);
			
			axios.post(apiurl+'kumaran/create-forum-message/', formData1,
			{headers:{
				'Content-Type': 'multipart/form-data'
			}})
				 .then( res =>{ 
					console.log(res);
					axios.get(apiurl+'kumaran/view-forum-id/'+this.idstore)
						 .then(resp => {this.forum_array=JSON.parse(JSON.stringify(resp.data));
								this.reply_name="";
								this.reply_content="";
								 });
					
				 } );
		},
		
	},
	
	mounted (){ 
		this.apiurl=apiurl;
		this.queryString = window.location.search;
		this.urlParams = new URLSearchParams(this.queryString);
		this.idstore= this.urlParams.get("id");

		axios.all([axios.get(apiurl+'kumaran/view-forum-id/'+this.idstore),
			       axios.get(apiurl+'kumaran/view-forum-ctg/')])
			 .then(axios.spread ( (a,b)=> {
				 this.forum_array=JSON.parse(JSON.stringify(a.data));
				 this.ctg_array=JSON.parse(JSON.stringify(b.data));
				 this.setcolor();
			 } )); 
	},	
	
	updated() {
		this.setcolor();
	},

});
