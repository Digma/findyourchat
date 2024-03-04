
import { persistentAtom } from "@nanostores/persistent"
import type { Question } from "./personality/types.ts"
// import { computed } from 'nanostores'

const version = await import.meta.env.PUBLIC_LOCAL_STORAGE_VERSION

//const colorId = persistentAtom<string>(`velarshop_color_active/${ version }`, "")

export const quizQuestions = persistentAtom<Question[]>(
    'quizQuestions',
     [],
    {
        encode: JSON.stringify,
        decode: JSON.parse,
    }
);

export const englishType = persistentAtom<string>('englishType', undefined)

export const saveProfile = persistentAtom<string>('saveProfile', 'false')
export const editProfile = persistentAtom<string>('editProfile', 'false')

// export const shoppingCart = persistentAtom<Product[]>('cart', [], {
//     encode: JSON.stringify,
//     decode: JSON.parse,
//   })

// export type SettingsValue = {
//     sidebar: 'show' | 'hide',
//     theme: 'dark' | 'light' | 'auto'
//   }
  
//   export const settings = persistentMap<SettingsValue>('settings:', {
//     sidebar: 'show',
//     theme: 'auto'
//   })

// Do not sync between tabs: 
// export const draft = persistentAtom('draft', '', { listen: false })