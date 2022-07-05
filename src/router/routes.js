
const routes = [
  // Rotas publicas
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', name: 'loginDefault', component: () => import('pages/Login.vue') },
      { path: 'login', name: 'login', component: () => import('pages/Login.vue') },
      { path: 'registrar', name: 'registrar', component: () => import('pages/Registrar.vue') },
      { path: 'confirmacao-email', name: 'ConfirmacaoEmail', component: () => import('pages/ConfirmacaoEmail.vue') },
      { path: 'esqueceu-senha', name: 'EsqueceuSenha', component: () => import('pages/EsqueceuSenha.vue') },
      { path: 'nova-senha', name: 'NovaSenha', component: () => import('pages/NovaSenha.vue') }
    ]
  },
  // Rotas de produto publico
  {
    path: '/',
    component: () => import('layouts/PublicLayout.vue'),
    children: [
      { path: 'produto-publico/:id', name: 'produto-publico', component: () => import('pages/produto/ListPublic.vue') }
    ]
  },
  // Rotas que necessitam de autenticação
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'me', name: 'me', component: () => import('pages/IndexPage.vue') },
      { path: 'categoria', name: 'categoria', component: () => import('pages/categoria/List.vue') },
      { path: 'form-categoria/:id?', name: 'form-categoria', component: () => import('pages/categoria/Form.vue') },
      { path: 'produto', name: 'produto', component: () => import('pages/produto/List.vue') },
      { path: 'form-produto/:id?', name: 'form-produto', component: () => import('pages/produto/Form.vue') },
      { path: 'form-config/:id?', name: 'form-config', component: () => import('pages/configuracao/Form.vue') }
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
