import { SignOut } from "@phosphor-icons/react/dist/ssr";
import { logoutAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <Button type="submit" variant="ghost">
        <SignOut size={16} weight="bold" />
        Sign out
      </Button>
    </form>
  );
}
