import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

export function withPublic<T>(WrappedComponent: React.ComponentType<T>) {
  return function WithPublic(props: T) {
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    if (loading) return <h1>Loading...</h1>;
    if (user) {
      router.replace('/');
      return <h1>Loading...</h1>;
    }

    return <WrappedComponent auth={auth} {...props} />;
  };
}

export function withProtected<T>(WrappedComponent: React.ComponentType<T>) {
  return function WithProtected(props: T) {
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    if (loading) return <h1>Loading...</h1>;
    if (!user) {
      router.replace('/login');
      return <h1>Loading...</h1>;
    }

    return <WrappedComponent auth={auth} {...props} />;
  };
}
