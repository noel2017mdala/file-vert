const { buildSchema } = require("graphql");

const schema = buildSchema(`
type User{
    firstName: String,
    lastName: String,
    id: ID,
    email: String,
    phoneNumber: String,
    password: String
}

type Response{
    status: Boolean,
    message: String
}

type LoginResponse {
    user: User,
    token: String,
    response: Response
}

type Query{
    getUser(id: ID): User,
    getUsers: [User],
}


type Mutation{
    createUser(input: UserInput): Response,
    userLogin(email: String, password: String): LoginResponse,
}


input UserInput{
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    password: String
}
`);

module.exports = schema;
