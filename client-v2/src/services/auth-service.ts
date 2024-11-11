export const loginUser = async (credentials: any) => {
    try {
        const res = await fetch('http://localhost:3003/' + 'api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
            credentials: 'include', // To include cookies in the request
        });

        if (!res.ok) {
            return {
                isSuccess: false,
                data: null
            }
        }

        const data = await res.json();
        return {
            isSuccess: true,
            data: data
        };
    } catch (error) {
        console.error('Error during login:', error);
        return {
            isSuccess: false,
            data: null
        }
    }
};

export const logoutUser = async () => {
    try {
        const res = await fetch('http://localhost:3003/api/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (res.ok) {
            return {
                isSuccess: true
            }
        } else {
            return {
                isSuccess: false
            }
        }
    } catch (error) {
        return {
            isSuccess: false
        }
    }
};