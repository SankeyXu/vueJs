window.onload = function(){
	
	function ajaxT(options){
		var type1 = options.type;
		var url1 = options.url;
		var dataType1 = options.dataType;
		var data1 = options.data;
		var success1 = options.success;
		var oAjax = new XMLHttpRequest();
		oAjax.open(type1,url1);
		oAjax.send(null);
		oAjax.onreadystatechange = function () {
	            if (oAjax.readyState == 4) {
	                var status = oAjax.status;
	                if (status >= 200 && status < 300) {
	                	if(dataType1 == "text"){
	                		success1(oAjax.responseText);
	                	}else if(dataType1 == "json"){
		                	var jsonTXT = JSON.parse(oAjax.responseText);
							success1(jsonTXT)
	                	}
	                } 
	            }
	       	}
	}
	var vum = new Vue({
		el:"#app",
		data:{//数据
			sortparam:"",
			book:{
				id:0,
				author:"",
				name:"",
				price:""
			},
			books:""
		},
		computed:{//绑定计算
			sum:function(){
				var result = 0;
				for(var i=0;i<this.books.length;i++){
					result += Number(this.books[i].price);
				};
				return result;
			}
		},
		methods:{//监听方法
			showData:function(){
				ajaxT({
					type:"get",
					url:"table.json",
					dataType:"json",
					success:function(data){
						vum.books = data;
					}
				})
			},
		    addBook:function(){
				this.book.id = this.books.length+1;
				this.books.push(this.book);
				this.book="";
			},
			delBook:function(book){
				this.books.$remove(book);
			},
			sortBy:function(sortparam){
				this.sortparam = sortparam;
			}
		}
	})
	vum.showData();
}
