<script lang="ts" setup>
import { computed, ref } from 'vue';
import MarkdownIt from 'markdown-it';
import mdKatex from '@traptitech/markdown-it-katex';
import mila from 'markdown-it-link-attributes';
import hljs from 'highlight.js';
import { useBasicLayout } from '@/composables';
import { t } from '@/locales';

interface Props {
  inversion?: boolean;
  error?: boolean;
  text?: string;
  loading?: boolean;
  asRawText?: boolean;
}

const props = defineProps<Props>();

const { isMobile } = useBasicLayout();

const textRef = ref<HTMLElement>();

const mdi = new MarkdownIt({
  linkify: true,
  highlight(code, language) {
    const validLang = Boolean(language && hljs.getLanguage(language));
    if (validLang) {
      const lang = language ?? '';
      return highlightBlock(hljs.highlight(code, { language: lang }).value, lang);
    }
    return highlightBlock(hljs.highlightAuto(code).value, '');
  }
});

mdi.use(mila, { attrs: { target: '_blank', rel: 'noopener' } });
mdi.use(mdKatex, { blockClass: 'katexmath-block rounded-md p-[10px]', errorColor: ' #cc0000' });

const wrapClass = computed(() => {
  return [
    'text-wrap',
    'min-w-[20px]',
    'rounded-md',
    isMobile ? 'p-2' : 'px-3 py-2',
    props.inversion ? 'bg-primary_1' : 'bg-[#f4f6f8]',
    props.inversion ? 'dark:bg-primary' : 'dark:bg-[#1e1e20]',
    props.inversion ? 'message-request' : 'message-reply',
    { 'text-red-500': props.error }
  ];
});

const text = computed(() => {
  const value = props.text ?? '';
  if (!props.asRawText) return mdi.render(value);
  return value;
});

function highlightBlock(str: string, lang?: string) {
  return `<pre class="code-block-wrapper"><div class="code-block-header"><span class="code-block-header__lang">${lang}</span><span class="code-block-header__copy">${t(
    'message.chat.copyCode'
  )}</span></div><code class="hljs code-block-body ${lang}">${str}</code></pre>`;
}

defineExpose({ textRef });
</script>

<template>
  <div  :class="wrapClass">
    <div ref="textRef" class="leading-relaxed break-words">
      <div v-if="!inversion">
        <div v-if="!asRawText" class="markdown-body" v-html="text" />
        <div v-else class="whitespace-pre-wrap" v-text="text" />
      </div>
      <div v-else class="whitespace-pre-wrap" v-text="text" />
      <template v-if="loading">
        <span class="dark:text-white w-[4px] h-[20px] block animate-blink" />
      </template>
    </div>
  </div>
</template>

<style lang="less">
@import url(./style.less);
@import url(./highlight.less);
@import url(./github-markdown.less);
</style>
