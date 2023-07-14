const socketClient = io()

const form = document.getElementById("form");
const products = document.getElementById("products");


form.addEventListener("submit", (evt) => {
	evt.preventDefault();
	const title = evt.target.elements.title.value;
	const description = evt.target.elements.description.value;
	const code = evt.target.elements.code.value;
	const price = evt.target.elements.price.value;
	const stock = evt.target.elements.stock.value;
	const category = evt.target.elements.category.value;
	const thumbnails = evt.target.elements.thumbnails.value;
	const product = {
		title: title,
		description: description,
		code: code,
		price: price,
		status: "true",
		stock: stock,
		category: category,
		thumbnails: thumbnails,
	};

	socketClient.emit("item", product);
	form.reset();
});

socketClient.on("itemShow", (data) => {
	products.innerHTML = "";
	data.forEach((product) => {
		const elements = document.createElement("div");
		elements.id = product.id;
		elements.innerHTML = `
		<li>
            <ul>
                <li>Id: ${product.id}</li>
                <li>Producto: ${product.title} </li>
                <li>Descripcion: ${product.description}</li>
                <li>Codigo: ${product.code}</li>
                <li>Precio: ${product.price}</li>
                <li>Estado: ${product.status}</li>
                <li>Stock: ${product.stock}</li>
                <li>Categoria: ${product.category}</li>
            </ul>
        </li>
		<br>
		`;
		products.appendChild(elements);
	});
});