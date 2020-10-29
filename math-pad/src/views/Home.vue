<template>
<div class="text-left min-h-screen bg-gray-200 flex flex-col">
  <textarea name="template" id="" class="sr-only whitespace-pre-wrap" aria-hidden ref="clipboardCode" v-model="clipboard" />
  <header class="relative z-10 bg-blue-900 flex-shrink-0 px-4 pt-2 sm:pb-2 flex items-center justify-between space-x-6 shadow-md">
    <div class="w-full flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-6 sm:items-center sm:justify-between">
      <section class="flex space-x-6 justify-between sm:justify-start items-center w-full sm:w-auto">
        <router-link :to="{ path: '/', query: { pad: 'example' }}">
          <h1 class="text-xl sm:text-2xl font-semibold text-gray-200 tracking-wide pr-4">Math Pad</h1>
        </router-link>
        <button @click="submit" class="flex items-center space-x-3 bg-blue-700 text-blue-100 px-4 py-1 rounded-lg shadow hover:text-white hover:bg-blue-800 transition duration-200 focus:outline-none focus:shadow-outline focus:bg-blue-800">
          <svg class="text-blue-300 w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <p class="font-semibold text-base sm:text-lg tracking-wide">
            share
          </p>
        </button>
        <button v-if="shortId" @click="copyShared" class="flex items-center p-1 rounded-lg space-x-2 text-gray-500 hover:text-blue-200 transition duration-100 focus:outline-none focus:shadow-outline">
          <p class="text-base font-semibold">
            /{{shortId}}
          </p>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
        </button>
      </section>
      <div class="flex items-center justify-between space-x-6">
        <section class="w-full sm:w-auto flex justify-around sm:justify-start sm:space-x-6 items-center">
          <button 
            @click="() => setLayout('horizontal')" 
            class="
              flex items-center justify-center px-1 py-2 w-1/4 h-min m-auto rounded-none overflow-visible
              text-gray-400 bg-blue-900  
              hover:text-blue-200 hover:bg-blue-800 focus:outline-none sm:focus:shadow-outline focus:bg-blue-800 
              transition duration-100 ease-in
              sm:w-min sm:rounded-full sm:py-1
            "
          >
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          </button>
          <button 
            @click="() => setLayout('vertical')" 
            class="
              flex items-center justify-center px-1 py-2 w-1/4 h-min m-auto rounded-none overflow-visible
              text-gray-400 bg-blue-900  
              hover:text-blue-200 hover:bg-blue-800 focus:outline-none sm:focus:shadow-outline focus:bg-blue-800 
              transition duration-100 ease-in
              sm:w-min sm:rounded-full sm:py-1
            "
          >
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
          </button>
          <button 
            @click="() => setLayout('preview')" 
            class="
              flex items-center justify-center px-1 py-2 w-1/4 h-min m-auto rounded-none overflow-visible
              text-gray-400 bg-blue-900  
              hover:text-blue-200 hover:bg-blue-800 focus:outline-none sm:focus:shadow-outline focus:bg-blue-800 
              transition duration-100 ease-in
              sm:w-min sm:rounded-full sm:py-1
            "
          >
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
          </button>
          <button 
            @click="() => setLayout('code')" 
            class="
              flex items-center justify-center px-1 py-2 w-1/4 h-min m-auto rounded-none overflow-visible
              text-gray-400 bg-blue-900  
              hover:text-blue-200 hover:bg-blue-800 focus:outline-none sm:focus:shadow-outline focus:bg-blue-800 
              transition duration-100 ease-in
              sm:w-min sm:rounded-full sm:py-1
            "
          >
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>      
          </button>
          <div class="w-1 h-4 bg-blue-800 rounded"></div>
          <button 
            @click="() => modalUp = true" 
            class="
              flex items-center justify-center px-1 py-2 w-1/4 h-min m-auto rounded-none overflow-visible
              text-gray-400 bg-blue-900  
              hover:text-blue-200 hover:bg-blue-800 focus:outline-none sm:focus:shadow-outline focus:bg-blue-800 
              transition duration-100 ease-in
              sm:w-min sm:rounded-full sm:py-1
            "
          >
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </button>
        </section>
      </div>
    </div>
  </header>
  <main class="relative space-y-8 flex-1">
    <div class="absolute inset-0 h-full flex" :class="{'flex-col-reverse': layout === 'vertical'}">
      <div 
        class="bg-gray-300 sm:p-4" 
        :class="{
          'h-full w-1/2 sm:pl-4 sm:pr-2': layout === 'horizontal',
          'w-full h-1/2 sm:pt-2 sm:pb-4': layout === 'vertical',
          'h-full w-full sm:p-4': layout === 'code',
        }"
        :style="layout === 'horizontal' ? 'min-height: 16rem' : ''"
        v-if="layout !== 'preview'"
      >
        <textarea :value="formula" @input="setFormulaDebounced" class="p-3 sm:p-4 h-full w-full shadow-lg bg-white text-gray-900 font-medium leading-loose sm:rounded-xl resize-none focus:outline-none focus:shadow-outline"></textarea>
      </div>
      <div 
        class="bg-gray-300 sm:p-4" 
        :class="{
          'h-full w-1/2 sm:pl-2 sm:pr-4': layout === 'horizontal',
          'w-full h-1/2 sm:pt-4 sm:pb-2': layout === 'vertical',
          'h-full w-full sm:p-4': layout === 'preview',
        }"
        :style="layout === 'horizontal' ? 'min-height: 16rem' : ''"
        v-if="layout !== 'code'"
      >
        <div class="h-full mx-auto p-3 sm:p-4 bg-white sm:rounded-xl shadow-lg overflow-auto" :style="layout === 'preview' ? 'max-width: 84ch' : ''">
          <div 
            id="maths" 
            class="prose max-w-none" 
            v-html="rendered"
          />
        </div>
      </div>
    </div>
  </main>
  <div v-if="modalUp">
    <transition
      appear=""
      leave-to-class="opacity-0"
      enter-class="opacity-0"
      leave-active-class="duration-200 transition-opacity"
      enter-active-class="duration-200 transition-opacity"
    >
    <div class="fixed w-screen h-screen top-0 left-0 z-10 flex">
      
    <button class="fixed top-0 left-0 w-screen h-screen bg-gray-800 opacity-75" @click.self="() => modalUp = false"></button>
    <div class="p-8 w-full h-full">
      <div class="m-auto max-w-xl w-full h-full relative z-20 p-4 bg-white rounded-lg">
        <iframe src="https://detexify.kirelabs.org/classify.html" frameborder="0" class="w-full h-full"></iframe>
      </div>
    </div>
    </div>
    </transition>
  </div>
</div>
</template>

<script>
import hljs from 'highlight.js'
import sample from '!!raw-loader!@/assets/sample.md';
import { useEndpoint } from '@/composables/useFetch'
import MarkdownIt from 'markdown-it'
import { debounce } from "debounce";
import { onMounted, ref, computed, watch, watchEffect } from '@vue/composition-api';
export default {
  name: 'HelloWorld',
  setup(_, { root }) {
    const modalUp = ref(false)
    const layout = ref('horizontal')
    const copied = ref(false)
    const clipboardCode = ref('')
    const shortId = ref('')
    const clipboard = computed(() => {
      const resId = responseState?.result?.short_id
      if(resId) {
        shortId.value = resId
        return window.location.href
      } else {
        return ''
      }
    })
    const url = ref('')
    const md = MarkdownIt({
      html:         true,        // Enable HTML tags in source
      xhtmlOut:     true,        // Use '/' to close single tags (<br />).
                                  // This is only for full CommonMark compatibility.
      breaks:       true,        // Convert '\n' in paragraphs into <br>
      // langPrefix:   'language-',  // CSS language prefix for fenced blocks. Can be
                                  // useful for external highlighters.
      linkify:      true,        // Autoconvert URL-like text to links

      // Enable some language-neutral replacement + quotes beautification
      typographer:  true,

      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Could be either a String or an Array.
      //
      // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
      // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
      quotes: '“”‘’',
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
          } catch (__) {
            console.log('huh')
          }
        }

        return ''; // use external default escaping
      }
    })
    var defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

    md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
      // If you are sure other plugins can't add `target` - drop check below
      var aIndex = tokens[idx].attrIndex('target');

      if (aIndex < 0) {
        tokens[idx].attrPush(['target', '_blank']); // add new attribute
      } else {
        tokens[idx].attrs[aIndex][1] = '_blank';    // replace value of existing attr
      }

      // pass token to default renderer.
      return defaultRender(tokens, idx, options, env, self);
    };
    const formula = ref('')
    const rendered = ref('')
    const { post, responseState } = useEndpoint()

    function copyShared() {
      setTimeout(() => {
        clipboardCode.value.select()
        document.execCommand('copy')
      });
    }

    function submit() {
      post('api/text/new', {
        text: formula.value
      }).then(() => {
        copied.value = false
        copyShared()
      })
    }
    
    const render = () => {
      rendered.value = md.render(formula.value)
    }

    const rerender = () => {
      render()
      setTimeout(() => {
        window.MathJax.Hub.Queue(["Typeset",window.MathJax.Hub, document.getElementById('maths')]);
      })
    }

    const setFormula = (e) => {
      const value = typeof e === 'string' ? e : e.target.value
      formula.value = value
      rerender()
    }

    const setLayout = (key) => {
      layout.value = key
      if(root.$route.query.layout !== key) {
        root.$router.push({ path: '/', query: { ...root.$route.query, layout: layout.value }})
      }
      rerender()
    }

    watch(responseState, () => {
      if(responseState.result && responseState.result.short_id) {
        console.log(root)
        if(root.$route.query.pad && root.$route.query.pad === responseState.result.short_id && root.$route.query.layout === layout.value) return
        else root.$router.push({ path: '/', query: { pad: responseState.result.short_id, layout: layout.value }})
      }
    })

    watchEffect(() => {
      if(root.$route.query.pad) {
        console.log(root.$route.query.pad)
        fetch(`https://short.colehollant.com/api/text/${root.$route.query.pad}`)
          .then(res => res.text())
          .then(res => {
            if(res != formula.value) {
              formula.value = res
              rerender()
            }
          })
      }
    })

    const setFormulaDebounced = debounce(setFormula, 2000)

    onMounted(() => {
      console.log(root.$route)
      if(root.$route.query.layout) {
        layout.value = root.$route.query.layout
      }
      if(!root.$route.query.pad) {
        setFormula(sample)
      }
    })
    return {
      formula,
      setFormulaDebounced,
      rendered,
      url, 
      submit, 
      responseState,
      clipboard,
      copied,
      clipboardCode,
      shortId,
      copyShared,
      layout,
      setLayout,
      modalUp
    }
  }
}
</script>

<style lang="postcss">
.MathJax_Display, .MJXc-display {
  margin: 1.5rem 0 !important;
}
.hljs{display:block;overflow-x:auto;padding:.5em;background:#1e1e1e;color:#dcdcdc}.hljs-keyword,.hljs-literal,.hljs-name,.hljs-symbol{color:#569cd6}.hljs-link{color:#569cd6;text-decoration:underline}.hljs-built_in,.hljs-type{color:#4ec9b0}.hljs-class,.hljs-number{color:#b8d7a3}.hljs-meta-string,.hljs-string{color:#d69d85}.hljs-regexp,.hljs-template-tag{color:#9a5334}.hljs-formula,.hljs-function,.hljs-params,.hljs-subst,.hljs-title{color:#dcdcdc}.hljs-comment,.hljs-quote{color:#57a64a;font-style:italic}.hljs-doctag{color:#608b4e}.hljs-meta,.hljs-meta-keyword,.hljs-tag{color:#9b9b9b}.hljs-template-variable,.hljs-variable{color:#bd63c5}.hljs-attr,.hljs-attribute,.hljs-builtin-name{color:#9cdcfe}.hljs-section{color:gold}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}.hljs-bullet,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-selector-pseudo,.hljs-selector-tag{color:#d7ba7d}.hljs-addition{background-color:#144212;display:inline-block;width:100%}.hljs-deletion{background-color:#600;display:inline-block;width:100%}
</style>