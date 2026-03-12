import { useNavigate } from '@tanstack/react-router';
import { useSession, signOut } from '@/src/lib/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const Header = () => {
  const session = useSession();
  const navigate = useNavigate();
  const imgUrl = session.data?.user.image ?? '';

  const logout = async () => {
    await signOut();
    navigate({ to: '/signup' });
  };

  return (
    <>
      <div className="flex flex-row justify-end p-2">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={imgUrl} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-log-out-icon lucide-log-out mr-4 w-8 h-8 cursor-pointer"
            onClick={logout}
          >
            <path d="m16 17 5-5-5-5" />
            <path d="M21 12H9" />
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          </svg>
        </div>
      </div>
    </>
  );
};
