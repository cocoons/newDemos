
export const initUserToDosTable = (tableModel) => {
	tableModel.sync({ force: true })
	.then (() => {
		tableModel.bulkCreate([
				{
					userId: 1,
					name: "myList",
					date: "some date",
					toDo: [{id: 1, desc: "go for a walk1"}, {id: 2, desc: "do something else1"}]
				},
				{
					userId: 1,
					name: "myOtherList",
					date: "some date",
					toDo: [{id: 1, desc: "go for a walk2"}, {id: 2, desc: "do something else2"}]
				},
				{
					userId: 2,
					name: "myList",
					date: "some date",
					toDo: [{id: 1, desc: "go for a walk3"}, {id: 2, desc: "do something else3"}]
				},
				{
					userId: 3,
					name: "myList",
					date: "some date",
					toDo: [{id: 1, desc: "go for a walk4"}, {id: 2, desc: "do something else4"}]
				},
				{
					userId: 4,
					name: "myList",
					date: "some date",
					toDo: [{id: 1, desc: "go for a walk5"}, {id: 2, desc: "do something else5"}]
				},
				{
					userId: 5,
					name: "myList",
					date: "some date",
					toDo: [{id: 1, desc: "go for a walk6"}, {id: 2, desc: "do something else6"}]
				},
				{
					userId: 6,
					name: "myList",
					date: "some date",
					toDo: [{id: 1, desc: "go for a walk7"}, {id: 2, desc: "do something else7"}]
				},  
				{
					userId: 7,
					name: "myList",
					date: "some date",
					toDo: [{id: 1, desc: "go for a walk8"}, {id: 2, desc: "do something else8"}]
				},
				{
					userId: 8,
					name: "myList",
					date: "some date",
					toDo: [{id: 1, desc: "go for a walk9"}, {id: 2, desc: "do something else9"}]
				}        
			]			
		)
	})  
}

export const getUsersToDosList = async (tableModel) => {
	let result = await tableModel.findAll()
	if (result === null || result.length == 0)  
	{
		console.log("Failed to get UserToDos!!")
		result = {'status': 'false'}
	}

    return result 
}

export const getUserToDosListByUserId = async (tableModel, data) => {
	let result = await tableModel.findAll({ where: { userId: data.userId } })
	if (result === null || result.length == 0)  
	{
		console.log("Failed to get user X's UserToDos!!")
		result = {'status': 'false'}
	}

    return result 
}

//simplistic way can be used for both adding to users toDOList or to remove Todos from list since it just overwrites
export const updateUserToDosList = async (tableModel, data) => {
	let result = await tableModel.findOne({ where: {id: data.id}})
	if (result === null)  
	{
		console.log("Failed to get user X's UserToDos!!")
		result = {'status': 'false'}
	}
	else {
		result.toDo = data.toDo
		result.save()	
	}

    return result 
}
