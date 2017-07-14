<template>
<div class="card card--primary">
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="prop" label="Prop name">
    </el-table-column>
    <el-table-column prop="value" label="Value">
      <template scope="scope">
          <div slot="reference">
            <strong>{{ scope.row.value }}</strong>
          </div>
        </template>
    </el-table-column>
    <el-table-column prop="type" label="typeof">
      <template scope="scope">
          <div slot="reference">
            <el-tag type="gray">{{ scope.row.type }}</el-tag>
          </div>
        </template>
    </el-table-column>
    <el-table-column prop="default" label="default">
    </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
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
};
</script>
