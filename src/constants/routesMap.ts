const Routes = {
  SIGN_IN: {name: 'SignIn', title: 'Sign In'},
  POSTS: {name: 'Posts', title: 'Posts'},
  POST_DETAILS: {name: 'PostDetails', title: 'Detalhes do Post'},
  DASHBOARD: {name: 'Dashboard', title: 'Dashboard'},
  DASHBOARD_EDIT_POST: {name: 'DashboardEditPost', title: 'Editar Post'},
  DASHBOARD_CREATE_POST: {name: 'DashboardCreatePost', title: 'Criar Post'},
  NOT_FOUND: {name: 'NotFound', title: 'Not Found'},
} as const;

export { Routes };
