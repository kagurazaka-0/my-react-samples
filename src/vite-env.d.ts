/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client-react" />
/// <reference types="unplugin-icons/types/react" />

// 既存のenv定義に追記している
interface ImportMetaEnv {
  VITE_BASEURL: string
}

declare const IS_DEV: boolean
