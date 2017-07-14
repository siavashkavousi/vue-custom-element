<template>
<div class="card card--primary">
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="prop" label="Prop name" width="150">
    </el-table-column>
    <el-table-column prop="value" label="Value">
    </el-table-column>
    <el-table-column prop="type" label="typeof" width="100">
    </el-table-column>
    <el-table-column prop="default" label="default">
    </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  extends: {
    name: 'extended-class',
    props: ['fromExtended']
  },
  mixins: [{
    name: 'mixin-one',
    props: ['fromMixinOne']
  }, {
    props: {
      name: 'mixin-two',
      fromMixinOne: {
        type: String,
        default: () => 'mixin overrides mixin-prop'
      },
      fromExtended: {
        type: String,
        default: () => 'mixin overrides extended-prop'
      },
      fromMixinTwo: {
        type: String,
        default: () => 'mixin sets new prop'
      }
    }
  }],
  props: {
    fromMixinTwo: {
      type: String,
      default: () => 'instance overrides mixin-prop'
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
};
</script>
