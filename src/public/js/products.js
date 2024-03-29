
const addToCart = async (productId) => {
	try {
		const resp = await fetch(
			`http://localhost:8080/user-cart`,
			{
				method: "get",
			}
		);

		const cartId = await resp.json();
		
		
		if (productId && cartId) {
			const resp = await fetch(
				`http://localhost:8080/api/carts/${cartId}/product/${productId}`,
				{
					method: "POST",
				}
			);
			const result = await resp.json();
			console.log(result)
			
			if (result.status == "success") {
				const payload = await fetch(
					`http://localhost:8080/api/carts/${cartId}`,
					{
						method: "GET",
					}
				);
				const cart = await payload.json();
				console.log(cart.data);
			}
		}
	} catch (error) {
		console.log("Error: ", error.message);
	}
}


const cart = async ()=>{
	try {
		const resp = await fetch(
			`http://localhost:8080/user-cart`,
			{
				method: "GET",
			}
		);

		const cartId = await resp.json();

		const res = 
		(window.location.href = `http://localhost:8080/carts/${cartId}`)
		
		
		

	} catch (error) {
		console.log(error.message)
	}
}
