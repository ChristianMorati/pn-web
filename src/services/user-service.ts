import { httpClient } from "./http-client";

class UserService {
    async findUserByPixKey(pixKey: string, type: string) {
        try {
            const token = localStorage.getItem('TOKEN');
            // const userId = localStorage.getItem('@user');
            const res = await httpClient.request(`user/pixKey`, {
                method: 'POST',
                body: JSON.stringify({ pixKey, type }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.name) {
                throw new Error('Failed to load user data');
            }

            return res;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

const userService = new UserService();
export { userService }