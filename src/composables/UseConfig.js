import { setCssVar } from 'quasar'

export default function UseConfig () {
  const setConfig = (primaria, secundaria) => {
    if (primaria) {
      setCssVar('primary', primaria)
    }

    if (secundaria) {
      setCssVar('secondary', secundaria)
    }
  }

  return {
    setConfig
  }
}
