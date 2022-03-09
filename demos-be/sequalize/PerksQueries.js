
export const initPerksTable = (tableModel) => {
	tableModel.sync({ force: true })
	.then (() => {
		tableModel.bulkCreate([
			{
				icon: 'https://thehub.io/_nuxt/bec446a5c33936e90547b6ba6c9ef570.svg',
				title: 'Flexible working hours',
				description: 'Time is precious. Make it count. Morning person or night owl, this job is for you.'
			},
			{
				icon: 'https://thehub.io/_nuxt/6f5fe8db6f61813af564007deb147626.svg',
				title: 'Near public transit',
				description: 'Easy access and treehugger friendly workplace.'
			},
			{
				icon: 'https://thehub.io/_nuxt/761d69be94ae7a8006767510822bb942.svg',
				title: 'Social gatherings',
				description: 'Social gatherings and games; hang out with your colleagues.'
			},
			{
				icon: 'https://thehub.io/_nuxt/55ca4dc2b1ae73eb9af4124219e22c21.svg',
				title: 'Wellness',
				description: 'Strengthen your body with office yoga and handstands or leave your body in good hands by our masseuse..'
			},
			{
				icon: 'https://thehub.io/_nuxt/90fbd70d11fbf84dbc8e0eefbe1e570f.svg',
				title: 'Central office',
				description: 'Your local office is your anchor point, thus, we placed it centrally at your convenience.'
			},
			{
				icon: 'https://thehub.io/_nuxt/4d2bdf82f953e54160aaf86ca0b6bd5e.svg',
				title: 'Paid holiday',
				description: 'Metropolitists, beach boys and mountaineers we salute you and pay you to go and explore the world.'
			}, 
			{
				icon: 'https://thehub.io/_nuxt/3aea45781626c6659fea2257b36d58da.svg',
				title: 'Free coffee / tea',
				description: 'Get your caffeine fix to get you started and keep you going.'
			},
			{
				icon: 'https://thehub.io/_nuxt/73edf9197188b70ee4ca971b07a6b688.svg',
				title: 'New tech gear',
				description: 'Are you a true Tech Savvy? Macbook, trackpad, you name it, we get you covered.'
			}
		])
	})  
}

export const getPerksList = async (tableModel) => {
	let result = await tableModel.findAll()
	if (result === null)  
	{
		console.log("Failed to get perksList!!")
		result = {'status': 'false'}
	}

    return result 
}