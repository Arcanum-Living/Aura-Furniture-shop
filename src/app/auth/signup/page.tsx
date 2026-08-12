import { AuthPage } from '../page' // or move component into app/(auth)/signup/

export default function SignupPage() {
  return <AuthPage initialMode="signup" />
}