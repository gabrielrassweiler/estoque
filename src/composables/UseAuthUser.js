import { ref } from 'vue'
import useSupabase from 'boot/supabase'

const user = ref(null)

export default function useAuthUser () {
  const { supabase } = useSupabase()

  const login = async ({ email, password }) => {
    const { user, error } = await supabase.auth.signIn({ email, password })
    if (error) throw error

    return user
  }

  // Caso de implementação com login do facebook, git, entre outros
  const loginWithSocialProvider = async (provider) => {
    const { user, error } = await supabase.auth.signIn({ provider })
    if (error) throw error

    return user
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const verificaLogado = async () => {
    return !!user.value
  }

  const registrar = async ({ email, password, ...data }) => {
    const { user, error } = await supabase.auth.signUp({ email, password }, {
      data, redirectTo: `${window.location.origin}/me?fromEmail=registrationConfirmation`
    })
    if (error) throw error

    return user
  }

  const atualizar = async (data) => {
    const { user, error } = await supabase.auth.update(data)
    if (error) throw error

    return user
  }

  const resetaSenha = async (email) => {
    const { user, error } = await supabase.auth.api.resetPasswordForEmail(email)
    if (error) throw error

    return user
  }

  return {
    user,
    login,
    loginWithSocialProvider,
    logout,
    verificaLogado,
    registrar,
    atualizar,
    resetaSenha
  }
}
