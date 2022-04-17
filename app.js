const http = require("http")
const fs = require("fs")

const host = "localhost"
const port = 8000

const requestListener = function (req, res) {
	// Read the view.html file, store content as variable view
	let view = fs.readFileSync("./view.html", "utf8")
	
	// Read (and parse) the content.json file, store content as variable fileContent
	let fileContent = JSON.parse(fs.readFileSync("./content.json", "utf8"))
	
	let newContent = ""
	for (let dish of fileContent.Dishes) {
		newContent += "<h1>" + dish.Name + "</h1><p>Price in $: " + dish.Price + "</p>"
	}
	
	let markup = view.replace("stringtoreplace", newContent)
	
	// HTTP success status response code
	res.writeHead(200)
	// Pass in markup as the string to send to the client
	res.end(markup)
}

// Create server, run the callback requestListener when a request is made
const server = http.createServer(requestListener)

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`)
})