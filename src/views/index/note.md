#### 1、class类名合并
<button :class="['blue', { radius: flag }]">1</button>

#### 2、v-if和v-for
v-if配合template使用，解决v-for冲突，以及控制多个元素而不用新增元素
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
v-for绑定template
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>


#### 3、命名规范
相同名在前，不同名在后
组件名以首字母大写的驼峰命名
template中子组件用-连接，全小写，双标签
尽量全名，长一些没关系
import MyChild from './MyChild.vue'
components: { MyChild }
<my-child></my-child>

#### 4、props自定义校验
props: {
  status: {
    type: String,
    required: true,
    validator: function (value) {
      return [
        'syncing',
        'synced',
        'version-conflict',
        'error'
      ].indexOf(value) !== -1
    }
  }
}

#### 5、v-for可以直接遍历对象
<div v-for="(value, key, index) in object">
  {{ index }}. {{ key }}: {{ value }}
</div>

#### 6、$set方法
this.$set(arr, index, newVal)
this.$set(obj, key, newVal)

#### 7、$event
原始dom事件的事件对象用$event作为参数传入；
子组件通过$emit传递的参数可以在父组件绑定事件里直接使用，
<child @onBack="console.log($event)"></child>

#### 8、.passive修饰符
可以提高移动端滚动事件的性能
<div @scroll.passive="onScroll">...</div>
原理：（也可用于touch事件）
addEventListener(type, listener, {
  capture: false,
  passive: false,
  once: false
})

#### 9、inheritAttrs和$attrs
inheritAttrs: false 让子组件的根元素不再继承自父组件设置的非props属性
$attrs用于接收父组件设置的非props属性（$listeners接收父组件传递的原生dom事件）
<base-input required placeholder="Enter your username"></base-input>
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        :value="value"
        @input="$emit('input', $event.target.value)"
      >
    </label>
  `
})
这里的$attrs是{ required: true, placeholder: 'Enter your username' }
v-bind可以直接绑定对象，自动遍历绑定

#### 10、v-model的model选项
用于更改v-model传递给组件的默认的value和input变量名
Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      :checked="checked"
      @change="$emit('change', $event.target.checked)"
    >
  `
})

#### 11、.native修饰符
用于给子组件根元素绑定原生dom事件

#### 12、v-slot
vue@2.6.0以上版本，可以用v-slot
1、具名插槽 v-slot:slotName
<slot name="slotName"></slot>
<template v-slot:slotName></template>
2、作用域插槽
<slot :user="MyUser">{{ Myuser.name }}
<template v-slot:slotName="scopeName">
  <p>{{ scopeName.user.name }}
</template>
默认插槽用v-slot:default，单用时可直接用v-slot
<template v-slot="scopeName"></template>
也可以用es6的解构赋值
<template v-slot:slotName="{ user }">
  <p>{{ user.name }}
</template>
v-slot:可用缩写#，但需有参数
<template #default="scopeName"></template> 表示默认的作用域插槽

#### 12、动态参数
vue@2.6.0以上版本
<a v-bind:[attributeName]="url"> ... </a>
复杂表达式可用computed代替
computed: {
  attributeName() {
    return ...
  }
}

#### 13、
