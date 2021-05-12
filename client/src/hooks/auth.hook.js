import {useCallback, useState, useEffect} from 'react';

const storageName = 'userData';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [ready, setReady] = useState(false);
    const [userId, setUserId] = useState(null);

    const login = useCallback((jwt, id) => {
        setToken(jwt);
        setUserId(id);
        if (id && jwt) {
            localStorage.setItem(storageName, JSON.stringify({
                userId: id, token: jwt
            }))
        }
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));
        if (data && data.token) {
            login(data.token, data.userId);
        }
        setReady(true)
    }, [login, token, userId])

    return {login, logout, token, userId,ready};

}