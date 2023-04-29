import React, { useContext, useEffect } from 'react';
import { UserContext } from '@/context/UserContext';
import { useRouter } from 'next/router';


function PrivateRoute({ children, to = "/" }) {
    const router = useRouter()
    const { user: { userInfo } } = useContext(UserContext);

    const rediredtUser = () => {
        if (!userInfo?.name) router.push("/")
    }
    useEffect(() => {
        rediredtUser()
    }, [])


        return (
            <>
                {children}
            </>
        )

}
export default PrivateRoute;