import React, { useContext, useEffect } from 'react';
import { UserContext } from '@/context/UserContext';
import { useRouter } from 'next/router';


function ProtectRoute({ children, to = "/" }) {
    const router = useRouter()
    const { user: { userInfo } } = useContext(UserContext);

    const rediredtUser = () => {
        if (userInfo?.name) router.push(to)
    }

    useEffect(() => {
        rediredtUser()
    }, [])


    // if (!userInfo?.name)
    return (
        <>
            {children}
        </>
    )
}
export default ProtectRoute;