type NotFoundPath = '/:pathMatch(.*)*' | '/not-found';
type NotFoundNameAndRedirect = '/not-found';
type AuthPath = '/auth/sign-in' | '/auth/sign-up' | '/auth/find-me' | '/auth/me';

type Path =
  | '/'
  | AuthPath
  | NotFoundPath
  | '/qna'
  | '/post'
  | '/resting'
  | '/search'
  | '/detail'
  | '/category/:name'
  | '/map';

type name =
  | 'Home'
  | 'Sign in'
  | 'Sign up'
  | 'Find Id'
  | 'My Page'
  | ':name'
  | 'Q & A'
  | 'Post'
  | 'Resting'
  | 'Search'
  | 'Detail'
  | 'Map'
  | NotFoundNameAndRedirect;

export type Routes =
  | {
      path: Path;
      name?: name;
      component?: any;
      redirect?: NotFoundNameAndRedirect;
    }[];
