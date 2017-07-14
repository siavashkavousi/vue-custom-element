<template>
  <div>
    <h2>Inheritance demo</h2>

    <div class="demo-card">
      <demo-inheritance from-mixin-one="fromMixinOne is set via attributes"></demo-inheritance>
    </div>

    <el-collapse v-model="activeNames">
      <el-collapse-item title="Description" name="1">
        <p>Let's use <code>mixins</code> and extend the vue-component with <code>extends</code> to see the inheritance at work.</p>
        <p>All properties are displayed as expected and the declarative binding works properly.</p>
        <p>By taking a look at the default we can see that the inheritance-pattern common to vue has been honored.</p>
        <p>This is because the underlying vue instance handles the merging of options,
          while vue-custom-element only has to know all prop-keys in order to set the custom element attributes upon element-registration.
        </p>

      </el-collapse-item>
      <el-collapse-item title="Custom Element HTML" name="2">
        <pre><code class="language-html">
{{HTML}}
        </code></pre>
      </el-collapse-item>
      <el-collapse-item title="Vue component passed to Vue-custom-element" name="3">
        <pre><code class="language-html">
&#x3C;template&#x3E;
  {{vueTemplate}}
&#x3C;/template&#x3E;

&#x3C;script&#x3E;
  {{vueScript}}
&#x3C;/script&#x3E;
        </code></pre>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  import Vue from 'vue';
  import DemoElement from 'demo/components/DemoInheritance-component';

  export default {
    data() {
      return {
        message: 'Hello Vue!',
        activeNames: ['1'],
        HTML: (
`<demo-inheritance
  from-mixin-one="fromMixinOne is set via attributes">
</demo-inheritance>`
        ),
        vueTemplate: (
`<div>
    <h4>{{ message }}</h4>

    <el-table :data="tableData">
      <el-table-column prop="prop" label="Prop name"></el-table-column>
      <el-table-column prop="value" label="Value"></el-table-column>
      <el-table-column prop="type" label="typeof"></el-table-column>
      <el-table-column prop="default" label="default"></el-table-column>
    </el-table>
  </div>`
        ),
        vueScript: (
  `export default {
    mixins: [{
      props: ['fromMixinOne']
    }, {
      props: {
        fromMixinOne: {
          type: String,
          default: () => 'override mixinOne by mixinTwo'
        },
        fromMixinTwo: {
          type: String,
          default: () => 'extends will be overriding this'
        }
      }
    }],
    extends: {
      props: {
        fromMixinTwo: {
          type: String,
          default: () => 'extends override of mixinTwo prop'
        },
        fromExtended: {
          type: String,
          default: () => 'instance will be overriding this'
        }
      }
    },
    methods: {
      getDefault(prop) {
        if (!this.$options.props[prop]) return '';
        const def = this.$options.props[prop].default;
        return (typeof def === 'function') ? def() : def;
      }
    },
    computed: {
      tableData() {
        return [{
          prop: 'fromMixinOne',
          value: JSON.stringify(this.fromMixinOne),
          type: typeof this.fromMixinOne,
          default: this.getDefault('fromMixinOne')
        }, {
          prop: 'fromMixinTwo',
          value: JSON.stringify(this.fromMixinTwo),
          type: typeof this.fromMixinTwo,
          default: this.getDefault('fromMixinTwo')
        }, {
          prop: 'fromExtended',
          value: JSON.stringify(this.fromExtended),
          type: typeof this.fromExtended,
          default: this.getDefault('fromExtended')
        }];
      }
    },
    created() {
      /* eslint-disable no-console */
      console.log('demo-inheritance created()');
    }
  };`
        )
      };
    },
    methods: {
      registerCustomElement() {
        Vue.customElement('demo-inheritance', DemoElement);
      }
    }
  };
</script>
