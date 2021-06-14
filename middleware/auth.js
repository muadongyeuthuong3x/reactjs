const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
	const authHeader = req.header('Authorization')
	const token = authHeader && authHeader.split(' ')[1]
   console.log(token)
	if (!token)
		return res
			.status(401)
			.json({ success: false, message: 'Vui lòng đăng nhập' })

	try {
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

		req.userId = decoded.userId
		next()
	} catch (error) {
		console.log(error)
		return res.status(403).json({ success: false, message: 'Invalid token' })
	}
}

module.exports = auth