"use server"

/**
 * Intenta obtener la imagen principal de un enlace de producto
 * (Open Graph, Twitter Card y algunos casos de Amazon).
 */
export async function fetchImageFromUrl(url: string) {
  try {
    try {
      new URL(url)
    } catch {
      return { success: false, error: "URL no válida" }
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      return { success: false, error: "No se pudo acceder al enlace" }
    }

    const html = await response.text()

    const ogImageMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i)
    if (ogImageMatch?.[1]) {
      return { success: true, imageUrl: ogImageMatch[1] }
    }

    const twitterImageMatch = html.match(
      /<meta\s+name="twitter:image"\s+content="([^"]+)"/i
    )
    if (twitterImageMatch?.[1]) {
      return { success: true, imageUrl: twitterImageMatch[1] }
    }

    if (url.includes("amazon")) {
      const amazonHiRes = html.match(/"hiRes":"([^"]+)"/)
      if (amazonHiRes?.[1]) return { success: true, imageUrl: amazonHiRes[1] }

      const amazonLarge = html.match(/"large":"([^"]+)"/)
      if (amazonLarge?.[1]) return { success: true, imageUrl: amazonLarge[1] }

      const dataImage = html.match(/"images":?"?\[?"?(?:"([^"]+)"|'([^']+)')/)
      const candidate = dataImage?.[1] || dataImage?.[2]
      if (candidate) return { success: true, imageUrl: candidate }
    }

    const metaImage = html.match(/<meta\s+name="image"\s+content="([^"]+)"/i)
    if (metaImage?.[1]) return { success: true, imageUrl: metaImage[1] }

    return { success: false, error: "No se encontró imagen en el enlace" }
  } catch (error) {
    console.error("fetchImageFromUrl:", error)
    if (error instanceof TypeError) {
      return { success: false, error: "Error de conexión al acceder al enlace" }
    }
    return { success: false, error: "Error al procesar el enlace" }
  }
}
