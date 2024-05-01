const { PageDataService } = require("../utils")

module.exports={
	home: (req,res)=>{
		const pageData=PageDataService.getInitData()
		pageData.title="Home"
		res.render('index',pageData)
	}
}