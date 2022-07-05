import useSupabase from 'src/boot/supabase'
import useAuthUser from './UseAuthUser'
import { v4 as uuidv4 } from 'uuid'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import UseConfig from 'src/composables/UseConfig'
import { useQuasar } from 'quasar'

const config = ref({
  corPrimaria: '',
  corSecundaria: '',
  telefone: ''
})

export default function useApi () {
  const { supabase } = useSupabase()
  const { user } = useAuthUser()
  const route = useRoute()
  const { setConfig } = UseConfig()
  const $q = useQuasar()

  const listPublic = async (table) => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
    if (error) throw error
    return data
  }

  const list = async (table, userId) => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('user_id', userId)
    if (error) throw error
    return data
  }

  const getById = async (table, id) => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
    if (error) throw error
    return data[0]
  }

  const post = async (table, form) => {
    const { data, error } = await supabase
      .from(table)
      .insert([
        {
          ...form,
          user_id: user.value.id
        }
      ])
    if (error) throw error
    return data
  }

  const update = async (table, form) => {
    const { data, error } = await supabase
      .from(table)
      .update({ ...form })
      .match({ id: form.id })
    if (error) throw error
    return data
  }

  const remove = async (table, id) => {
    const { data, error } = await supabase
      .from(table)
      .delete()
      .match({ id })
    if (error) throw error
    return data
  }

  const uploadImg = async (file, storage) => {
    const fileName = uuidv4()
    const { error } = supabase
      .storage
      .from(storage)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })
    if (error) throw error

    return await getUrlPublic(fileName, storage)
  }

  const getUrlPublic = async (fileName, storage) => {
    const { publicURL, error } = supabase
      .storage
      .from(storage)
      .getPublicUrl(fileName)

    if (error) throw error
    return publicURL
  }

  const getConfig = async () => {
    const id = route.params.id || user?.value?.id
    if (id) {
      $q.loading.show()
      const { data, error } = await supabase
        .from('config')
        .select('*')
        .eq('user_id', id)
      if (error) throw error

      if (data.length) {
        config.value = data[0]
        setConfig(config.value.corPrimaria, config.value.corSecundaria)
      }

      $q.loading.hide()
      return config
    }
  }

  return {
    list,
    getById,
    post,
    update,
    remove,
    uploadImg,
    getUrlPublic,
    listPublic,
    getConfig,
    config
  }
}
