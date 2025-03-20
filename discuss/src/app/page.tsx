import { Button } from "@/components/ui/button";
import { signIn ,signOut} from "@/actions/auth";
import { auth } from "@/auth";
import Profile from "@/components/profile";


export default async function Home() {
  const session =await auth();

  return (

    <div className="flex flex-col items-center gap-2 justify-center h-screen">
      
      <div className="flex ">
          {!session?.user && <form action={signIn} >
                <Button className="cursor-pointer">깃 허브 로그인 !</Button>
              </form>
          }

          {session?.user &&
                  <form action={signOut}>
                      <Button className="cursor-pointer">로그 아웃 !</Button>
                  </form>
          }
       </div>

      <Profile />
    </div>

  );
}
