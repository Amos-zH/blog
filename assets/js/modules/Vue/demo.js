new Vue({
    el: '#demo1',
    data:{
        age: '',
        name:'jack.Tom'
    }
});

new Vue({
    el: '#demo2',
    data:{
        name:'jack.Tom'
    }
});

new Vue({
    el: '#demo3',
    data :{
        loginTypes:'username'
    },
    methods: {
        loginType:function () {
            return this.loginTypes = this.loginTypes === 'username' ? 'email' : 'username';
        }
    }
});

var arr1 = new Vue({
    el: '#demo4',
    data: {
        items:[
            { message:'first', id:'a1' },
            { message:'second', id:'a2' }
        ]
    },
    methods: {
        sss:function (e) {
            console.log(e.id);
            arr1.items.push({ message: 'Baz', id:'a3' })
        }
    }
});

var arr2 = new Vue({
    el: '#demo4-1',
    data: {
        object:{
            firstName: 'John',
            lastName: 'Doe',
            age: 30
        }
    }
});
Vue.set(arr2.object, 'sex', 'man');     //向已有对象添加一个属性
arr2.object = Object.assign({}, arr2.object, {      //为已有对象赋予多个新属性
    age: 27,
    favoriteColor: 'Vue Green'
});

var arr3 = new Vue({
    el:'#demo4-2',
    data: {
        numbers: [1,2,3,4,5,6]
    },
    computed: {
        getNumbers: function () {
            return this.numbers.filter(function (number) {
                return number % 2 === 0;
            })
        }
    }
});

new Vue({
    el: '#demo5',
    data: {
        plists: [
            { name: 'goods1', price: 100, ischoose : false },
            { name: 'goods2', price: 200, ischoose : false },
            { name: 'goods3', price: 300, ischoose : false }
        ]
    },
    methods: {
        selected: function (event) {
            if (event) {
                event.ischoose = !event.ischoose;
            }
        },
        priceAll: function () {
            var priceAll = 0;
            this.plists.forEach(function (i) {
                if (i.ischoose)
                    priceAll += i.price;
            });
            return priceAll;
        }
    }
});

new Vue({
    el: '#demo6',
    data: {
        newList: '',
        todolistClass: 'todolist',
        getLists: []
    },
    watch: {
        newList: function (newText) {
            return newText;
        }
    },
    computed: {

    },
    methods: {
        //添加列表
        addList: function () {
            console.log(this.newList);
            this.getLists.push({ text:this.newList,checked: false });
        },
        //不/全选
        selectAll: function () {
            this.getLists.forEach(function (item, index) {
                item.checked = !item.checked;
            })
        },
        //清空所有列表
        clearAll: function () {
            this.getLists.splice(0, this.getLists.length);
        },
        //清空选中项
        clearSelect: function () {
            var arr = this.getLists;
            for (var i=arr.length-1; i>=0; i--) {
                if (arr[i].checked === true) {
                    arr.splice(i, 1);
                }
            }
        },
        //鼠标右键编辑
        mouseRightEdit: function (oldText, index) {
            var newText = prompt('编辑文本', oldText);
            if (newText !== null && newText !== '') {
                Vue.set(this.getLists, index, { text:newText,checked: false });
            }
        }
    }
});
//全局注册组件
Vue.component('my-component', {
    template: '<div>{{ message }}</div>',
    data: {
        message: '我是组件'
    }
});
new Vue({
    el: '#demo7'
});
//局部注册组件
var child = {
    template: '<div>一个局部注册的组件</div>'
};
new Vue({
    el:'#demo7-1',
    components: {
        'my-component': child
    }
});
//is特性的使用
var child = {
    template: '<li>is特性的测试</li>'
};
new Vue ({
    el: '#demo7-2',
    components: {
        'test': child
    }
});
//data必须是函数
Vue.component('testdata',{
    template: '<li><button @click="num += 1">{{ num }}</button></li>',
    data: function () {
        return {
            num: 0
        }
    }
});
new Vue({
    el: '#demo7-3'
});
//组件组合
Vue.component('child',{
    props: ['myNum'],
    template: '<span>{{ myNum }}</span>'
});
new Vue({
    el: '#demo7-4',
    data: {
        proptext: 'proptext example'
    }
});
//自定义事件
Vue.component('text-button',{
    template: '<div>' +
        '<input type="text" v-model="message">'+
        '<button @click="msgbtn">send</button>'+
        '</div>',
    data: function () {
        return {
            message: 'test'
        }
    },
    methods: {
        msgbtn: function () {
            this.$emit('msg', { list: this.message })
        }
    }
});
new Vue({
    el: '#demo7-5',
    data: {
        lists: []
    },
    methods: {
        childmsg:function (payload) {
            this.lists.push(payload.list);
        }
    }
});