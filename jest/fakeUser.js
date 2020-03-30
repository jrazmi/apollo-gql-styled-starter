import faker from "faker";


faker.seed(1779);

export const fakeUser = () => ({
    __typename: "User",
    id: faker.random.uuid(),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
})