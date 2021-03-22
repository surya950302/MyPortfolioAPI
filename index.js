const defaultData ={ links: [
    { "id":"1", "name": "Resume", "url": "https://drive.google.com/file/d/1xJRSzU2RPnfmfZN9-JkhGmRgaZZzhK1P/view?usp=sharing" },
    { "id":"2", "name": "Masters Transcript", "url": "https://drive.google.com/file/d/16_-iwvWk29S82Q4_-YFhEVFIGS0-LLGO/view?usp=sharing" },
    { "id":"3", "name": "Certificates", "url": "https://drive.google.com/file/d/1_wdlvZgaP4MvRNe9oa26twYgTGmLHwgI/view?usp=sharing" }
  ]}

const social=[
	{ "id":"1", "name": "LinkedIn", "url": "https://www.linkedin.com/in/suryanarayan-sudersanam/", "svg": "https://svgshare.com/i/QkR.svg"},
	{ "id":"2", "name": "GitHub", "url": "https://github.com/surya950302", "svg":"https://svgshare.com/i/QkE.svg" }
]

const html = links => `
<!Doctype html>
<html>
	<head>
		<meta charset="UTF-8">
    	<meta name="viewport" content="width=device-width,initial-scale=1">
    	<title>Suryanarayan Sudersanam</title>
    	<link href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css" rel="stylesheet"></link>
	</head>
	<body class="bg-blue-100">
    	<div class="w-full h-full flex content-center justify-center mt-8">
      		<div class="bg-white shadow-md rounded px-8 pt-6 py-8 mb-4">
        		<h1 class="block text-grey-800 text-md font-bold mb-2">Links</h1>
        		<div class="mt-4" id="links"></div>
      		</div>
    	</div>
  	</body>
  	<script>
  		window.links = ${links || []}

  		var populateLinks = function(){
  			var linkConatiner = document.querySelector("#links")
  			linkConatiner.innerHTML = null

  			window.links.forEach(link =>{
  				var el =document.createElement("div")
  				el.className = "border-t py-4"
  				el.dataset.link = link.id

  				var name= document.createElement("span")
  				name.innerHTML = link.name+" : "

  				var url= document.createElement("a")
  				url.href = link.url
  				url.innerHTML = link.url

  				el.appendChild(name)
  				el.appendChild(url)

  				linkConatiner.appendChild(el)
  			})

  		}

  		populateLinks()
  	</script>
</html>
`
async function displayJSON(request){
	const json = JSON.stringify(defaultData, null, 2)
	return new Response(json, {
      	headers: {"content-type": "application/json;charset=UTF-8"},
    })
}


async function displayHTML(request){
	
	const body = html(JSON.stringify(defaultData.links || []))
	return new Response(body, {
		headers:{ "content-type":"text/html"},
	})

}

class socialTransformer {
  constructor(data) {
    this.data = data
  }
  
  async element(element) {
    // Your code
    var json= JSON.stringify(this.data)
	var d= JSON.parse(json)
	console.log(d)
	var tags=""
    d.forEach(obj =>{
    	tags=tags+"<a href="+obj.url+"><img src="+obj.svg+" alt= 'Image not found'/></a>"	
    })
    element.setInnerContent(tags,{html:true})
  }
}


class LinksTransformer {
  constructor(data) {
    this.data = data
  }
  
  async element(element) {
    // Your code
    var json= JSON.stringify(this.data)
	var d= JSON.parse(json)
	console.log(d)
	var tags=""
    d.links.forEach(obj =>{
    	tags=tags+"<a href="+obj.url+">"+obj.name+"</a>"	
    })
    element.setInnerContent(tags,{html:true})
  }
}

class ElementHandler {
  element(element) {
    // An incoming element, such as `div`
    if(element.tagName === "div"){
    	if(element.hasAttribute("style")){
    		console.log(`Incoming element: ${element.tagName}`)
    		element.removeAttribute("style")
    	}
    }
    if(element.tagName === "img"){
    	console.log(`Incoming element: ${element.tagName}`)
    	element.setAttribute("src","https://i.ibb.co/JFp3KXv/profile.jpg")  
    	element.setAttribute("alt","Image Not found")
    }
    if(element.tagName === "h1"){
    	console.log(`Incoming element: ${element.tagName}`)
    	element.setInnerContent("surya950302")
    }
    if(element.tagName === "title"){
    	element.setInnerContent("Suryanarayan Sudersanam")
    }
    if(element.tagName === "body"){
    	element.setAttribute("background","https://wallpaperset.com/w/full/8/9/a/37306.jpg")
    }
  }

  comments(comment) {
    // An incoming comment
  }

  text(text) {
    // An incoming piece of text
  }
}

async function requestHandler(request){
	const url= request.url;
	if(url === "https://my-worker.surya950302.workers.dev/static" ){
		//console.log(true)
		return displayHTML(request)
		
	}else if(url === "https://my-worker.surya950302.workers.dev/links"){
		//console.log(false)
		/*const init = {
    	headers: { "content-type": "text/html;charset=UTF-8"},
    	}*/
		const response = await fetch("https://static-links-page.signalnerve.workers.dev")
		return new HTMLRewriter()
			.on("div#profile", new ElementHandler())
			.on("img#avatar", new ElementHandler())
			.on("h1#name", new ElementHandler())
			.on("title", new ElementHandler())
			.on("body", new ElementHandler())
			.on("div#links", new LinksTransformer(defaultData))
			.on("div#social", new ElementHandler())
			.on("div#social", new socialTransformer(social))
			.transform(response)
		//const results = await gatherResponse(response)
		//return new Response(results, init)
		//return displayHTML(request)
	}else{
		return displayJSON(request)
	}
}

addEventListener("fetch", event => {
  event.respondWith(requestHandler(event.request))
  
})

