var labelType, useGradients, nativeTextSupport, animate;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport 
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();
function init(candidato1,candidato2,candidato3,candidato4,candidato5,candidato6) {
    var jsonpie = {
      'id': 'root',
      'name': '',
      'data': {
          '$type': 'none'
      },
      'children':[
        {
            'id':'Candidato1',
            'name': '',
            'data': {
                '$angularWidth': candidato1,
                '$color': '#F5C410'
            },
            'children': []
        },
        {
            'id':'Candidato2',
            'name': '',
            'data': {
                '$angularWidth': candidato2,
                '$color': '#2170D2'
            },
            'children': []
        },
        {
            'id':'Candidato3',
            'name': '',
            'data': {
                '$angularWidth': candidato3,
                '$color': '#FD7E14'
            },
            'children': []
        },
        {
            'id':'Candidato4',
            'name': '',
            'data': {
                '$angularWidth': candidato4,
                '$color': '#28883D'
            },
            'children': []
        },
        {
            'id':'Candidato5',
            'name': '',
            'data': {
                '$angularWidth': candidato5,
                '$color': '#4CB8ED'
            },
            'children': []
        },
        {
            'id':'Candidato6',
            'name': '',
            'data': {
                '$angularWidth': candidato6,
                '$color': '#FFFFFF'
            },
            'children': []
        }
      ]
    };
    if(document.getElementById('infovis1')==null){
		var infovis = document.getElementById('infovis');
		var w = infovis.offsetWidth, h = infovis.offsetHeight;
		
		//create some containers for the visualizations
		var container = document.createElement('div');
		container.id = "infovis1";
		var style = container.style;
		style.left = "0px";
		style.top = "0px";
		style.width = Math.floor(w / 2) + "px";
		style.height = Math.floor(h / 2) + "px";
		style.position = 'absolute';
		infovis.appendChild(container);
	}
    //init nodetypes
    //Here we implement custom node rendering types for the RGraph
    //Using this feature requires some javascript and canvas experience.
    $jit.RGraph.Plot.NodeTypes.implement({
        //This node type is used for plotting the upper-left pie chart
        'nodepie': {
          'render': function(node, canvas) {
            var span = node.angleSpan, begin = span.begin, end = span.end;
            var polarNode = node.pos.getp(true);
            var polar = new $jit.Polar(polarNode.rho, begin);
            var p1coord = polar.getc(true);
            polar.theta = end;
            var p2coord = polar.getc(true);

            var ctx = canvas.getCtx();
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(p1coord.x, p1coord.y);
            ctx.moveTo(0, 0);
            ctx.lineTo(p2coord.x, p2coord.y);
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, polarNode.rho, begin, end, false);
            ctx.fill();
          }
        },
    });
    //end
    
    //init rgraph
    //This RGraph is used to plot the upper-left pie chart.
    //It has custom *pie-chart-nodes*.
    var rgraph = new $jit.RGraph({
        injectInto: 'infovis1',
        width: w/2,
        height: h/2,
        //Add node/edge styles and set
        //overridable=true if you want your
        //styles to be individually overriden
        Node: {
            'overridable': true,
             'type': 'nodepie'
        },
        Edge: {
            'overridable': true
        },
        //Parent-children distance
        levelDistance: 80,
        
        //Add styles to node labels on label creation
        onCreateLabel: function(domElement, node){
            domElement.innerHTML = node.name;
            if(node.data.$angularWidth) 
                domElement.innerHTML += " " + node.data.$angularWidth + "%";
            var style = domElement.style;
            style.fontSize = "0.8em";
            style.color = "#fff";
        },
        //Add some offset to the labels when placed.
        onPlaceLabel: function(domElement, node){
            var style = domElement.style;
            var left = parseInt(style.left);
            var w = domElement.offsetWidth;
            style.left = (left - w / 2) + 'px';
        }
    });
    //load graph.
    rgraph.loadJSON(jsonpie);
    rgraph.refresh();
}
