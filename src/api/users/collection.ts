
type User = {
    username: string;
    password: string;
}

const users: User[] = [
    { username: 'demo', password: 'password' }
];

class UserCollection {
    static async findOneByUsernameAndPassword(username: string, password: string) {
        return users.find(u => (u.username === username) && password === u.password)
    }

    static async findOneByUsername(username: string) {
        return users.find(u => u.username === username)
    }
}

export default UserCollection;
