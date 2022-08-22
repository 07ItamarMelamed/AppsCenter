
export const servDeleteApp = async (id) => {
	try {
		const response = await fetch(
			`http://localhost:3000/api/application/${id}`, 
			{
				method: 'DELETE',
				headers: {'Content-Type': 'application/json'}
			}
		);
		await response.json();
	} catch (e) {
		console.log(`Error. ${e.message}`);
	}
}

export const servAddApp = async (app) => {
    try {
		const response = await fetch(
			`http://localhost:3000/api/application`, 
			{
				method: 'POST',
				body: JSON.stringify(
					{
						imageUrl: app.imageUrl,
						name: app.name,
						price: app.price,
                        desc: app.desc,
                        companyName: app.companyName
					}
				),
				headers: {'Content-Type': 'application/json'}
			}
		);
		await response.json();
	} catch (e) {
		console.log(`Error. ${e.message}`);
	}
}

export const servLoadApps = async () => {
	try {
		const response = await fetch(
			`http://localhost:3000/api/applications`, 
			{
				method: 'GET'
			}
		);
		return await response.json();
	} catch (e) {
		console.log(`Error. ${e.message}`);
	}
}

export const servLoadSpecificApp = async (id) => {
	try {
		const response = await fetch(
			`http://localhost:3000/api/application/${id}`, 
			{
				method: 'GET'
			}
		);
		return await response.json();
	} catch (e) {
		console.log(`Error. ${e.message}`);
	}
}

export const servUpdateApp = async (id, app) => {
    try {
		const response = await fetch(
			`http://localhost:3000/api/application/${id}`, 
			{
				method: 'PUT',
				body: JSON.stringify(
					{
						imageUrl: app.imageUrl,
						name: app.name,
						price: app.price,
                        desc: app.desc,
                        companyName: app.companyName,
                        createdAt: app.createdAt
					}
				),
				headers: {'Content-Type': 'application/json'}
			}
		);
		await response.json();
	} catch (e) {
		console.log(`Error. ${e.message}`);
	}
}