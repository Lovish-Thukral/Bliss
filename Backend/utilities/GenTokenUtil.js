import jwt from 'jsonwebtoken';

const CreateToken = async (data, res) => {
    const Token = jwt.sign(data, process.env.SECRET_KEY, {
        expiresIn: '10d'
    })
    res.cookie("loginauth", Token, {
        maxAge: 864000000,
    }
    )
}
export default CreateToken;