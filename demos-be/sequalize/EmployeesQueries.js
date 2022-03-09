import { getHashToken, getHashPassword } from '../utils/utils.js'

export const initEmployeesTable = (tableModel) => {
	tableModel.sync({ force: true })
	.then (() => {
		tableModel.bulkCreate([
			{
				name: 'Becki', 
				fullName: 'Becki Wordsworth',
				avatar: 'https://thehub-io.imgix.net/files/s3/20200706131517-6a78f73f0f529c6ad2809f481bfdf8fb.jpg?fit=crop&amp;w=300&amp;h=300&amp;q=60',
				title: 'DEVELOPMENT TEAM LEAD',
				source: 'https://thehub-io.imgix.net/files/s3/20200706131517-6a78f73f0f529c6ad2809f481bfdf8fb.jpg',
			},
			{
				name: 'Jonas', 
				fullName: 'Jonas Deibe',
				avatar: 'https://thehub-io.imgix.net/files/s3/20200706131053-64e4a2d3b45ff27ad2dbab0282a150d3.jpg?fit=crop&w=300&h=300&q=60',
				title: 'FOUNDER, CTO',
				source: 'https://thehub-io.imgix.net/files/s3/20200706131053-64e4a2d3b45ff27ad2dbab0282a150d3.jpg',
			},
			{
				name: 'Andreas', 
				fullName: 'Andreas Rådlund',
				avatar: 'https://thehub-io.imgix.net/files/s3/20200706131224-c9d5b5e4c0d9246e9f37089f0ff6abb1.jpg?fit=crop&w=300&h=300&q=60',
				title: 'FOUNDER, COO',
				source: 'https://thehub-io.imgix.net/files/s3/20200706131224-c9d5b5e4c0d9246e9f37089f0ff6abb1.jpg',
			},
			{
				name: 'Fanny',
				fullName: 'Fanny Jonsson',
				avatar: 'https://thehub-io.imgix.net/files/s3/20210416154728-6361f318f34b904e64468c7e0354789f.jpg?fit=crop&w=300&h=300&q=60',
				title: 'DEVELOPMENT TEAM LEAD',
				source: 'https://thehub-io.imgix.net/files/s3/20210416154728-6361f318f34b904e64468c7e0354789f.jpg',
			},
			{
				name: 'Rami',
				fullName: 'Rami Talib',
				avatar: 'https://thehub-io.imgix.net/files/s3/20210915065947-3b792fe6abc2cce4937bb1a2383ab912.jpeg?fit=crop&w=300&h=300&q=60',
				title: 'CUSTOMER SUCCESS MANAGER',
				source: 'https://thehub-io.imgix.net/files/s3/20210915065947-3b792fe6abc2cce4937bb1a2383ab912.jpeg',
			},
			{
				name: 'Joel',
				fullName: 'Joel Molin',
				avatar: 'https://thehub-io.imgix.net/files/s3/20210915070531-664c71e6f67a24c104127c3c4dce5f8f.jpeg?fit=crop&w=300&h=300&q=60',
				title: 'CUSTOMER SUCCESS MANAGER',
				source: 'https://thehub-io.imgix.net/files/s3/20210915070531-664c71e6f67a24c104127c3c4dce5f8f.jpeg',
			},
			{
				name: 'Carro',
				fullName: 'Carolina Saavedra',
				avatar: 'https://thehub-io.imgix.net/files/s3/20211220140331-43e16f5cca9390578a7652853dcaf94b.jpeg?fit=crop&w=300&h=300&q=60',
				title: 'SOFTWARE DEVELOPER',
				source: 'https://thehub-io.imgix.net/files/s3/20211220140331-43e16f5cca9390578a7652853dcaf94b.jpeg',
			},
			{
				name: 'Viktor',
				fullName: 'Viktor Söderström',
				avatar: 'https://thehub-io.imgix.net/files/s3/20211220140430-f25a9cde34464f971bdeb20df8826275.jpeg?fit=crop&w=300&h=300&q=60',
				title: 'SOFTWARE DEVELOPER',
				source: 'https://thehub-io.imgix.net/files/s3/20211220140430-f25a9cde34464f971bdeb20df8826275.jpeg',
			}])

	})  
}

export const getEmployeesList = async (tableModel) => {
	let result = await tableModel.findAll()
	if (result === null)  
	{
		console.log("Failed to get perksList!!")
		result = {'status': 'false'}
	}

    return result 
}