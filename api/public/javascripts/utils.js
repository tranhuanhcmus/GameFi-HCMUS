function itemListAdapter(data){
	let formatData = []
	for (let i in data) {
        let category = data[i]
        formatData.push(...category)
    }
	return formatData
}