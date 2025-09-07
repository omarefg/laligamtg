import { Nullable } from "@/types"

export function obfuscate(data: unknown): string {
  try {
    const saltedData = {
      salt: Math.random().toString(36).substring(2, 15),
      data: data,
      timestamp: Date.now()
    }

    const saltedJsonString = JSON.stringify(saltedData)

    const base64 = Buffer.from(saltedJsonString).toString('base64')
    const randomPrefix = Math.random().toString(36).substring(2, 8)
    const randomSuffix = Math.random().toString(36).substring(2, 8)

    const result = `${randomPrefix}${base64}${randomSuffix}`
    return result
  } catch (error) {
    console.error(error)
    return ''
  }
}

export function deobfuscate<T>(str: string): Nullable<T> {
  try {
    const base64 = str.substring(6, str.length - 6)
    const jsonString = atob(base64)
    const saltedData = JSON.parse(jsonString)

    return saltedData.data
  } catch (error) {
    console.error(error)
    return null
  }
}
