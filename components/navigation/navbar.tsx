import { signIn, useSession } from "next-auth/react";
import Image from 'next/image'
import { signOut } from "next-auth/react";
import { Button } from "../icons/button";
// import { useRouter } from "next/router";


export const Navbar = () => {

    const { data: session, status } = useSession();


    const login = () => {
        signIn();
    }
    const logout = () => {
        signOut();
    }

    return <div className="flex-1 flex flex-col">
        <nav className="px-4 flex justify-end bg-white h-16">


            {status === 'authenticated' &&
                <ul className="flex items-center">
                    <li className="mr-20">
                        <Button onClick={() => logout()}>Logout</Button>
                    </li>
                </ul>
            }
            {status === 'unauthenticated' &&
                <ul className="flex items-center">
                    <li>
                        <Button onClick={() => login()}>Login</Button>
                    </li>
                </ul>
            }

            <ul className="flex items-center">
                <li>
                    {session?.user?.name && <h1 className="pl-8 lg:pl-0 text-gray-700 mr-5">{session?.user?.name}</h1>}
                </li>
            </ul>

            <ul className="flex items-center">

                <li className="h-10 w-10">
                    {session?.user?.image && <Image
                        className="h-full w-full rounded-full mx-auto"
                        src={session?.user?.image}
                        loading='lazy'
                        width='500'
                        height='500'
                        alt='Google user image' />
                    }
                </li>

            </ul>

        </nav>
    </div>

}