const { buildSchema } = require("graphql");

const schema = buildSchema(`
type User{
    firstName: String,
    lastName: String,
    id: ID,
    email: String,
    phoneNumber: String,
    password: String,
    userActive: Boolean,
    plan: Plans,
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

type Plans {
    name: String,
    price: String,
    id: ID,
    numberOfConverts: String,
    features: [String]
}

type Query{
    getUser(id: ID): User,
    getFormats(id: ID, format: String): convertFormat
    fetchData(id: ID, format: String): convertFormat
   # getUsers: [User],
    getAllPlans: [Plans]
    getUserPlan(id: ID): Plans
    getExpUserPlan: Response
}



type Mutation{
    createUser(input: UserInput): Response,
    createPlan(input: planInput): Response,
    updateUserState(id: ID): Response
    userLogin(email: String, password: String): LoginResponse,
    tokenRefresh(id: ID): TokenResponse,
    updateUserProfile(id: ID, firstName: String, lastName: String, email: String): Response,
    updateUserPassword(id: ID, oldPassword: String, password: String, confirmPassword: String): Response,
    processPayment(id: ID, amount: String, productID: ID, token: String): Response
    paypalPayment(userId: ID, planId: ID):  Response
}


input UserInput{
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    password: String
    timeZone: String,
}

input planInput{
    name: String,
    price: String,
    features: [String],
    numberOfConverts: String,
}
`);

module.exports = schema;
