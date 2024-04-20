const formatResponse = (req, res, next) => {
	// Override the send method of the response object
	res.sendResponse = (data, message, status = 200) => {
	  res.status(status).json({ data: data || "", message: message || "" });
	};
	// Move to the next middleware or route handler
	next();
  };
module.exports={
	formatResponse
}