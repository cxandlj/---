//流程图插件  开发者  陈鑫  2017.1.7
;(function($){	
  var MyFlow=function(ele, opt) {
	  $myFlow=this;
	  this.$element = ele;
	  this.defaults = {
		  width: '1500',
		  height: '1000',
		  showTop:'true',
		  showInfo:'false',		  
		  topBtns:["start","action","condition","end"]
		};
	  this.options = $.extend({}, this.defaults, opt);
	  this.$topDiv=null;
	  this.$centerDiv=null;	
	}
	  var idIndex=0;//存放ID索引  
	  var topstarthtml="<div id='top_flow_start' class='aa start'></div>";
	  var topendhtml="<div id='top_flow_end' class='aa end'></div>";
	  var topactionhtml="<div id='top_flow_action' class='aa action'><div class='txt'>活动</div></div>";
	  var topconditionhtml="<div id='top_flow_condition' class='aa condition'><div class='txt'>条件</div></div>";
	  var centerstarthtml="<div class='node startModel'></div>";
	  var centerendhtml="<div class='node endModel'></div>";
	  var centeractionhtml="<div class='node actionModel'><div class='txt'>新建活动</div></div>";
	  var centerconditionhtml="<div class='node conditionModel'><div class='txt'>新建条件</div></div>";
	  
	  
	
			//基本连接线样式
		var connectorPaintStyle = {
		  strokeStyle: "#1e8151",
		  fillStyle: "transparent",
		  radius: 5,
		  lineWidth: 2
		};
		// 鼠标悬浮在连接线上的样式
		var connectorHoverStyle = {
		  lineWidth: 2,
		  strokeStyle: "#216477",
		  outlineWidth: 2,
		  outlineColor: "white"
		};
		var endpointHoverStyle = {
		  fillStyle: "#216477",
		  strokeStyle: "#216477"
		};
		
		var activeClass={
			fillStyle: "#216477",
			strokeStyle: "#216477"
		}
		//空心圆端点样式设置
		var hollowCircle = {
		  DragOptions: { cursor: 'pointer', zIndex: 2000 },
		  endpoint: ["Dot", { radius: 7 }], //端点的形状
		  connectorStyle: connectorPaintStyle,//连接线的颜色，大小样式
		  connectorHoverStyle: connectorHoverStyle,
		  endpointHoverStyle:endpointHoverStyle,
		  paintStyle: {
			strokeStyle: "#1e8151",
			fillStyle: "transparent",
			radius: 5,
			lineWidth: 2
		  },    //端点的颜色样式
		  //anchor: "AutoDefault",
		  isSource: true,  //是否可以拖动（作为连线起点）
		  connector: ["Straight", { stub: [0, 0], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }], //连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
		  isTarget: true,  //是否可以放置（连线终点）
		  maxConnections: -1,  // 设置连接点最多可以连接几条线
		  connectorOverlays: [["Arrow", { width: 10, length: 10, location: 1 }]]
		};	
		
		//矩形
		var Rectangle = {
		  DragOptions: { cursor: 'pointer', zIndex: 2000 },
		  endpoint: ["Dot", { radius: 5 }], //端点的形状
		  //endpoint: ["Rectangle", { width:8,height:8 }], //端点的形状
		  //endpoint: ["Blank",{radius: 2}],
		  connectorStyle: connectorPaintStyle,//连接线的颜色，大小样式
		  connectorHoverStyle: connectorHoverStyle,
		  //endpointHoverStyle:endpointHoverStyle,
		  paintStyle: {
			fillStyle: "transparent",
			lineWidth: 2
		  },    //端点的颜色样式
		  //anchor: "AutoDefault",
		  isSource: true,  //是否可以拖动（作为连线起点）
		  connector: ["Flowchart", { stub: [0, 0], gap: 0, cornerRadius: 0, alwaysRespectStubs: true }], //连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
		  isTarget: true,  //是否可以放置（连线终点）
		  maxConnections: -1,  // 设置连接点最多可以连接几条线
		  connectorOverlays: [["Arrow", { width: 10, length: 10, location: 1 }]]
		  //dropOptions:{
			  //activeClass:activeClass
		  //}
		};	

		//矩形
		var Rectangle2 = {
		  DragOptions: { cursor: 'pointer', zIndex: 2000 },
		  endpoint: ["Rectangle", { width:8,height:8 }], //端点的形状
		  //endpoint: ["Blank",{radius: 2}],
		  connectorStyle: connectorPaintStyle,//连接线的颜色，大小样式
		  connectorHoverStyle: connectorHoverStyle,
		  endpointHoverStyle:endpointHoverStyle,
		  paintStyle: {
			fillStyle: "blue",
			lineWidth: 2
		  },    //端点的颜色样式
		  //anchor: "AutoDefault",
		  isSource: true,  //是否可以拖动（作为连线起点）
		  connector: ["Flowchart", { stub: [0, 0], gap: 0, cornerRadius: 0, alwaysRespectStubs: true }], //连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
		  isTarget: true,  //是否可以放置（连线终点）
		  maxConnections: -1,  // 设置连接点最多可以连接几条线
		  connectorOverlays: [["Arrow", { width: 10, length: 10, location: 1 }]]
		};	
		
		//矩形
		var Blank = {
		  DragOptions: { cursor: 'pointer', zIndex: 2000 },
		  endpoint: ["Blank", {  }], //端点的形状
		  //endpoint: ["Blank",{radius: 2}],
		  connectorStyle: connectorPaintStyle,//连接线的颜色，大小样式
		  connectorHoverStyle: connectorHoverStyle,
		  paintStyle: {
			fillStyle: "blue",
			lineWidth: 2
		  },    //端点的颜色样式
		  //anchor: "AutoDefault",
		  isSource: true,  //是否可以拖动（作为连线起点）
		  connector: ["Flowchart", { stub: [0, 0], gap: 0, cornerRadius: 0, alwaysRespectStubs: true }], //连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
		  isTarget: true,  //是否可以放置（连线终点）
		  maxConnections: -1,  // 设置连接点最多可以连接几条线
		  connectorOverlays: [["Arrow", { width: 10, length: 10, location: 1 }]]
		};	
	 
		  var $myFlow;
		  var $curModel=null;//当前选中对象
		  var $curLine=null;
		  
		  var choosePointColor="blue";//选中对象的endpoint填充色
		  var unChoosePointColor="transparent"//未选中对象的endpoint填充色

	//定义Beautifier的方法
	MyFlow.prototype = {
	  init: function() {
		  this.$element.css({width:this.options.width,height:this.options.height});
		  this.$element.addClass("mainJsPlumbCX");
		  if(this.options.showTop){
			  this.$topDiv=$("<div class='topDiv'></div>");			  
			  this.$element.append(this.$topDiv);
			  
			  var tmp="";
				for(var x=this.options.topBtns.length-1;x>=0;x--){
					tmp+=eval("top"+this.options.topBtns[x]+"html");
				}
				this.$topDiv.append(tmp);
		  }
		  
		  $(".aa").draggable({
				opacity: 0.7, 
				helper:"clone",
                iframeFix: true ,
				scope:"toptocenter"
			});
			
			
		  
		  this.$centerDiv=$("<div id='centerDiv' class='centerDiv' style='width:"+(this.options.width-10)+";height:"+(this.options.height-110)+"px;'></div>");
		  
		  this.$element.append(this.$centerDiv);
		
		this.$centerDiv.droppable({
				scope:"toptocenter",
				drop:function(event,ui){	
					$myFlow.createModel(ui,$(this));					
				}
			});
	
			this.$centerDiv.click(function(){		
				//$myFlow.delEndpoint();//删除endpoint
				if($curModel!=null){
					$myFlow.hideEndpoint($curModel.attr("id"));
					$curModel=null;
				}			
				if($curLine!=null){
				   $curLine.setPaintStyle({ 
						strokeStyle: unChooseLineColor
					});
					$curLine=null;
				}				
			});
		return this;
	  },
	  createModel:function(ui,target){
	    var topId = $(ui.draggable).attr("id");
		var html="";
		idIndex++;
		var id=topId+idIndex;
		var canEdit=false;//是否可以双击编辑文字
		switch(topId){
			case "top_flow_start":
				html=centerstarthtml;
			break;
			case "top_flow_end":
				html=centerendhtml;
			break;
			case "top_flow_action":
				html=centeractionhtml;
				canEdit=true;
			break;
			case "top_flow_condition":
				html=centerconditionhtml;
				canEdit=true;
			break;
		}
		var item=$(html);
		item.attr("id",id);
		item.css("top",ui.offset.top);
		item.css("left",ui.offset.left);
		target.append(item);
		if(canEdit){
			 $(item).dblclick(function () {
				 var $children=$(this).find("div");
				 var text = $children.text();
				 var $input=$("<input type='text' style='width:95px;text-align:center;font:14px \"微软雅黑\";' value='" + text + "' />");
				 $children.html("");
                 $children.append($input);
				 $input.select();
                 $input.blur(function () {
					$children.html($(this).val());
                  });
              });
		}
		$myFlow.addEndpoint(id);
		item.draggable({
			opacity: 0.7, 
			iframeFix: true ,
			containment: "parent", //只能在父容器中拖动
			start: function () {		
				$myFlow.showEndpoint($(this).attr("id"));
		  },
		  drag: function (event, ui) {
			jsPlumb.repaintEverything();
		  },
		  stop: function () {
			jsPlumb.repaintEverything();
		  }
		});
	
		item.click(function(event){			
			event.stopPropagation();//阻止本事件冒泡
			$myFlow.showEndpoint($(item).attr("id"));
		});
		
	  },
	  addEndpoint:function(modelId){	
		jsPlumb.addEndpoint(modelId, { anchors: "RightMiddle" }, Rectangle);
		jsPlumb.addEndpoint(modelId, { anchors: "TopCenter" }, Rectangle);
		jsPlumb.addEndpoint(modelId, { anchors: "LeftMiddle" }, Rectangle);
		jsPlumb.addEndpoint(modelId, { anchors: "BottomCenter" }, Rectangle);	
		$myFlow.showEndpoint(modelId);
	  },
	  //显示endpoint
	  showEndpoint:function(modelId){	
		if($curLine!=null){
		   $curLine.setPaintStyle({ 
				strokeStyle: unChooseLineColor
			});
			$curLine=null;
	    }
		if($curModel!=null){
			$myFlow.hideEndpoint($curModel.attr("id"));
		}
		$curModel=$("#"+modelId);
	  
		var points = jsPlumb.getEndpoints(modelId);
		for(var i=0;i<points.length;i++){
			//var html=points[i].endpoint.svg.innerHTML;
			//points[i].endpoint.svg.innerHTML=html.replace(unChoosePointColor,choosePointColor);
			$(points[i].endpoint.svg.childNodes[0]).attr("fill",choosePointColor);
		};
	  },
	  //隐藏endpoint 
	  hideEndpoint:function(modelId){
		var points = jsPlumb.getEndpoints(modelId);
		for(var i=0;i<points.length;i++){
			//var html=points[i].endpoint.svg.innerHTML;
			//points[i].endpoint.svg.innerHTML=html.replace(choosePointColor,unChoosePointColor);
			$(points[i].endpoint.svg.childNodes[0]).attr("fill",unChoosePointColor);
		};
	  },
	  getData:function() {
            var connects = [];
            $.each(jsPlumb.getAllConnections(), function (idx, connection) {
                connects.push({
                    ConnectionId: connection.id,
                    PageSourceId: connection.sourceId,
                    PageTargetId: connection.targetId,
                    SourceText: connection.source.innerText,
                    TargetText: connection.target.innerText,
                });
            });
            var blocks = [];
            $("#centerDiv .node").each(function (idx, elem) {
                var $elem = $(elem);
                blocks.push({
                    BlockId: $elem.attr('id'),
                    BlockContent: $elem.html(),
                    BlockX: parseInt($elem.css("left"), 10),
                    BlockY: parseInt($elem.css("top"), 10)
                });
            });

            var serliza = JSON.stringify(connects) + "&" + JSON.stringify(blocks);
            return serliza;
        }
	}
  
  
 
 function getRightInnerHTML(elm){
        var content = elm.innerHTML;
        if(!document.all) return content;
        var regOne = /(\s+\w+)\s*=\s*([^<>"\s]+)(?=[^<>]*\/>)/ig;
        var regTwo = /"'([^'"]*)'"/ig; 
        content = content.replace(regOne,'$1="$2"').replace(regTwo,'\"$1\"'); 
        var okText = content.replace(/<(\/?)(\w+)([^>]*)>/g,function(match,$1,$2,$3){
            if($1){
                return "</"+ $2.toLowerCase() +">";       
            }       
            return ("<"+ $2.toLowerCase() +$3+">").replace(/=(("[^"]*?")|('[^']*?')|([\w\-\.]+))([\s>])/g,function(match2,$1,$2,$3,$4,$5,position,all){
                if($4){return '="'+ $4 +'"'+ $5;}
                return match2;
           });
        });
        return okText.replace(/<\/?([^>]+)>/g,function(lele){return lele;});
    }
  
  $(document).keydown(function (event) {
    if(event.keyCode==46){//按删除键删除对象
		if($curModel!=null){
			jsPlumb.removeAllEndpoints($curModel.attr("id"))
			jsPlumb.detachAllConnections($curModel.attr("id"))
			$curModel.remove();
			$curModel=null;
		}
		
		if($curLine!=null){
			jsPlumb.detach($curLine); 
			$curLine=null;
		}
	}
  });
  
  var chooseLineColor="red";
  var unChooseLineColor="#1e8151";
  // Select/Deselect each connection on click
	jsPlumb.bind('click', function (connection, e) {
	   e.preventDefault();
	   if($curLine!=null){
		   $curLine.setPaintStyle({ 
				strokeStyle: unChooseLineColor
			});
	   }
	   if($curModel!=null){
		   myFlow.hideEndpoint($curModel.attr("id"));
		   $curModel=null;
	   }
	   connection.setPaintStyle({ 
		  strokeStyle: chooseLineColor
	   });
	   $curLine=connection;
	});	
	
	
	 $(document).bind("selectstart",function(){return false;});  //禁止文本选中
	
	 var myFlow;
	
  $.fn.jsPlumbCX = function(options) {  
	//创建myFlow的实体
	  myFlow = new MyFlow(this, options);
	  //调用其方法
	  return myFlow.init();  
  }
})(jQuery);