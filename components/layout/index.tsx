import { ReactNode } from "react";
import { Navbar } from "../navigation/navbar";


export const Layout = ({ children }: { children: ReactNode; }) => {

    return <div className="w-full">
        <div className="h-[10vh]">
        <Navbar/>
        </div>
        <main className="w-full h-[90vh] flex justify-center items-center">
            {children}
        </main>
    </div>
}