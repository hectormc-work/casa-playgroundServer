import bcrypt from "bcryptjs";

type User = {
    username: string;
    password: string;
}

const users: User[] = [
    { username: 'demo', password: bcrypt.hashSync('password', 10) }
];

class UserCollection {
    static async findOneByUsernameAndPassword(username: string, password: string) {
        return users.find(u => (u.username === username) && (bcrypt.compareSync(password, u.password)))
    }

    static async findOneByUsername(username: string) {
        return users.find(u => u.username === username)
    }
}

export default UserCollection;
