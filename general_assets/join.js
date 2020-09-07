var apiurl = 'https://ushasi.pythonanywhere.com/';


var join_disp =new Vue ({
	el:'#join-us-mid-end',
	
	data: {
		name:"",
		age:"",
		profession:"",
		email_id:"",
		contact_no:"",
		other_comments:"",
		how_long:"",
		work_capacity:"",
		pop_notification:"",
	},
	
	methods: {
		post_query() {
			
			//this.loader=true;
			const formData1 = new FormData();
			formData1.append('name', this.name);
			formData1.append('age', this.age);
			formData1.append('profession', this.profession);
			formData1.append('email_id', this.email_id);
			formData1.append('contact_no', this.contact_no);
			formData1.append('other_comments', this.other_comments);
			formData1.append('how_long', this.how_long);
			formData1.append('work_capacity', this.work_capacity);
			
			axios.post(apiurl+'kumaran/create-join-request-admin/', formData1,
			{headers:{
				'Content-Type': 'multipart/form-data'
			}})
			     .then(res => {
					 this.pop_notification=res.data;
					console.log(res.data);
					  //this.loader=false;
					  $('#join-us-popup').hide();
					  $('#some-message').show();
				 })
				 .catch(e => {
					this.pop_notification = "some authorisation error probably... try again or contact customer support"
					// this.loader=false;
					 $('#join-us-popup').hide();
					 $('#some-message').show();
				 });
		},
		
		close_message() {
			$('#join-us-popup').show();
			$('#some-message').hide();
		},
		
		close_popup()	{
			$('#join-us-popup').fadeOut();
			this.name="";
			this.age="";
			this.profession="";
			this.email_id="";
			this.contact_no="";
			this.other_comments="";
			this.how_long="";
			this.work_capacity="";
			this.pop_notification="";
		},
		
		reset_button() {
			this.name="";
			this.age="";
			this.profession="";
			this.email_id="";
			this.contact_no="";
			this.other_comments="";
			this.how_long="";
			this.work_capacity="";
			this.pop_notification="";
		},
		
	},
	
	mounted (){ 

	},	

});
