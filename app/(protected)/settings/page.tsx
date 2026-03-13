import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import LogoutButton from "@/components/auth/logout-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const SettingPage = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
      <Card className="w-full max-w-md shadow-2xl border-none bg-white/80 dark:bg-black/80 backdrop-blur-xl">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-3xl font-bold tracking-tight">Settings</CardTitle>
          <CardDescription>Manage your account preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border/50 transition-all hover:bg-secondary">
              <p className="text-sm font-medium">ID</p>
              <p className="text-xs font-mono truncate max-w-[180px] text-muted-foreground">
                {user?.id}
              </p>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border/50 transition-all hover:bg-secondary">
              <p className="text-sm font-medium">Name</p>
              <p className="text-xs font-mono text-muted-foreground">{user?.name}</p>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border/50 transition-all hover:bg-secondary">
              <p className="text-sm font-medium">Email</p>
              <p className="text-xs font-mono text-muted-foreground">{user?.email}</p>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border/50 transition-all hover:bg-secondary">
              <p className="text-sm font-medium">Role</p>
              <Badge variant={user?.role === "ADMIN" ? "destructive" : "secondary"}>
                {user?.role}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border/50 transition-all hover:bg-secondary">
              <p className="text-sm font-medium">2FA Status</p>
              <Badge variant={user?.isTwoFactorEnabled ? "success" : "outline"}>
                {user?.isTwoFactorEnabled ? "ON" : "OFF"}
              </Badge>
            </div>
          </div>
          
          <div className="pt-2">
            <LogoutButton>
              <Button variant="destructive" className="w-full font-semibold">
                Sign Out
              </Button>
            </LogoutButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingPage;
