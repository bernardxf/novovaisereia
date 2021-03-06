(function(){var e,t;e=function(){function e(e){var t,n;this.options={target:"instafeed",get:"popular",resolution:"thumbnail",sortBy:"most-recent",links:!0,limit:15,mock:!1};if(typeof e=="object")for(t in e)n=e[t],this.options[t]=n;this.unique=this._genKey()}return e.prototype.run=function(){var t,n,r;if(typeof this.options.clientId!="string"&&typeof this.options.accessToken!="string")throw new Error("Missing clientId or accessToken.");if(typeof this.options.accessToken!="string"&&typeof this.options.clientId!="string")throw new Error("Missing clientId or accessToken.");return this.options.before!=null&&typeof this.options.before=="function"&&this.options.before.call(this),typeof document!="undefined"&&document!==null&&(r=document.createElement("script"),r.id="instafeed-fetcher",r.src=this._buildUrl(),t=document.getElementsByTagName("head"),t[0].appendChild(r),n="instafeedCache"+this.unique,window[n]=new e(this.options),window[n].unique=this.unique),!0},e.prototype.parse=function(e){var t,n,r,i,s,o,u,a,f,l,c,h,p,d,v;if(typeof e!="object"){if(this.options.error!=null&&typeof this.options.error=="function")return this.options.error.call(this,"Invalid JSON data"),!1;throw new Error("Invalid JSON response")}if(e.meta.code!==200){if(this.options.error!=null&&typeof this.options.error=="function")return this.options.error.call(this,e.meta.error_message),!1;throw new Error("Error from Instagram: "+e.meta.error_message)}if(e.data.length===0){if(this.options.error!=null&&typeof this.options.error=="function")return this.options.error.call(this,"No images were returned from Instagram"),!1;throw new Error("No images were returned from Instagram")}this.options.success!=null&&typeof this.options.success=="function"&&this.options.success.call(this,e);if(this.options.sortBy!=="most-recent"){this.options.sortBy==="random"?c=["","random"]:c=this.options.sortBy.split("-"),l=c[0]==="least"?!0:!1;switch(c[1]){case"random":e.data.sort(function(){return.5-Math.random()});break;case"recent":e.data=this._sortBy(e.data,"created_time",l);break;case"liked":e.data=this._sortBy(e.data,"likes.count",l);break;case"commented":e.data=this._sortBy(e.data,"comments.count",l);break;default:throw new Error("Invalid option for sortBy: '"+this.options.sortBy+"'.")}}if(typeof document!="undefined"&&document!==null&&this.options.mock===!1){document.getElementById(this.options.target).innerHTML="",u=e.data,u.length>this.options.limit&&(u=u.slice(0,this.options.limit+1||9e9));if(this.options.template!=null&&typeof this.options.template=="string"){i="",o="";for(h=0,d=u.length;h<d;h++)s=u[h],o=this._makeTemplate(this.options.template,{model:s,id:s.id,link:s.link,image:s.images[this.options.resolution].url,caption:this._getObjectProperty(s,"caption.text"),likes:s.likes.count,comments:s.comments.count,location:this._getObjectProperty(s,"location.name")}),i+=o;document.getElementById(this.options.target).innerHTML=i}else{n=document.createDocumentFragment();for(p=0,v=u.length;p<v;p++)s=u[p],a=document.createElement("img"),a.src=s.images[this.options.resolution].url,this.options.links===!0?(t=document.createElement("a"),t.href=s.link,t.appendChild(a),n.appendChild(t)):n.appendChild(a);document.getElementById(this.options.target).appendChild(n)}r=document.getElementsByTagName("head")[0],r.removeChild(document.getElementById("instafeed-fetcher")),f="instafeedCache"+this.unique,delete window[f]}return this.options.after!=null&&typeof this.options.after=="function"&&this.options.after.call(this),!0},e.prototype._buildUrl=function(){var e,t,n;e="https://api.instagram.com/v1";switch(this.options.get){case"popular":t="media/popular";break;case"tagged":if(typeof this.options.tagName!="string")throw new Error("No tag name specified. Use the 'tagName' option.");t="tags/"+this.options.tagName+"/media/recent";break;case"location":if(typeof this.options.locationId!="number")throw new Error("No location specified. Use the 'locationId' option.");t="locations/"+this.options.locationId+"/media/recent";break;case"user":if(typeof this.options.userId!="number")throw new Error("No user specified. Use the 'userId' option.");if(typeof this.options.accessToken!="string")throw new Error("No access token. Use the 'accessToken' option.");t="users/"+this.options.userId+"/media/recent";break;default:throw new Error("Invalid option for get: '"+this.options.get+"'.")}return n=""+e+"/"+t,this.options.accessToken!=null?n+="?access_token="+this.options.accessToken:n+="?client_id="+this.options.clientId,n+="&count="+this.options.limit,n+="&callback=instafeedCache"+this.unique+".parse",n},e.prototype._genKey=function(){var e;return e=function(){return((1+Math.random())*65536|0).toString(16).substring(1)},""+e()+e()+e()+e()},e.prototype._makeTemplate=function(e,t){var n,r,i,s,o;r=/(?:\{{2})([\w\[\]\.]+)(?:\}{2})/,n=e;while(r.test(n))i=n.match(r)[1],s=(o=this._getObjectProperty(t,i))!=null?o:"",n=n.replace(r,""+s);return n},e.prototype._getObjectProperty=function(e,t){var n,r;t=t.replace(/\[(\w+)\]/g,".$1"),r=t.split(".");while(r.length){n=r.shift();if(!(e!=null&&n in e))return null;e=e[n]}return e},e.prototype._sortBy=function(e,t,n){var r;return r=function(e,r){var i,s;return i=this._getObjectProperty(e,t),s=this._getObjectProperty(r,t),n?i>s?1:-1:i<s?1:-1},e.sort(r.bind(this)),e},e}(),t=typeof exports!="undefined"&&exports!==null?exports:window,t.Instafeed=e}).call(this);

(function () {

	var init = function () {
		feed.run();
		videos();
		enviaForm();
		scrollMenu();

		$('.content-competicao').slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			infinite: false,
			arrows: false,
			responsive: [
				{
					breakpoint: 992,
					settings: { slidesToShow: 2 }
				},
				{
					breakpoint: 768,
					settings: { slidesToShow: 1 }
				}
			]
		});

		$('#competicao .btnPrev').on('click', function(){
			$('.content-competicao').slick('slickPrev');
		});

		$('#competicao .btnNext').on('click', function(){
			$('.content-competicao').slick('slickNext');
		});

		$('.content-slide').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: true,
			arrows: false,
			autoplay: true,
  			autoplaySpeed: 4000
		});

		// MENU MOBILE
		$('#menu-mobile').on('click', function(){
			if ($('#menu').hasClass('ativo')){
				$(this).removeClass('ativo')
				$('#menu').removeClass('ativo')
			} else {
				$(this).addClass('ativo')
				$('#menu').addClass('ativo')
			}
		});

	};

	// INSTAGRAM
	var feed = new Instafeed({
		get: 'user',
		userId: 31555977,
		resolution: 'standard_resolution',
		clientId: 'd5240c897f774a12b171275bb6c66b4e',
		accessToken: '31555977.1677ed0.53b9acc89cb8452ebe0d5fff0f8d2d2e',
		limit: 10,
		template: '<a href="{{link}}" target="_blank" class="insta-photo" title="{{caption}}"><img src="{{image}}" alt="{{caption}}" /><div class="info"><span>&hearts; {{likes}} ✏ {{comments}}</span></div></a>'
	});

	// YOUTUBE
	var videos = function () {
		$.ajax({
			type: "GET",
			// url: "https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyBMlhB8C6gohtTX6s-FU1a8ePEXAVVcadg&part=snippet&maxResults=6&playlistId=PLg1mgM4-CUvHYUrq_nkaZ9lVDKYaj01KU",
			url: "https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyBMlhB8C6gohtTX6s-FU1a8ePEXAVVcadg&part=snippet&maxResults=2&playlistId=PLg1mgM4-CUvHYUrq_nkaZ9lVDKYaj01KU",
			success: function (response) {
				for(var key in response.items) {
					$('#youtube .row.videos').append('<div class="col-md-6"><iframe src="https://www.youtube.com/embed/' + response.items[key].snippet.resourceId.videoId + '?rel=0" frameborder="0" allowfullscreen></iframe><h3>' + response.items[key].snippet.title + '</h3></div>')
				}
			}
		});
	};

	var enviaForm = function(){

		$('#enviar').on("click", function(){

			var nome  = $('#nome').val();
			var email = $('#email').val();
			var assunto = $('#assunto').val();
			var msg   = $('#msg').val();

			/* Validando */
			if(nome.length <= 3){
				alert('Informe seu nome');
				return false;
			}
			if(email.length <= 5){
				alert('Informe seu e-mail');
				return false;
			}
			if(assunto.length <= 5){
				alert('Informe o assunto');
				return false;
			}
			if(msg.length <= 5){
				alert('Escreva uma mensagem');
				return false;
			}

			var urlData = "&nome=" + nome +
			"&email=" + email +
			"&assunto=" + assunto +
			"&msg=" + msg ;

			$.ajax({
				type: "POST",
				url: "../php/sendmail.php",
				async: true,
				data: urlData,
				success: function(data) {
					$('#retornoHTML').html(data);
				}
			});

		});

	};

	var scrollMenu = function(){

		$("#menu a").on('click', function(e) {

			var id = $(this).attr('href');

			var $id = $(id);
			if ($id.length === 0) {
				return;
			}

			e.preventDefault();

			var pos = $id.offset().top;

			$('body, html').animate({scrollTop: pos}, 500);
		});

	};

	$(document).ready(init);
})();


















