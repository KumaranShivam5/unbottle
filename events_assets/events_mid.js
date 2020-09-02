var apiurl = 'https://ushasi.pythonanywhere.com/';

Vue.component ( 'eventcard', {
	template: `<div class="h-card">
                    <img :src="data_apiurl+scard.event_image" alt="" class="card-img">
                    <div class="card-details">
                        <span class="card-title">{{scard.event_name}}</span>

                       <div class="detail-text-wrap">
                            <span class="detail-title">Date:</span><span class="detail-text">{{scard.date_of_event}}</span>
                        </div>
                        <div class="detail-text-wrap">
                            <span class="detail-title">Time:</span><span class="detail-text">{{scard.time_of_event}}</span>
                        </div>
                        <div class="detail-text-wrap">
                            <span class="detail-title">Contact:</span><span class="detail-text">{{scard.contact}}</span>
                        </div>
                        <div class="detail-text-wrap">
                            <span class="detail-title">venue:</span><span class="detail-text">{{scard.venue}}</span>
                        </div>
						<div class="detail-text-wrap">
							{{scard.event_desc}}
                        </div>
                        <div class="contact-btn"><a :href="scard.link" class="detail-text">More details</a></div>
                    </div>
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
		
	},
	
	mounted (){ 
		axios.get(apiurl+'kumaran/view-all-events/')
			 .then(res => {
				 this.event_array=JSON.parse(JSON.stringify(res.data));
				 this.sort();
			 });
	},	

});
