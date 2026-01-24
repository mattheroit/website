/// Checks if the requested route actually doesn't exist. If it exists, reroute the user. /// This is used if someone shares an unlocalized path.

<script setup>
import { ref, onMounted } from "vue"
import { useData } from "vitepress"
import DefaultTheme from "vitepress/theme"

const { Layout } = DefaultTheme
const { page } = useData()

const isChecking = ref(false)

// Checks if we can redirect to a localized version, else redirects to 404 page
onMounted(async () => {
  if (!page.value.isNotFound) {
    return
  }

  isChecking.value = true
  const path = window.location.pathname

  // Skip if it's already localized or a file
  if (path.startsWith("/cs/") || path.startsWith("/en/") || path.includes(".")) {
    isChecking.value = false
    return
  }

  const browserLang = navigator.language.toLowerCase().startsWith("cs") ? "/cs" : "/en"
  const targetPath = browserLang + path

  try {
    const res = await fetch(targetPath, { method: "HEAD" })
    if (res.ok) {
      window.location.replace(targetPath)
      return
    }
  } catch (e) {
    console.error("Redirect check failed", e)
  }
  isChecking.value = false
})
</script>

<template>
  <Layout v-if="!isChecking"> </Layout>
</template>

<style></style>
