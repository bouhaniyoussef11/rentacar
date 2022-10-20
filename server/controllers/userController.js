import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    console.log(password)
    const user = await User.findOne({ email })
    if (user && (await user.comparePasswords(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(401).json({
        message: 'Invalid email or password!',
      })
    }
  } catch (error) {
    res.status(500)
    throw new Error('Server error')
  }
}

const getUserById = async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
}

export { loginUser, getUserById }