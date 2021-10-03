<template>
  <div class="content">
    <pre><code class="language-css">p { color: red }</code></pre>
    <pre><code class="language-java">	byte b=12;
        short s=12;
        long l=12L;
          </code>
    </pre>
    <vue-markdown class="markdown" :source="content"></vue-markdown>

  </div>
</template>
<script>
import VueMarkdown from 'vue-markdown'
import Prism from "prismjs";//引入插件

export default {
  components: {
    VueMarkdown
  },
  data() {
    return {
      content: `# :) (c) \n123123123`
    }
  },
  mounted() {
    Prism.manual = true;
    Prism.highlightAll();
  }
}
</script>
<style>
.content {
  background-color: wheat;
}
</style>
