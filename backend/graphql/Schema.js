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
    response: Response,
    # refreshToken: String.
    id: ID
}

type TokenResponse {
    token: String
    response: Response
}

type convertFormat {
    format: [String],
    response: Response
}

type Query{
    getUser(id: ID): User,
    getFormats(id: ID, format: String): convertFormat
   # getUsers: [User],
}



type Mutation{
    createUser(input: UserInput): Response,
    userLogin(email: String, password: String): LoginResponse,
    tokenRefresh(id: ID): TokenResponse
    
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
