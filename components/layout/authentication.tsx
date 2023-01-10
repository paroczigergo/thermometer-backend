import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode } from "react"
import { Loading } from "../icons/loading";




export const AuthenticationLayout = ({ children }: { children: ReactNode }) => {
    const router = useRouter()
    const { status } = useSession();

    if (checkIfPublic(router.pathname)) {
        return <>{children}</>
    }

    switch (status) {
        case 'authenticated':
            return <>{children}</>
        case 'unauthenticated':
            return <h1 className="text-2xl">Login to see the chart</h1>
        default:
            return <Loading />
    }



}


const publicPages = [
    '/testing'
]

const checkIfPublic = (path: string) => {
    return publicPages.includes(path)
}