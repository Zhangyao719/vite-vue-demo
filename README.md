# vue3

> vue3官网https://v3.cn.vuejs.org/

Vue3现状：

- [vue-next (opens new window)](https://github.com/vuejs/vue-next/)2020年09月18日，正式发布vue3.0版本。但是由于刚发布周边生态不支持，大多数开发者处于观望。
- 现在主流组件库都已经发布了支持vue3.0的版本，其他生态也在不断地完善中，这是趋势。
  - [element-plus (opens new window)](https://element-plus.org/#/zh-CN)基于 Vue 3.0 的桌面端组件库
  - [vant (opens new window)](https://vant-contrib.gitee.io/vant/v3/#/zh-CN)vant3.0版本，有赞前端团队开源移动端组件库
  - [ant-design-vue (opens new window)](https://2x.antdv.com/components/overview/)Ant Design Vue 2.0版本，社区根据蚂蚁 ant design 开发 

Vue3新特性：

- 数据响应式数据重新实现（ES6的proxy替代ES5的Object.defineProperty）
- 源码使用typescript进行重新编写（更好的类型推导)  
- 虚拟DOM新算法（更快，更小）
- 提供了composition api，为了更好的逻辑复用与代码组织
- 自定义渲染器（可以根据需求自定义各种各样的渲染器）
  - App端 [https://vue-native.io/docs](https://vue-native.io/docs/)[/](https://vue-native.io/docs/)
  - 小程序端：http://mpvue.com/
  - 游戏开发：[https://vugel.planning.nl/#application](https://vugel.planning.nl/)
- 6.Fragment，模板可以有多个根元素
- 7.…

Vue3展望：

- 这是趋势，越来越多的企业将来肯定会升级到Vue3.0
- 大型项目，由于对Ts的友好越来越多大型项目可以用Vue3.0

## vue响应式数据的说明

### vue2响应式原理

+ Vue2.0中使用ES5中的Object.defineProperty方法实现响应式数据

+ 缺点
  + 无法监测到对象属性的动态添加(**this.$set**)和删除(**this.$delete**)
  + 无法监测到数组的下标和length属性的变更 

+ 解决方案
  + Vue2.0提供Vue.set方法用于动态给对象添加属性
  + Vue2.0提供Vue.delete方法用于动态删除对象的属性
  + 重写vue中数组的方法，用于监测数组的变更

### vue3响应式原理

+ Vue3.0中使用ES6中的proxy语法实现响应式数据

+ 优点
  + 可以检测到代理对象属性的动态添加和删除

  + 可以监测到数组的下标和length属性的变更

+ 缺点
  + ES6的proxy语法对于低版本浏览器不支持，IE11
  + Vue3.0会针对于IE11出一个特殊的版本用于支持ie11

## 选项API和组合API

> 目标：理解什么是选项API写法，什么是组合API写法。

什么是选项API写法：`Options ApI`

- 咱们在vue2.x项目中使用的就是

  ```
  选项API
  ```

  写法

  - 代码风格：data选项写数据，methods选项写函数...，一个功能逻辑的代码分散。

- 优点：易于学习和使用，写代码的位置已经约定好

- 缺点：代码组织性差，相似的逻辑代码不便于复用，逻辑复杂代码多了不好阅读。

- 补充：虽然提供mixins用来封装逻辑，但是出现数据函数覆盖的概率很大，不好维护。

```vue
<template>
  <div class="container">
    <div>鼠标位置：</div>
    <div>X轴：{{x}}</div>
    <div>Y轴：{{y}}</div>
    <hr>
    <div>{{count}} <button @click="add()">自增</button></div>  
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      x: 0,
      y: 0,
      count: 0
    }
  },
  mounted() {
    document.addEventListener('mousemove', this.move)
  },
  methods: {
    move(e) {
      this.x = e.pageX
      this.y = e.pageY
    },
    add () {
        this.count++
    }    
  },
  destroyed() {
    document.removeEventListener('mousemove', this.move)
  }
}
</script>
```

什么是组合API写法：`Compositon API` 

- 咱们在vue3.0项目中将会使用

  ```
组合API
  ```
  
  写法

  - 代码风格：一个功能逻辑的代码组织在一起（包含数据，函数...）

- 优点：功能逻辑复杂繁多情况下，各个功能逻辑代码组织再一起，便于阅读和维护

- 缺点：需要有良好的代码组织能力和拆分逻辑能力，PS：大家没问题。

- 补充：为了能让大家较好的过渡到vue3.0的版本来，`也支持vue2.x选项API写法`

```vue
<template>
  <div class="container">
    <div>鼠标位置：</div>
    <div>X轴：{{x}}</div>
    <div>Y轴：{{y}}</div>
    <hr>
    <div>{{count}} <button @click="add()">自增</button></div>  
  </div>
</template>
<script>
import { onMounted, onUnmounted, reactive, ref, toRefs } from 'vue'
export default {
  name: 'App',
  setup () {
    // 鼠标移动逻辑
    const mouse = reactive({
      x: 0,
      y: 0
    })
    const move = e => {
      mouse.x = e.pageX
      mouse.y = e.pageY
    }
    onMounted(()=>{
      document.addEventListener('mousemove',move)
    })
    onUnmounted(()=>{
      document.removeEventListener('mousemove',move)
    })

    // 累加逻辑
    const count = ref(0)
    const add = () => {
      count.value ++ 
    }

    // 返回数据
    return {
      ...toRefs(mouse),
      count,
      add
    }
  }
}
</script>
```

**总结：**

- 知道选项API和组合API的写法区别，建议大家使用组合API在vue3.0项目中。

## 组合API-setup函数

> 目标：掌握setup函数的基本使用

使用细节：

- `setup` 是一个新的组件选项，作为组件中使用组合API的起点。
- 从组件生命周期来看，它的执行在组件实例创建之前`vue2.x的beforeCreate`执行。
- **没有this:**  这就意味着在`setup`函数中 `this` 还不是组件实例，`this` 此时是 `undefined` 
- **setup必须有返回值:  **在模版中需要使用的数据和函数，需要在 `setup` 返回。

演示代码：

```vue
<template>
  <div class="container">
    <h1 @click="say()">{{msg}}</h1>
  </div>
</template>
<script>
export default {
  setup () {
    console.log('setup执行了')
    console.log(this)
    // 定义数据和函数
    const msg = 'hi vue3'
    const say = () => {
      console.log(msg)
    }

    return { msg , say}
  },
  beforeCreate() {
    console.log('beforeCreate执行了')
    console.log(this)
  }
}
</script>
```

**总结：** `setup` 组件初始化之前执行，它返回的数据和函数可在模版使用。

## 组合API-生命周期

> 目标：掌握使用组合API写法的生命周期钩子函数

回顾vue2.x生命周期钩子函数：

- beforeCreate
- created
- beforeMount
- mounted
- beforeUpdate
- updated
- beforeDestroy
- destroyed

认识vue3.0生命周期钩子函数

- `setup` 创建实例前
- `onBeforeMount` 挂载DOM前
- `onMounted` 挂载DOM后
- `onBeforeUpdate` 更新组件前
- `onUpdated` 更新组件后
- `onBeforeUnmount` 卸载销毁前
- `onUnmounted` 卸载销毁后

演示代码：

```vue
<template>
  <div class="container">
    container
  </div>
</template>
<script>
import { onBeforeMount, onMounted } from 'vue'
export default {
  setup () {
    onBeforeMount(()=>{
      console.log('DOM渲染前',document.querySelector('.container'))
    })
    onMounted(()=>{
      console.log('DOM渲染后1',document.querySelector('.container'))
    })
    onMounted(()=>{
      console.log('DOM渲染后2',document.querySelector('.container'))
    })
  },
}
</script>
```

**总结：** 组合API的生命周期钩子有7个，可以多次使用同一个钩子，执行顺序和书写顺序相同。



## 组合API-响应式数据

### 组合API-reactive函数

> 目标：掌握使用reactive函数定义响应式数据

定义响应式数据：

- reactive是一个函数，它可以定义一个复杂数据类型，成为响应式数据。

演示代码：

```vue
<template>
  <div class="container">
    <div>{{obj.name}}</div>
    <div>{{obj.age}}</div>
    <button @click="updateName">修改数据</button>
  </div>
</template>
<script>
import { reactive } from 'vue'
export default {
  name: 'App',
  setup () {
    // 普通数据
    // const obj = {
    //   name: 'ls',
    //   age: 18
    // }
    const obj = reactive({
      name: 'ls',
      age: 18
    })

    // 修改名字
    const updateName = () => {
      console.log('updateName')
      obj.name = 'zs'
    }

    return { obj ,updateName}
  }
}
</script>
```

**总结：** 通常是用来定义响应式**对象数据**

**注意：reactive对象在解构或赋值给新的变量时会丢失响应式的效果**

### 组合API-ref函数

> 目标：掌握使用ref函数定义响应式数据，一般用于简单类型数据

定义响应式数据：

- ref函数，常用于简单数据类型定义为响应式数据
  - 再修改值，获取值的时候，需要.value
  - 在模板中使用ref声明的响应式数据，可以省略.value

演示代码：

```vue
<template>
  <div class="container">
    <div>{{name}}</div>
    <div>{{age}}</div>
    <button @click="updateName">修改数据</button>
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  name: 'App',
  setup () {
    // 1. name数据
    const name = ref('ls')
    console.log(name)
    const updateName = () => {
      name.value = 'zs'
    }
    // 2. age数据
    const age = ref(10)

    // ref常用定义简单数据类型的响应式数据
    // 其实也可以定义复杂数据类型的响应式数据
    // 对于数据未之的情况下 ref 是最适用的
    // const data = ref(null)
    // setTimeout(()=>{
    //   data.value = res.data
    // },1000)

    return {name, age, updateName}
  }
}
</script>
```

**使用场景：**

- **当你明确知道需要的是一个响应式数据 \*对象\* 那么就使用 reactive 即可**
- **其他情况使用ref**

### 组合API-toRef函数

> 目标：掌握使用toRef函数转换响应式对象中**某个**属性为单独响应式数据，并且值是关联的。

定义响应式数据：

- toRef是函数，转换**响应式对象**中**某个**属性为单独响应式数据，并且**值是关联的**。

演示代码：

```vue
<template>
  <div class="container">
    {{name}} <button @click="updateName">修改数据</button>
  </div>
</template>
<script>
import { reactive, toRef } from 'vue'
export default {
  name: 'App',
  setup () {
    // 1. 响应式数据对象
    const obj = reactive({
      name: 'ls',
      age: 10
    })
    console.log(obj)
    // 2. 模板中只需要使用name数据
    // 注意：从响应式数据对象中解构出的属性数据，不再是响应式数据
    // let { name } = obj 不能直接解构，出来的是一个普通数据
    const name = toRef(obj, 'name')
    // console.log(name)
    const updateName = () => {
      console.log('updateName')
      // toRef转换响应式数据包装成对象，value存放值的位置
      name.value = 'zs'
    }

    return {name, updateName}
  }
}
</script>
<style scoped lang="less"></style>
```

使用场景：有一个响应式对象数据，但是模版中只需要使用其中一项数据。

### 组合API-toRefs函数

> 目标：掌握使用toRefs函数定义转换响应式中**所有**属性为响应式数据，通常用于解构|展开reactive定义对象。

定义响应式数据：

- toRefs是函数，转换**响应式对象**中所有属性为单独响应式数据，对象成为普通对象，并且**值是关联的**

演示代码：

```vue
<template>
  <div class="container">
    <div>{{name}}</div>
    <div>{{age}}</div>
    <button @click="updateName">修改数据</button>
  </div>
</template>
<script>
import { reactive, toRef, toRefs } from 'vue'
export default {
  name: 'App',
  setup () {
    // 1. 响应式数据对象
    const obj = reactive({
      name: 'ls',
      age: 10
    })
    console.log(obj)
    // 2. 解构或者展开响应式数据对象
    // const {name,age} = obj
    // console.log(name,age)
    // const obj2 = {...obj}
    // console.log(obj2)
    // 以上方式导致数据就不是响应式数据了
    const obj3 = toRefs(obj)
    console.log(obj3)

    const updateName = () => {
      // obj3.name.value = 'zs'
      obj.name = 'zs'
    }

    return {...obj3, updateName}
  }
}
</script>
<style scoped lang="less"></style>
```

使用场景：剥离响应式对象（解构|展开），想使用响应式对象中的多个或者所有属性做为响应式数据。

### 总结

| API      | 接收参数                   | 备注                                                       | 示例                                           |
| -------- | -------------------------- | ---------------------------------------------------------- | ---------------------------------------------- |
| ref      | number \| string 或 object | 简单数据类型变成响应式。使用时注意 .value                  | let money= ref(100); money.value++             |
|          |                            | 传入复杂数据也可以 (内部会调用reactive)                    |                                                |
| reactive | object \| Array            | 复杂数据变成响应式                                         | const user = reactive({ name: 'zs', age: 18 }) |
|          |                            | 解构或赋值时, 新的变量不是响应式的 (需配合使用下面两个api) |                                                |
| toRef    | (对象,  '属性')            | 让对象的某个属性变成响应式                                 | let name = toRef(user, 'name')                 |
| toRefs   | object                     | 让对象中的所有属性均变成响应式                             | const { name, age } = toRefs(user)             |
|          |                            |                                                            | return { ...toRefs(user) }                     |

## 知识运用案例

> 目标：利用所学知识完成组合API实例

基本步骤：

- 记录鼠标坐标
  - 定义一个响应式数据对象，包含x和y属性。
  - 在组件渲染完毕后，监听document的鼠标移动事件
  - 指定move函数为事件对应方法，在函数中修改坐标
  - 在setup返回数据，模版中使用
- 累加1功能
  - 定义一个简单数据类型的响应式数据
  - 定义一个修改数字的方法
  - 在setup返回数据和函数，模板中使用

完整代码：

1. 提取 "记录鼠标坐标"

```js
// hooks/useMouse.js
import { reactive, onMounted, onBeforeUnmount } from 'vue'

export function useMouse() {
    // 1.1 申明一个响应式数据，他是一个对象，包含x y
    const mouse = reactive({
      x: 0,
      y: 0
    })
    // 1.3 修改响应式数据
    const move = (e) => {
      mouse.x = e.pageX
      mouse.y = e.pageY
    }
    // 1.2 等dom渲染完毕。去监听事件
    onMounted(()=>{
      document.addEventListener('mousemove', move)
    })
    // 1.4 组件消耗，删除事件
    onUnmounted(()=>{
      document.removeEventListener('mousemove', move)
    })

    return mouse
}
```

2. 引入功能

```vue
<template>
  <div class="container">
    <div>坐标</div>
    <div>x: {{x}}</div>
    <div>y: {{y}}</div>
    <hr>
    <div>{{count}} <button @click="add">累加1</button></div>
  </div>
</template>
<script>
import { ref, toRefs} from 'vue'
import { useMouse } from './hooks/useMouse'
export default {
  name: 'App',
  setup () {
	// 1.鼠标移动功能
    const mouse = useMouse()

    // 2. 数字累加功能
    const count = ref(0) 
    const add = () => {
      count.value ++
    }
    return { ...toRefs(mouse), count, add }
  }
}
</script>
```

**总结：** 体会组合API的写法，尝试组织可读性高的代码。

## 组合API-computed函数

> 目标：掌握使用computed函数定义计算属性

定义计算属性：

- computed函数，是用来定义计算属性的，计算属性不能修改。

### 基本使用：

```vue
<template>
  <div class="container">
    <div>今年：{{age}}岁</div>
    <div>后年：{{newAge}}岁</div>
  </div>
</template>
<script>
import { computed, ref } from 'vue'
export default {
  name: 'App',
  setup () {
    // 1. 计算属性：当你需要依赖现有的响应式数据，根据一定逻辑得到一个新的数据。
    const age = ref(16)
    // 得到后年的年龄
    const newAge = computed(()=>{
      // 该函数的返回值就是计算属性的值
      return age.value + 2
    })

    return {age, newAge}
  }
}
</script>
```

### 高级用法：

```vue
<template>
  <div class="container">
    <div>今年：{{age}}岁</div>
    <div>后年：{{newAge}}岁</div>
    <!-- 使用v-model绑定计算属性 -->
    <input type="text" v-model="newAge">
  </div>
</template>
<script>
import { computed, ref } from 'vue'
export default {
  name: 'App',
  setup () {
    // 1. 计算属性：当你需要依赖现有的响应式数据，根据一定逻辑得到一个新的数据。
    const age = ref(16)
    // 得到后年的年龄
    // const newAge = computed(()=>{
    //   // 该函数的返回值就是计算属性的值
    //   return age.value + 2
    // })

    // 计算属性高级用法，传入对象
    const newAge = computed({
      // get函数，获取计算属性的值
      get(){
        return age.value + 2
      },
      // set函数，当你给计算属性设置值的时候触发
      set (value) {
        age.value = value - 2
      }
    })


    return {age, newAge}
  }
}
</script>
```

目的：让计算属性支持双向数据绑定。

总结：计算属性两种用法

- 给computed传入函数，返回值就是计算属性的值
- 给computed传入对象，get获取计算属性的值，set监听计算属性改变。

## 组合API-watch函数

> 目标：掌握使用watch函数定义侦听器

定义计算属性：watch函数，是用来定义侦听器的

1. 参数一: 变量 | 数组 | 函数

   - 变量: 当前某个数据

   - 数组: 支持同时监听多个数据, 用数据包裹 

   - 函数: 对象的某一个属性 (必须有返回值, 返回当前这个属性)

2. 参数二: 处理函数

### 支持多种监听形式

```js
const user = reactive({
    name: 'zs',
    age: 20,
    car: {
        brand: '宝马',
        money: 100,
    }
})
```

1. **监听ref定义的简单响应式数据**

   ```js
   watch(name, (value, oldValue) => {
           console.log(value)
       }
   )
   ```

2. **监听多个响应式数据数据**

   参数: 数组 [数据1, 数据2]

   ```js
   watch(
       [name, age],
       (value, oldValue) => {
           console.log(value) // 返回的也是数组
       }
   )
   ```

3. **监听reactive定义的响应式数据**

   ```js
   watch(user,(value, oldValue) => {
           console.log(value)
       }
   )
   ```

4. **监听reactive定义的复杂响应式数据中的某一个属性**

   参数: 函数(**`必须有返回值, 返回当前数据`**)

   ```js
   watch(
       () => user.name,
       (value, oldValue) => {
           console.log(value)
       }
   )
   ```

5. **深度监听**

   **`注意:`** 当监听对象中的某一个属性, 而这个属性也是个复杂数据类型时, 是监听不到的

   **比如: ** uer中的car是监听不到的, 因为它不是reactive响应式, 所以需要使用深度监听

   第三个参数:  { deep: boolean, immediate: boolean }

   ```js
   watch(
       () => user.car,
       (value, oldValue) => {
           console.log(value)
       },
       { deep: true, immediate: true }
   )
   ```

默认执行

```js
<template>
  <div class="container">
    <div>
      <p>count的值：{{count}}</p>
      <button @click="add">改数据</button>
    </div>
    <hr>
    <div>
      <p>{{obj.name}}</p>
      <p>{{obj.age}}</p>
      <p>{{obj.brand.name}}</p>
      <button @click="updateName">改名字</button>
      <button @click="updateBrandName">改品牌名字</button>
    </div>
  </div>
</template>
<script>
import { reactive, ref, watch } from 'vue'
export default {
  name: 'App',
  setup () {
    const count = ref(0)
    const add = () => {
      count.value++
    }
    // 当你需要监听数据的变化就可以使用watch
    // 1. 监听一个ref数据
    // 1.1 第一个参数  需要监听的目标
    // 1.2 第二个参数  改变后触发的函数
    // watch(count, (newVal,oldVal)=>{
    //   console.log(newVal,oldVal)
    // })


    const obj = reactive({
      name: 'ls',
      age: 10,
      brand: {
        id: 1,
        name: '宝马'
      }
    })
    const updateName = () => {
      obj.name = 'zs'
    }
    const updateBrandName = () => {
      obj.brand.name = '奔驰'
    }
    // 2. 监听一个reactive数据
    watch(obj, ()=>{
      console.log('数据改变了')
    })

    watch(()=>obj.brand, ()=>{
      console.log('brand数据改变了')
    },{
      // 5. 需要深度监听
      deep: true,
      // 6. 想默认触发
      immediate: true
    })

    // 3. 监听多个数据的变化
    // watch([count, obj], ()=>{
    //   console.log('监听多个数据改变了')
    // }) 


    // 4. 此时监听对象中某一个属性的变化 例如：obj.name 
    // 需要写成函数返回该属性的方式才能监听到
    // watch(()=>obj.name,()=>{
    //   console.log('监听obj.name改变了')
    // })

    return {count, add, obj, updateName, updateBrandName}
  }
}
</script>
```

**总结：** 掌握watch的各种用法。

## 组合API-ref 属性

> 目标：掌握使用ref属性绑定DOM或组件

获取DOM或者组件实例可以使用ref属性，写法和vue2.0需要区分开

获取单个DOM或者组件

```vue
<template>
  <div class="container">
    <!-- 单个元素 -->
    <div ref="dom">我是box</div>
    <!-- 被遍历的元素 -->
    <ul>
      <li v-for="i in 4" :key="i" :ref="setDom">第{{i}}LI</li>
    </ul>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue'
export default {
  name: 'App',
  setup () {
    // 1. 获取单个元素
    // 1.1 先定义一个空的响应式数据ref定义的
    // 1.2 setup中返回该数据，你想获取那个dom元素，在该元素上使用ref属性绑定该数据即可。
    const dom = ref(null)
    onMounted(()=>{
       console.log(dom.value)
    })
    return {
        dom
    }
  }
}
</script>
```

获取v-for遍历的DOM或者组件

```js
// 2. 获取v-for遍历的元素
// 2.1 定义一个空数组，接收所有的LI
// 2.2 定义一个函数，往空数组push DOM
const domList = []
const setDom = (el) => {
    domList.push(el)
}
onMounted(()=>{
    console.log(domList)
})
return {dom, setDom}
```

**总结：**

- 单个元素：先申明ref响应式数据，返回给模版使用，通过ref绑定数据
- 遍历的元素：先定义一个空数组，定一个函数获取元素，返回给模版使用，通过ref绑定这个函数

### getCurrentInstance

> 获取当前组件的实例
>
> 可以通过当前实例, 获取子组件传递暴露出来的数据

getCurrentInstance 配合 defineExpose 获取子组件暴露了出的数据

```vue
// 子组件 Son
<script setup>
const a = 1
defineExpose({a})
</script>
```

```vue
<template>
<Son ref="son" />
</template>

<script setup>
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
console.log(instance.refs.son) // { a: 1 }
    
</script>
```



## vue中废弃了过滤器

> vue3.0中不能使用过滤器，直接使用函数进行替代

```js
<template>
  <h1>ref的使用</h1>
  <h3>我是一个h3的内容 {{ formatTime(now) }}</h3>
  <h3>{{ formatTime(other) }}</h3>
  <hr />
</template>

<script>
import moment from 'moment'
export default {
  setup() {
    // 过滤器
    const now = new Date()
    const other = new Date('2020-11-12 12:00:00')
    const formatTime = (value) => {
      return moment(value).format('YYYY-MM-DD')
    }
    return {
      now,
      formatTime,
      other,
    }
  },
}
</script>
```



## 组合API-父子通讯

> 目标：掌握使用props选项和emits选项完成父子组件通讯

父传子：

> 子组件接收: setup第一个参数: props 用以接收父组件数据。使用时 直接 props.value

```vue
<template>
  <div class="container">
    <h1>父组件</h1>
    <p>{{money}}</p>
    <hr>
    <Son :money="money" />
  </div>
</template>
<script>
import { ref } from 'vue'
import Son from './Son.vue'
export default {
  name: 'App',
  components: {
    Son
  },
  // 父组件的数据传递给子组件
  setup () {
    const money = ref(100)
    return { money }
  }
}
</script>



<template>
  <div class="container">
    <h1>子组件</h1>
    <p>{{money}}</p>
  </div>
</template>
<script>
import { onMounted } from 'vue'
export default {
  name: 'Son',
  // 子组件接收父组件数据使用props即可
  props: {
    money: {
      type: Number,
      default: 0
    }
  },
  setup (props) {
    // 获取父组件数据money
    console.log(props.money)
  }
}
</script>
```

子传父：

> 子组件注册事件: 
>
> 1. setup第二个参数: context, 里面包含一个emit方法: **setup(props, { emit }) { }**
> 2. 建议使用emits选项来定义组件可触发的事件: **emits: ['onChange', 'onHandler']**

```vue
<template>
  <div class="container">
    <h1>父组件</h1>
    <p>{{money}}</p>
    <hr>
+    <Son :money="money" @change-money="updateMoney" />
  </div>
</template>
<script>
import { ref } from 'vue'
import Son from './Son.vue'
export default {
  name: 'App',
  components: {
    Son
  },
  // 父组件的数据传递给子组件
  setup () {
    const money = ref(100)
+    const updateMoney = (newMoney) => {
+      money.value = newMoney
+    }
+    return { money , updateMoney}
  }
}
</script>


<template>
  <div class="container">
    <h1>子组件</h1>
    <p>{{money}}</p>
+    <button @click="changeMoney">花50元</button>
  </div>
</template>
<script>
import { onMounted } from 'vue'
export default {
  name: 'Son',
  // 子组件接收父组件数据使用props即可
  props: {
    money: {
      type: Number,
      default: 0
    }
  },
  // 建议使用emits选项来定义组件可触发的事件
+ emits: ['change-money'],
  // props 父组件数据
  // emit 触发自定义事件的函数
+  setup (props, {emit}) {
    // 获取父组件数据money
    console.log(props.money)
    // 向父组件传值
+    const changeMoney = () => {
      // 消费50元
      // 通知父组件，money需要变成50
+      emit('change-money', 50)
+    }
+    return { changeMoney }
  }
}
</script>
```

扩展：

- 在vue2.x的时候 `.sync` 除去v-model实现双向数据绑定的另一种方式

```vue
<!-- <Son :money='money' @update:money="fn"  /> -->
<Son :money.sync='money'  />
```

- 在vue3.0的时候，使用 `v-model:money="money"` 即可

```vue
    <!-- <Son :money="money" @update:money="updateMoney" /> -->
    <Son v-model:money="money" />
```

**总结：**

- 父传子：在setup种使用props数据 `setup(props){ // props就是父组件数据 }`
- 子传父：触发自定义事件的时候emit来自 `setup(props,{emit}){ // emit 就是触发事件函数 }`
- 在vue3.0中 `v-model` 和 `.sync` 已经合并成 `v-model` 指令
- 如果注册的事件名和原生事件名重复, 需要使用emit: ['事件名'], 去覆盖原生事件, 避免出现事件触发两次的bug.

## **setup 第二个参数 context**

> 传递给 `setup` 函数的第二个参数是 `context`。`context` 是一个普通 JavaScript 对象，暴露了其它可能在 `setup` 中有用的值：

```js
// MyBook.vue

export default {
  setup(props, context) {
    // Attribute (非响应式对象，等同于 $attrs)
    console.log(context.attrs)

    // 插槽 (非响应式对象，等同于 $slots)
    console.log(context.slots)

    // 触发事件 (方法，等同于 $emit)
    console.log(context.emit)

    // 暴露公共 property (函数)
    console.log(context.expose)
  }
}
```

## v-model语法糖

> 目标：掌握vue3.0的[v-model语法糖原理](https://v3.cn.vuejs.org/guide/migration/v-model.html#v-model-%E5%8F%82%E6%95%B0)

### 基本原理

1. 数据 → 视图:  使用 v-bind 传值给组件

   ```js
   <input :msg="msg">
   ```

2. 视图 → 数据: 使用 v-on 给组件注册事件, 修改数据

   ```js
   <input :msg="msg" @change="msg = $event">
   ```

3. 上述两个步骤可以直接简写为 v-model

   ```js
   <input v-model="msg">
   ```

### vue2 .sync修饰符语法糖解析

.sync就是父子组件间的 v-model

原理和上面一样, 只是数据的交互变成了父子间通讯

1. 父传子:  使用 v-bind 传递数据

   ```js
   <Son :msg="msg">
   ```

2. 子传父: 使用 this.$emit 触发修改事件

   ```js
   // 子组件触发
   <div :msg="msg" @change="change">
   props: {
       msg: {
           type: String,
           default: ''
       }
   }
   methdos: {
       // 比如修改父组件的msg数据
       change() {
           this.$emit('onChange', 'haha')
       }
   }
   
   // 父组件注册 修改
   <Son :msg="msg" @onChange="onChange" />
   methdos: {
       // 比如修改父组件的msg数据
       onChange(value) {
       	this.msg = value
       }
   }
   ```

3. 上述两个步骤可以使用 .sync修饰符 进行简化

   - 子组件 必须注册叫 **`update:属性名`** 的函数

     ```js
     // 子组件触发
     methdos: {
         // 比如修改父组件的msg数据
         change() {
             this.$emit('update:msg', 'haha')
         }
     }
     ```

   - 父组件 可将 v-bind 和 v-on 直接合并成 **`属性名.snyc`** 的写法

     ```js
     <Son :msg.sync="msg" />
     ```

在vue2.0中v-mode语法糖简写的代码 `<Son :value="msg" @input="msg=$event" />`

在vue3.0中v-model语法糖有所调整：`<Son :modelValue="msg" @update:modelValue="msg=$event" />`

1. 演示代码：

```vue
<template>
  <div class="container">
    <!-- 如果你想获取原生事件事件对象 -->
    <!-- 如果绑定事函数 fn fn(e){ // e 就是事件对象 } -->
    <!-- 如果绑定的是js表达式  此时提供一个默认的变量 $event -->
    <h1 @click="$event.target.style.color='red'">父组件 {{count}}</h1>
    <hr>
    <!-- 如果你想获取自定义事件  -->
    <!-- 如果绑定事函数 fn fn(data){ // data 触发自定义事件的传参 } -->
    <!-- 如果绑定的是js表达式  此时 $event代表触发自定义事件的传参 -->
    <!-- <Son :modelValue="count" @update:modelValue="count=$event" /> -->
    <Son v-model="count" />
  </div>
</template>
<script>
import { ref } from 'vue'
import Son from './Son.vue'
export default {
  name: 'App',
  components: {
    Son
  },
  setup () {
    const count = ref(10)
    return { count }
  }
}
</script>
<template>
  <div class="container">
    <h2>子组件 {{modelValue}} <button @click="fn">改变数据</button></h2>
  </div>
</template>
<script>
export default {
  name: 'Son',
  props: {
    modelValue: {
      type: Number,
      default: 0
    }
  },
  setup (props, {emit}) {
    const fn = () => {
      // 改变数据
      emit('update:modelValue', 100)
    }
    return { fn }
  }
}
</script>
```

**总结：** vue3.0的v-model对vue2中的v-model和 .sync进行了合并

1. **直接使用 v-model**

```js
#注意:
# 1.子组件接收的参数 默认就叫 modelValue
# 2. 只能使用一次

// 父组件
<Son v-model="msg" />
// 等价于
<Son :modelValue="count" @update:modelValue="count=$event" />
    
// 子组件
props: {
    modelValue: String, // 默认就叫 modelValue
}

```

2. **使用 v-model:XXX**

```js
# 1.子组件接收的参数 属性名叫 xxx
# 2.可以使用多次

// 父组件
<Son v-model:title="pageTitle" v-model:content="pageContent" />
// 是以下的简写
<Son
  :title="pageTitle"
  @update:title="pageTitle = $event"
  :content="pageContent"
  @update:content="pageContent = $event"
/>
      
// 子组件
// 此时可以接收多个xxx属性
props: {
    title: String,
    content: String,  
}
```



## 组合API-依赖注入

> 作用: 跨级通讯
>
> 目标：掌握使用provide函数和inject函数完成后代组件数据通讯

使用场景：有一个父组件，里头有子组件，有孙组件，有很多后代组件，共享父组件数据。

演示代码：

```vue
<template>
  <div class="container">
    <h1>父组件 {{money}} <button @click="money=1000">发钱</button></h1>
    <hr>
    <Son />
  </div>
</template>
<script>
import { provide, ref } from 'vue'
import Son from './Son.vue'
export default {
  name: 'App',
  components: {
    Son
  },
  setup () {
    const money = ref(100)
    const changeMoney = (saleMoney) => {
      console.log('changeMoney',saleMoney)
      money.value = money.value - saleMoney
    }
    // 将数据提供给后代组件 provide
    provide('money', money)
    // 将函数提供给后代组件 provide
    provide('changeMoney', changeMoney)

    return { money }
  }
}
</script>
<style scoped lang="less"></style>
<template>
  <div class="container">
    <h2>子组件 {{money}}</h2>
    <hr>
    <GrandSon />
  </div>
</template>
<script>
import { inject } from 'vue'
import GrandSon from './GrandSon.vue'
export default {
  name: 'Son',
  components: {
    GrandSon
  },
  setup () {
    // 接收祖先组件提供的数据
    const money = inject('money')
    return { money }
  }
}
</script>
<style scoped lang="less"></style>
<template>
  <div class="container">
    <h3>孙组件 {{money}} <button @click="fn">消费20</button></h3>
  </div>
</template>
<script>
import { inject } from 'vue'
export default {
  name: 'GrandSon',
  setup () {
    const money = inject('money')
    // 孙组件，消费50，通知父组件App.vue组件，进行修改
    // 不能自己修改数据，遵循单选数据流原则，大白话：数据谁定义谁修改
    const changeMoney = inject('changeMoney')
    const fn = () => {
      changeMoney(20)
    }
    return {money, fn}
  }
}
</script>
<style scoped lang="less"></style>
```

**总结：**

- provide函数可以提供**数据或函数**给后代组件使用

  ```js
  // 父组件
  import { provide } from 'vue'
  setup() {
      // 数据
      provide('money', money)
      // 函数
      provide('changeMoney', changeMoney)
      return {
          money,
          changeMoney
      }
  }
  ```

- inject函数给当前组件注入provide提供的数据和函数

  ```js
  // 孙子组件
  import { inject } from 'vue'
  
  setup() {
      // 接收数据
      const money = inject('money', money)
      // 接收函数
      const changeMoney = inject('changeMoney', changeMoney)
      return {
          money,
          changeMoney
      }
  }
  ```

  

## [ \<script setup>语法糖](https://v3.cn.vuejs.org/api/sfc-script-setup.html#%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6-script-setup)

里面的代码会被编译成组件 `setup()` 函数的内容

### 模板中使用数据

> 任何在 `<script setup>` 声明的顶层的绑定 (包括变量，函数声明，以及 import 引入的内容) 都能在模板中直接使用
>
> 包括 import 导入的方法, 无需通过 methods 选项来暴露, 直接可以在模板中使用

### 响应式数据

> 在使用 ref 等 响应式API 创建后, 无需 return, 便可直接在模板中使用
>
> 在 script中 使用简单类型 还是需要 .value属性

### 组件

1. 使用组件

   > 导入后 直接使用, 无需再进行注册

2. 动态组件

   > 使用动态组件的时候，应该使用动态的 `:is` 来绑定。
>
   > **`markRaw`:** 标记一个对象，使其永远不会转换为 proxy。返回对象本身。即退出默认的深度响应式/只读转换模式。（有些值无需响应式，比如第三方实例或vue组件，跳过proxy可以提高性能）。

   ```vue
   <script setup>
   import Foo from './Foo.vue'
   import Bar from './Bar.vue'
   import { reactive, markRow } from 'vue'
   const compoents = reactive([
       { name: 'Foo', com: markRow(Foo) },
       { name: 'Bar', com: markRow(Bar) },
   ]) 
   </script>
   
   <template>
     <component :is="compoents.name" />
     <component :is="someCondition ? Foo : Bar" />
   </template>
   ```

### 异步组件

某些组件需要等到请求回来时才渲染。

- 顶层await

  **引入的async函数，可以直接使用await**，无需再包一层async。

  ```vue
  <script setup>
  import { fetch } from 'untils/http'
  const post = await fetch(`/api/post/1`) // 直接使用await
  </script>
  ```

- 代码分包

  执行 **npm run build**, 会生成**dist**目录，存放打包后的代码。

  ```json
  // dist/assets
  index.hash.js // 源码 （当业务逻辑很多时，这个文件会非常大）
  index.hash.css // 样式
  vendor.hash.js // 依赖
  index.chunkId.js // ☆☆☆ 如果有异步组件，会单独打包，按需加载
  ```

- suspense

  ```vue
  <template>
  	<!--必须配合使用 Suspense -->
  	<Suspense>
          <template #default>
              <!-- 当异步组件加载时，会替换掉下面的fallback组件 -->
              <Content/>
  		</template>
  		<template #fallback>
  			<!-- 可以在这里加 Loading 优化组件 -->
  		</template>
      </Suspense>
  </template>
  
  <script setup>
  // 使用defineAsyncComponent加载异步组件
  import { defineAsyncComponent } from 'vue'
  const Content = defineAsyncComponent(() => import('../components/Content.vue'))
  </script>
  ```

  

### 自定义指令

1. 必须以 `v`开头, 比如: **`vMyDirective`**

2. 导入的指令同样能够工作，并且能够通过重命名来使其符合命名规范

   ```html
   <script setup>
     import { myDirective as vMyDirective } from './MyDirective.js'
   </script>
   ```

   

### defineProps 和 defineEmits

这两个方法不需要导入,  都是只在 \<script setup> 中才能使用的编译器宏

```vue
<script setup>
const props = defineProps({
  foo: String
})

const emit = defineEmits(['change', 'delete'])
emit('change', '发送给父组件的信息')
emit('delete', '发送给父组件的信息')
</script>
```

### defineExpose

> 让父组件可以通过ref拿到子组件暴露出的值

```vue
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

defineExpose({ a, b })
</script>
```

## TS与vue

> 参考链接：https://vuejs.org/guide/typescript/composition-api.html
>
> vue3配合ts中，需要安装两个vscode插件：
>
> Typescript Vue Plugin
>
> Vue Language Features(Volar)

### defineProps、defineEmits 和 Typescript

- 正常操作 配合vue默认语法进行类型校验（运行时声明）

  ```ts
  // 运行时声明
  defineProps({
    money: {
      type: Number,
      required: true
    },
    car: {
      type: String,
      required: true
    }
  })
  ```

- 仅限类型的 props/emit 声明, 通过 传递字面量类型的纯类型语法 作为参数

  ```ts
  // 可以直接传递泛型
  const props = defineProps<{
    foo: string
    bar?: number
  }>()
  
  const emit = defineEmits<{
    (e: 'change', id: number): void
    (e: 'update', value: string): void
  }>()
  ```

- 使用类型声明时的默认 props 值

  上述方式不足之处在于: 没有可以给 props 提供默认值的方式, 

  可以使用 `withDefaults` 编译器宏 解决这个问题:

  ```ts
  interface Props {
    msg?: string
    labels?: string[]
  }
  
  const props = withDefaults(defineProps<Props>(), {
    msg: 'hello',
    labels: () => ['one', 'two']
  })
  ```

  也可以通过解构来指定默认值

  ```ts
  <script lang="ts" setup>
  // 使用ts的泛型指令props类型
  const { money, car = '小黄车' } = defineProps<{
    money: number
    car?: string
  }>()
  </script>
  ```

  如果提供的默认值需要在模板中渲染，需要额外添加配置

  https://vuejs.org/guide/extras/reactivity-transform.html#explicit-opt-in

  ```js
  // vite.config.js
  export default {
    plugins: [
      vue({
        reactivityTransform: true
      })
    ]
  }
  ```

### ref与Typescript

1. 通过泛型指定value的值类型，如果是简单值，该类型可以省略

```ts
const money = ref<number>(10)

const money = ref(10)

// 或者导入Ref
import { Ref } from ‘Vue’
const money: Ref<number>= ref(10)
```

2. 如果是复杂类型，推荐指定泛型

```ts
type Todo = {
  id: number
  name: string
  done: boolean
}
const list = ref<Todo[]>([])

setTimeout(() => {
  list.value = [
    { id: 1, name: '吃饭', done: false },
    { id: 2, name: '睡觉', done: true }
  ]
})
```

### computed与Typescript

> 目标：掌握computed配合typescript如何使用

1. 通过泛型可以指定computed计算属性的类型，通常可以省略

```ts
const leftCount = computed<number>(() => {
  return list.value.filter((item) => item.done).length
})
console.log(leftCount.value)
```

### 事件处理与Typescript

> 目标：掌握事件处理函数配合typescript如何使用

```ts
const move = (e: MouseEvent) => {
  mouse.value.x = e.pageX
  mouse.value.y = e.pageY
}

<h1 @mousemove="move($event)">根组件</h1>
```

### Template Ref与Typescript

> 目标：掌握ref操作DOM时如何配合Typescript使用

```ts
const imgRef = ref<HTMLImageElement | null>(null)

onMounted(() => {
  console.log(imgRef.value?.src)
})
```

如何查看一个DOM对象的类型：通过控制台进行查看

```
document.createElement('img').__proto__
```

### [TSX](https://mp.weixin.qq.com/s/db8CfVD5CwCP9nBCIe0alA)

#### 配置

- 安装 npm i @vitejs/plugin-vue-jsx -D

- 配置 vite.config.ts

  ```json
  import { defineConfig } from 'vite'
  import vue from '@vitejs/plugin-vue'
  import vueJsx from '@vitejs/plugin-vue-jsx';
  // https://vitejs.dev/config/
  export default defineConfig({
    plugins: [vue(),vueJsx()]
  })
  ```

- tsconfig.json 配置

  ```js
  "jsx": "preserve",
  "jsxFactory": "h",
  "jsxFragmentFactory": "Fragment",
  ```

#### 使用

- TSX支持两种元素: **内置元素** 和 **用户定义元素**。内在元素的名称全为**小写形式**, 表示原生元素, 基于值的元素使用 **PascalCased 形式命名**。

- 多个组件动态配合使用的, 一般都是使用 render 函数 进行封装的, 比如 element 中的 tabs

  ```tsx
  <el-tabs>
      <el-tab-pane></el-tab-pane>
      <el-tab-pane></el-tab-pane>
  </el-tabs>
  ```

- .vue中使用

  > defineComponent 就类型而言，返回的值有一个合成类型的构造函数，用于手动渲染函数、TSX 和 IDE 工具支持。

  Options API 

  ```tsx
  
  import { defineComponent } from 'Vue'
  
  export default defineComponent({
      data() {
          return {}
      },
  	render() {
          return <div>123</div>
  	}
  })
  ```

  Component API 

  ```vue
  <script>
  import { defineComponent } from 'Vue'
  
  export default defineComponent({
  	setup() {
          return () => <div>123</div>
      }
  })
  </script>
  ```


- .tsx中使用

  ```tsx
  const arr = [1, 2, 3]
  const clickTap = () => {
      console.log('123')
  }
  const renderDom = (props, ctx) => {
      return (
          <>
              <h3>{props.data.title}</h3>
              { arr.map(item => <div>{item}</div>)}
          </>
      )
  }
  export default renderDom
  ```

#### 指令支持

支持：v-show、v-bind(直接赋值)、v-on(只有原生DOM事件，参照react，比如：onClick )、

不支持：v-if、v-for

#### 常用语法

- class样式(class、className都可以识别成类名)

  ```tsx
  <div class="container"></div>
  <div className="container"></div>
  ```

  style样式

  ```tsx
  // 传递对象（驼峰命名）
  <li style={{ listStyleType: 'none' }}></li>
  ```

- 条件渲染: 支持`if/else`或`三元运算符`或`逻辑与(&&)运算符`

- 循环渲染（替代v-for）

  ```tsx
  const dances = ['初升的太阳', '舞动青春', '时代在召唤']
  const components = (
    <ul>
      {dances.map(d => <li>{d}</li>)}
    </ul>
  )
  ```

- 注册事件

  - 写法：所有事件有on开头，所有事件名称首字母大写

  ```tsx
  <button onClick={clickTap}>点击</button>
  <button onMouseEnter={mouseEnter}>鼠标</button>
  ```

  - 传递参数：事件处理函数中，this会丢失，指向undefined。

  ```tsx
  // 方式一：
  <button onClick={() => {this.handleClick()}}>点我</button>
  
  // 方式二：
  <button onClick={this.handleClick.bind(this)}>点我</button>
  
  // 传递参数
  <button onClick={this.handleClick.bind(this, data)}>点我</button>
  ```

- 通讯

  props: 单项数据流对象

  ```js
  // 包含以下信息（如果有）
  {
      // 组件类名
      class: "demo"
      // 传递的数据都放在data对象中
      data: {label: '呵呵', value: 3}
      // 注册的事件
      onClick: ƒ ()
      onMouseEnter: ƒ ()
      // 样式
      style: {listStyleType: 'none'}
  }
  ```

  ctx: [上下文](https://v3.cn.vuejs.org/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6)

  ```tsx
  // 包含attrs / emit / slots三个属性，它们分别相当于实例的 $attrs、$emit 和 $slots 这几个 property。
  {
      //和props一样
      attrs: {
          class: "demo",
  		data: {label: '呵呵', value: 3},
          getMsg: msg => { console.log('接收到子组件数据', msg); },
          onClick: ƒ (),
          style: {listStyleType: 'none'},
      },
      // emit派发
      emit: ƒ (),
      // 插槽
      slots: {__vInternal: 1, default: ƒ},
  }
  ```

  父传子：直接添加属性(替代v-bind)

  ```tsx
  // 父组件
  <Son value={data.value}></Son>
  
  // 子组件 通过props取值
  const renderDom = (props: any) => {
    return (
      <li className="demo" >
      	{ props.data.label }
    	</li>
    )
  }
  ```

  子传父

  // 父子组件都是.tsx

  ```tsx
  // 父组件传递方法
  const getChildMsg = (msg) => {
      console.log(msg)
  }
  <Son getMsg={getChildMsg}></Son>
  
  // 方式一：子组件接收并调用
  const handleClick = (props, msg) => {
      // 调用父组件传递过来的方法
      props.getMsg(msg)
  }
  const renderDom = (props: any) => {
  	return (
  		<li onClick={handleClick.bind(this, 'message')}>{ props.data.label }</li>
  	)
  }
  ```

  // 父组件是.vue

  ```tsx
  // 父组件注册
  <template>
  	<Son @onMsg="onMsg"></Son>
  </template>
  
  // 子组件也可以通过ctx.emit派发
  const handleClick = (ctx, data) => {
      ctx.emit('on-msg', data) // 父组件 @on-msg 注册自定义事件，获取数据
  }
  const renderDom = (props, ctx) => {
  	return (
  		<li onClick={handleClick.bind(this, ctx, '111')}>{ props.data.label }</li>
  	)
  }
  ```

  

## 好用的插件

- [unplugin-auto-import/vite](https://www.npmjs.com/package/unplugin-auto-import)

  > 使用ref reactive watch 等 无须import 导入 可以直接使用 

  vite 配置：

  ```json
  import AutoImport from 'unplugin-auto-import/vite'
  // https://vitejs.dev/config/
  export default defineConfig({
    plugins: [
        AutoImport({
      	imports:['vue'],
      	dts:"src/auto-import.d.ts",        
  	  })
    ],
  })
  ```

  



# vue-router4

> vue升级vue3之后，配套的vue-router也升级为vue-router@4.x版本  
>
> vue-router4的语法和3的版本语法基本一致，但是有一些细微的修改。

vue-router官网：https://router.vuejs.org/

```
vue@2 + vue-router@3 + vuex@3   options api

vue@3 + vue-router@4 + vuex@4    composition api
```

## 基本使用

安装vue-router

```bash
yarn add vue-router
```

创建组件Home.vue和Login.vue

创建文件`router/index.js`

```js
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'

// 1. 创建路由
const router = createRouter({
  // 创建history模式的路由
  // history: createWebHistory(),
  // 创建hash模式的路由
  history: createWebHashHistory(),
  // 配置路由规则
  routes: [
    { path: '/home', component: () => import('../pages/Home.vue') },
    { path: '/login', component: () => import('../pages/Login.vue') },
  ],
})

export default router

```

在main.js中引入

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')

```

App.vue中使用

```vue
<template>
  <ul>
    <li>
      <router-link to="/home">首页</router-link>
    </li>
    <li>
      <router-link to="/login">登陆</router-link>
    </li>
  </ul>

  <!-- 路由出口 -->
  <router-view></router-view>
</template>


```

## 组件中使用route与router

> 由于组件中无法访问this,因为无法访问 this.\$route 与 this.$router

（1）通过useRoute()可以获取route信息

```js
<script>
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    console.log(route.path)
    console.log(route.fullPath)
  },
}
</script>
```

（2）通过useRouter()可以获取router信息

```js
<script>
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const login = () => {
      router.push('/home')
    }
    return {
      login,
    }
  },
}
</script>
```

# vuex4

## 基本使用

1. 安装依赖包

```
yarn add vuex
```

2. 创建文件 store/index.js

```js
import { createStore } from 'vuex'

const store = createStore({
  state: {
    money: 100,
  },
  mutations: {
    changeMoney(state) {
      state.money += 10
    },
  },
  actions: {
    changeMoneyAsync(context) {
      setTimeout(() => {
        context.commit('changeMoney')
      }, 1000)
    },
  },
  getters: {
    double(state) {
      return state.money * 2
    },
  },
})

export default store

```

3. 在main.js中关联store

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
const app = createApp(App)

app.use(router)
app.use(store)
app.mount('#app')

```

## 在组件中使用vuex

```js
const store = useStore()

const money = computed(() => store.state.money)
const double = computed(() => store.getters.double)


// mapState  mapMutations mapActions mapGetters  需要配合options api才能使用
```

### 状态支持化插件 vuex-persistedstate

```js
export default createStore({
  plugins: [
    createPersistedState({
      // 指定需要缓存的模块
      paths: ['user', 'cart'],
      key: 'hahaha',
      // 默认就是localStorage
      storage: localStorage
    })
  ]  
})
```

**总结：vuex4 在vue3项目中能用，但是不好用**

# [Pinia](https://juejin.cn/post/7078281612013764616?share_token=6a6cdc8f-3b64-435b-830d-e938b1fca563)

![image-20220213181825857](https://pinia.vuejs.org/logo.svg)

## 基本介绍

> Pinia 是 Vue.js 的轻量级状态管理库

官方网站：https://pinia.vuejs.org/

为什么学习pinia?  

+ pinia和vuex4一样，也是vue官方的状态管理工具(作者是 Vue 核心团队成员）
+ pinia相比vuex4，对于vue3的兼容性更好
+ pinia相比vuex4，具备完善的类型推荐
+ pinia同样支持vue开发者工具,最新的开发者工具对vuex4支持不好
+ **Pinia** 的 API 设计非常接近 `Vuex 5` 的[提案](https://link.segmentfault.com/?enc=bzgtx6D37f7ZjuOSGfXM2g%3D%3D.Anbb%2BsTaBijhbf0botKHz0NRal7UrociDtXE3qxoLjZTZb9eHUphdj1aeU96KLV8IczFvQ74HSuMxmKZ6I3R5acIrZrKY8I4FBi6G%2Bufe10A%2FkNDziBeRY8hkZ1bnN8x)。

pinia核心概念

+ state: 状态
+ actions: 修改状态（包括同步和异步，pinia中没有mutations）
+ getters: 计算属性

快速使用

```bash
yarn add pinia
# or
npm i pinia -S
```

## state

> 目标：掌握pinia的使用步骤

1. 在main.js中挂载pinia


```js
import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'
const pinia = createPinia()

createApp(App).use(pinia).mount('#app')
```

2. 新建文件store/counter.js

```js
import { defineStore } from 'pinia'
// 创建store,命名规则： useXxxxStore
// 参数1：store的唯一标识
// 参数2：对象，可以提供state actions getters
const useCounterStore = defineStore('counter', {
  state: () => {
    return {
      count: 0,
      age: 18
    }
  },
  getters: {
   
  },
  actions: {
    
  },
})

export default useCounterStore
```

3. 在组件中使用

```vue
<script setup>
import useCounterStore from './store/counter'

const counter = useCounterStore()
</script>

<template>
  <h1>根组件---{{ counter.count }}</h1>
</template>

<style></style>
```

4. 修改state

```ts
import { useDemoStore } from './store'
const Demo = useDemoStore()

// 1. 允许直接修改
const Add = () => {
    Demo.current++
}

// 2. 批量修改（对象形式）
const Add = () => {
    Demo.$patch({
       count:200,
       age:300
    })
}

// 3. 批量修改（函数形式）
const Add = () => {
    Demo.$patch((state) => {
       state.current++;
       state.age = 40
    })
}

// 4.替换整个state
const Add = () => {
    Demo.$state = {
       current:10,
       age:30
    }    
}

// 5.使用actions（详见下方actions的使用）
```

## actions

> 目标：掌握pinia中actions的使用

在pinia中没有mutations，只有actions，不管是同步还是异步的代码，都可以在actions中完成。

（1）在actions中提供方法并且修改数据

```ts
import { defineStore } from 'pinia'
// 1. 创建store
// 参数1：store的唯一表示
// 参数2：对象，可以提供state actions getters
const useCounterStore = defineStore('counter', {
  state: () => {
    return {
      count: 0,
    }
  },
  actions: {
    increment(payload: number) {
        if(payload) {
            this.count = payload;
        } else {
            this.count++   
        }
    },
    incrementAsync() {
      setTimeout(() => {
        this.count++
      }, 1000)
    },
  },
})

export default useCounterStore
```

（2）在组件中使用

```vue
<script setup>
import useCounterStore from './store/counter'

const counter = useCounterStore()
</script>

<template>
  <h1>根组件---{{ counter.count }}</h1>
  <button @click="counter.increment">加1</button>
  <button @click="counter.increment(100)">改成100</button>
  <button @click="counter.incrementAsync">异步加1</button>
</template>
```

## getters

> pinia中的getters和vuex中的基本是一样的，也带有缓存的功能

（1）在getters中提供计算属性

```js
import { defineStore } from 'pinia'
// 1. 创建store
// 参数1：store的唯一表示
// 参数2：对象，可以提供state actions getters
const useCounterStore = defineStore('counter', {
  state: () => {
    return {
      count: 0,
    }
  },
  getters: {
    double() {
      return this.count * 2
    },
  },
  actions: {
    increment() {
      this.count++
    },
    incrementAsync() {
      setTimeout(() => {
        this.count++
      }, 1000)
    },
  },
})

export default useCounterStore

```

(2)在组件中使用

```vue
  <h1>根组件---{{ counter.count }}</h1>
  <h3>{{ counter.double }}</h3>
```

## storeToRefs

> 目标：掌握storeToRefs的使用

如果直接从pinia中解构数据，会丢失响应式， 使用storeToRefs可以保证解构出来的数据也是响应式的

```js
<script setup>
import { storeToRefs } from 'pinia'
import useCounterStore from './store/counter'

const counter = useCounterStore()
// 如果直接从pinia中解构数据，会丢失响应式
const { count, double } = counter

// 使用storeToRefs可以保证解构出来的数据也是响应式的
const { count, double } = storeToRefs(counter)
</script>
```

## modules 

> 在复杂项目中，不能把多个模块的数据都定义到一个store中，一般来说会一个模块对应一个store，最后通过一个根store进行整合

（1）新建store/user.js文件

```js
import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
  state: () => {
    return {
      name: 'zs',
      age: 100,
    }
  },
})

export default useUserStore

```

(2)新建store/index.js

```js
import useUserStore from './user'
import useCounterStore from './counter'

// 统一导出useStore方法
export default function useStore() {
  return {
    user: useUserStore(),
    counter: useCounterStore(),
  }
}

```

（3）在组件中使用

```js
<script setup>
import { storeToRefs } from 'pinia'
import useStore from './store'
const { counter } = useStore()

// 使用storeToRefs可以保证解构出来的数据也是响应式的
const { count, double } = storeToRefs(counter)
</script>

```

## 持久化插件

[pinia-plugin-persistedstate](https://www.npmjs.com/package/pinia-plugin-persistedstate)

1. main.ts中导入

```ts
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
```

2. 通过`persist`开启自动持久化插件

```ts
export const useStore = defineStore('main', {
  persist: true,
  state: () => {
    return {
      someState: 'hello pinia',
    }
  },
})
```

3. 也可以自定义持久化选项

```ts
import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  id: 'test',
  state: () => {
    return {
      someState: 'hello pinia',
      nested: {
        data: 'nested pinia',
      },
    }
  },
  persist: {
    // 要在存储中使用的密钥（默认为当前存储id）。
    key: 'store-key',
    // 存储持久化状态的对象。必须有getItem和setItem方法（默认为localStorage）。
    storage: window.sessionStorage,
    // 需要持久化的数据，为[]表示不保存任何状态
    paths: ['nested.data'],
    // 在从本地存储恢复状态之前执行钩子（如果已设置）。
    beforeRestore: context => {
      console.log('Before hydration...')
    },
	// 从本地存储恢复状态后执行钩子（如果已设置）。
    afterRestore: context => {
      console.log('After hydration...')
    },
    // 存取方式
    serializer: {
        // 存储方式（默认JSON.stringify）
        serialize: (state) => string,
        // 解析方式（默认JSON.parse）
        deserialize: (string) => state,
    }
  },
})
```



# vite

推荐文章：

[Vite 的安装和基本使用](https://juejin.cn/post/7060097097046949924)

[学习vue3](https://blog.csdn.net/qq1195566313/category_11618172.html)

## 快速搭建

1. 搭建项目

```bash
npm create vite@latest project-name --template vue-ts
```

- 通过附加的命令行选项（--template XXX）直接指定项目名称和你想要使用的模板。

  https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project

2. 安装依赖

```bash
npm i 
```

## scripts解析

```json
{
  "scripts": {
    "dev": "vite", // 启动开发服务器，别名：`vite dev`，`vite serve`
    "build": "vite build", // 为生产环境构建产物
    "preview": "vite preview" // 本地预览生产构建产物
  }
}
```

## vite目录

**public：** 下面的不会被编译 可以存放静态资源；

**assets：** 下面可以存放可编译的静态资源；

**components：** 下面用来存放我们的组件；

**App.vue：** 是全局组件；

**main.ts：** 全局的ts文件；

**index.html:** 非常重要的入口文件 （webpack、rollup 他们的入口文件都是enrty input 是一个js文件，**而Vite 的入口文件是一个html文件**，他刚开始不会编译这些js文件 只有当你用到的时候 如script src="xxxxx.js" 会发起一个请求被vite拦截这时候才会解析js文件）；

 **vite.config.ts：**vite的配置文件具体配置项；



# UI库

## element-plus

- [按需导入](https://element-plus.gitee.io/zh-CN/guide/quickstart.html#%E6%8C%89%E9%9C%80%E5%AF%BC%E5%85%A5)

- Volar插件提醒：类型配置

  ```json
  // tsconfig.json
  {
    "compilerOptions": {
      // ...
      "types": ["element-plus/global"]
    }
  }
  ```

## ant-design-vue