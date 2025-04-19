
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/nextauth";
import Image from 'next/image';
// import Signin from './SignInPage';
import LogOut from '../_components/Authentications/logOut';

import ProfileComponent from "../_components/Authentications/ProfileComponent"; 
import Clinetcomponent from "../_components/Authentications/Clinetcomponent"; 

const profile = async () => {
    const session = await getServerSession(authOptions);

    return (
        <>
        <ProfileComponent />
        <Clinetcomponent/>
        </>
    );
};

export default profile;
