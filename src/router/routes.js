
const routes = [
  // Rotas publicas
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', name: 'loginDefault', component: () => import('pages/Login.vue') },
      { path: 'login', name: 'login', component: () => import('pages/Login.vue') },
      { path: 'registrar', name: 'registrar', component: () => import('pages/Registrar.vue') },
      { path: 'confirmacao-email', name: 'ConfirmacaoEmail', component: () => import('pages/ConfirmacaoEmail.vue') }
    ]
  },
  // Rotas que necessitam de autenticação
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'me', name: 'me', component: () => import('pages/IndexPage.vue') }
    ],
    meta: {
      requiresAuth: true
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
