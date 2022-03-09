import { getHashToken, getHashPassword } from '../utils/utils.js'

export const initAuthTable = (tableModel) => {
	tableModel.sync({ force: true })
	.then (() => {
		tableModel.bulkCreate([
			{
				username: 'valtech',
				password: '15896988b29e879054102a5ea2ddbff99023fb2a', //
				authToken: '',
				authStatus: 'false',
				isAdmin: 'false'
			},
			{
				username: 'hiotlabs',
				password: '191b8cc5d16c8d1a7bee537265c43797e11859c9', //
				authToken: '',
				authStatus: 'false',
				isAdmin: 'false'
			},
			{
				username: 'qvik',
				password: '3ddae04aa56dd3b8b0ce57bdb53801f50987330e', //
				authToken: '',
				authStatus: 'false',
				isAdmin: 'false'
			},						

		])
	})  
}

export const authenticate = async (tableModel, data) => {
	const hashPassword = getHashPassword(data.password)
	let result = await tableModel.findOne({ 
		where: { username: data.username, password: hashPassword , active: 'true'},
		attributes: ['id', 'username', 'authToken', 'authStatus', 'isAdmin']
	})
	if (result !== null)  
	{
		result.authToken = getHashToken(result.username)
		result.authStatus = 'true'
		//lets assume all accounts isAdmin accounts for now....
		result.isAdmin = 'true'
    	console.log("Auth ok!!")
		result.update()

		// update user account with a authToken
		// authToken is required for every new user session APi call and checked if it exists 
		// and if timeStamp is older than X minutes. Which would require a new login.
		result.save()
	}
	else {
		console.log("Auth Failed!!")
		result = {'authStatus': 'false'}
	}
    return result 
}