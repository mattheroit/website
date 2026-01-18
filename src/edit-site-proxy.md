---
layout: false
---

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const path = urlParams.get('path'); // e.g., "projects/prt-a/docs/cs/index.md"

  if (path && path.startsWith('projects/')) {
    const parts = path.split('/');
    const repoName = parts[1];
    const pathInRepo = parts.slice(2).join('/');

    const githubUrl = `https://github.com/mattheroit/${repoName}/edit/main/${pathInRepo}`;
    window.location.replace(githubUrl);
  } else {
    // Fallback for non-project files
    window.location.replace(`https://github.com/mattheroit/website/edit/main/src/${path}`);
  }
})
</script>

Redirecting to GitHub...
