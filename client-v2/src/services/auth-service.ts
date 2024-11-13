import {resObject} from "@/lib/helpers";

export const loginUser = async (credentials: any) => {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL_SERVER + 'api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
            credentials: 'include', // To include cookies in the request
        });

        if (!res.ok) {
            return resObject(false);
        }

        const data = await res.json();
        return resObject(true, data);
    } catch (error) {
        console.error('Error during login:', error);
        return resObject(false);
    }
};

export const logoutUser = async () => {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL_SERVER + 'api/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (res.ok) {
            return resObject(true)
        } else {
            return resObject(false)
        }
    } catch (error) {
        return resObject(false)
    }
};