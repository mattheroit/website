---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: name
  text: text
  tagline: tagline
  #actions:
  #  - theme: brand
  #    text: Markdown Examples
  #    link: /markdown-examples
  #  - theme: alt
  #    text: API Examples
  #    link: /api-examples

features:
  - title: Český jazyk a literatura
    details: "- Zápisky<br>- Rozbory"
    link: /CJL/
  #- title: Feature B
  #  details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  #- title: Feature C
---

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
    window.location.replace(`/CJL/`);
});
</script>
