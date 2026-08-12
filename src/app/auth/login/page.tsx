import { AuthPage } from '../page' // or move component into app/(auth)/login/

export default function LoginPage() {
  return <AuthPage initialMode="login" />
}