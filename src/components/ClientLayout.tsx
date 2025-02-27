'use client';

import { useState, useEffect, use } from 'react';
import { supabase } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LayoutDashboard, LogOut, Menu, X, Rocket, Settings, ClipboardList } from 'lucide-react'; // Added ClipboardList icon
import Image from 'next/image';
import Link from 'next/link'; // Added missing import for `Link`

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [clientName, setClientName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordChangeError, setPasswordChangeError] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState('');
  const router = useRouter();

  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(false);
  
  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error || !user) {
          console.error('Error fetching user data:', error);
          router.push('/login');
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError || !profile) {
          console.error('Error fetching profile data:', profileError);
          return;
        }

        const { data: clientData, error: clientError } = await supabase
          .from('clients')
          .select('client_name')
          .eq('id', profile.client_id)
          .single();

        if (clientError || !clientData) {
          console.error('Error fetching client data:', clientError);
          return;
        }

        // Check if onboarding has been completed
        const { data: onboardingData } = await supabase
          .from('client_onboarding')
          .select('*')
          .eq('client_id', profile.client_id)
          .single();

        setHasCompletedOnboarding(!!onboardingData);
        setClientName(clientData.client_name || 'Client');
        setUserEmail(user.email || '');
      } catch (error) {
        console.error('Error during data fetching:', error);
      }
    }

    fetchUserProfile();
  }, [router]);

  if (!clientName) {
    return <div>Loading...</div>;
  }

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error);
    } else {
      router.push('/login');
    }
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      setPasswordChangeError('Please fill in both fields');
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: oldPassword,
    });

    if (signInError) {
      setPasswordChangeError('Old password is incorrect');
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });

    if (updateError) {
      setPasswordChangeError('Error changing password');
    } else {
      setPasswordChangeSuccess('Password changed successfully');
      setOldPassword('');
      setNewPassword('');
      setPasswordChangeError('');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-4 border-b dark:border-gray-700">
          <Link href="/" className="flex items-center">
            <Image src="/images/logo.png" alt="CostPerDemo Logo" width={40} height={40} className="dark:invert" />
            <span className="ml-2 text-xl font-semibold dark:text-white">CostPerDemo</span>
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleSidebar}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link href={`/dashboard/${clientName}`} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <LayoutDashboard className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href={`/dashboard/${clientName}/quick-start`} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <Rocket className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ml-3">Quick Start</span>
              </Link>
            </li>
            {!hasCompletedOnboarding && (
            <li>
              <Link href={`/dashboard/${clientName}/onboarding`} className="flex items-center p-2 bg-blue-50 text-gray-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 group">
                <ClipboardList className="w-5 h-5 text-blue-500 transition duration-75 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-white" />
                <span className="ml-3 font-medium">Complete Onboarding</span>
                {!hasCompletedOnboarding && <span className="ml-2 px-2 py-0.5 text-xs bg-blue-500 text-white rounded-full">New</span>}
              </Link>
            </li>
            )}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between h-16 px-4 border-b bg-white dark:bg-gray-800 dark:border-gray-700">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleSidebar}>
            <Menu className="h-6 w-6" />
          </Button>
          <div className="ml-auto flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" alt="User Avatar" />
                    <AvatarFallback>{clientName?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{clientName}</p>
                    <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsEditProfileOpen(true)}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="p-4">
            <h1>Hello, {clientName}!</h1>
            {children}
          </div>
        </main>
      </div>

      {/* Edit Profile Sheet (Password Change Popup) */}
      <div className={`fixed top-0 right-0 w-1/3 bg-white dark:bg-gray-800 p-4 transition-transform ${isEditProfileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="text-xl font-semibold">Change Password</h3>
          <Button variant="ghost" onClick={() => setIsEditProfileOpen(false)}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="mt-4">
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded mb-2"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded mb-2"
          />
          {passwordChangeError && <p className="text-red-500">{passwordChangeError}</p>}
          {passwordChangeSuccess && <p className="text-green-500">{passwordChangeSuccess}</p>}
        </div>
        <Button onClick={handleChangePassword} className="w-full mt-4">
          Change Password
        </Button>
      </div>
    </div>
  );
}