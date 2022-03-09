
export const initOffertsTable = (tableModel) => {
	tableModel.sync({ force: true })
	.then (() => {
		tableModel.bulkCreate([
			{
				companyName: "valtech",
				userId: 1,
				offert: {
					'email': 'valtech@valtech.se',
					'mobile': '123456',
					'adressA': 'the adress',
					'adressB': 'the other adress',
					'distanceAToB': 11,
					'distanceUnit': 'km',
					'area': 70,
					'garretArea': 10,
					'havePiano': 'yes',
					'packagingHelp': 'yes',
					'price': 25
				}
			},
			{
				companyName: "valtech",
				userId: 1,
				offert: {
					'email': 'valtech@valtech.se',
					'mobile': '123456',
					'adressA': 'the adress2',
					'adressB': 'the other adress2',
					'distanceAToB': 12,
					'distanceUnit': 'km',
					'area': 71,
					'garretArea': 11,
					'havePiano': 'yes',
					'packagingHelp': 'yes',
					'price': 30
				}
			},				
			{
				companyName: "hiotlabs",
				userId: 2,
				offert: {
					'email': 'hiotlabs@hiotlabs.se',
					'mobile': '123456',
					'adressA': 'the adress2',
					'adressB': 'the other adress2',
					'distanceAToB': 12,
					'distanceUnit': 'km',
					'area': 71,
					'garretArea': 11,
					'havePiano': 'yes',
					'packagingHelp': 'yes',
					'price': 30
				}
			},
			{
				companyName: "hiotlabs",
				userId: 2,
				offert: {
					'email': 'hiotlabs@hiotlabs.se',
					'mobile': '123456',
					'adressA': 'the adress2',
					'adressB': 'the other adress2',
					'distanceAToB': 12,
					'distanceUnit': 'km',
					'area': 71,
					'garretArea': 11,
					'havePiano': 'yes',
					'packagingHelp': 'yes',
					'price': 30
				}
			},
			{
				companyName: "qvik",
				userId: 3,
				offert: {
					'email': 'qvik@qvik.se',
					'mobile': '123456',
					'adressA': 'the adress2',
					'adressB': 'the other adress2',
					'distanceAToB': 12,
					'distanceUnit': 'km',
					'area': 71,
					'garretArea': 11,
					'havePiano': 'yes',
					'packagingHelp': 'yes',
					'price': 30
				}
			},
			{
				companyName: "qvik",
				userId: 3,
				offert: {
					'email': 'qvik@qvik.se',
					'mobile': '123456',
					'adressA': 'the adress2',
					'adressB': 'the other adress2',
					'distanceAToB': 12,
					'distanceUnit': 'km',
					'area': 71,
					'garretArea': 11,
					'havePiano': 'yes',
					'packagingHelp': 'yes',
					'price': 30
				}
			},      
			]			
		)
	})  
}

export const getUsersOffertsList = async (tableModel) => {
	let result = await tableModel.findAll()
	if (result === null || result.length == 0)  
	{
		console.log("Failed to get UsersOfferts!!")
		result = {'status': 'false'}
	}

    return result 
}

export const getUserOffertsListByUserId = async (tableModel, data) => {
	let result = await tableModel.findAll({ where: { userId: data.userId } })
	if (result === null || result.length == 0)  
	{
		console.log("Failed to get user X's UserToDos!!")
		result = {'status': 'false'}
	}

    return result 
}

export const addUserOffert = async (tableModel, data) => {	
	const newOffert = await tableModel.create(
		{
			'companyName': data.companyName,
			'userId': data.userId,
			'offert': data.offert
		}
	)
	console.log("newOffert's auto-generated ID:", newOffert.id);
	console.log('newOffert is: ', JSON.stringify(newOffert))
	//send back a new updated list to requester
	let result = await tableModel.findAll({ where: { userId: data.userId } })
	if (result === null || result.length == 0)  
	{
		console.log("Failed to get updated user X's OffertsList!!")
		result = {'status': 'false'}
	}

    return result 
}


