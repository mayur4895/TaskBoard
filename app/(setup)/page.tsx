 
 import { db } from '@/lib/db';
import { auth, currentUser, redirectToSignIn, redirectToSignUp } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
 
 
  
 

const Setuppage = async() => {
  
  const userId  =   auth();
 if(!userId) return redirectToSignUp(); 
 
 return redirect('/dashboard'); 
}

export default Setuppage