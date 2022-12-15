import { L } from "chart.js/dist/chunks/helpers.core";
import { useSession } from "next-auth/react";
import { ReactNode } from "react"
import { Loading } from "../icons/loading";




export const AuthenticationLayout = ({ children }: { children: ReactNode }) => {
    const { status } = useSession();

    switch (status) {
        case 'authenticated':
            return <>{children}</>
        case 'unauthenticated':
            return <h1 className="text-2xl">Login to see the chart</h1>
        default:
            return <Loading />
    }



}