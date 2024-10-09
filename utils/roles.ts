import { Roles } from '../types/globals'
import { useSession } from  "@clerk/clerk-expo";


export const checkRole =async (role: Roles) => {
    const { session } = await useSession();
    const userRole = session?.user?.publicMetadata?.role;
  
    return userRole === role;
  };