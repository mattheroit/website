---
layout: false
---

<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  const saved = localStorage.getItem('user-language')
  // Redirect to saved lang, or default to /cs/
  window.location.replace(saved === 'en' ? '/en/' : '/cs/')
})
</script>
