new Vue({
    el: '#app',
    data: function () {
        return {
            input: null,
            input1: null,
            userName: 'zhangsixiang',
            repoName: 'tqlFile',
            version: "master",
            fileName: "file1",
            text: null,
        }
    },
    created(){
        this.text = `https://cdn.jsdelivr.net/gh/${this.userName}/${this.repoName}@${this.version}/${this.fileName}/`
    },
    updated(){
        this.text = `https://cdn.jsdelivr.net/gh/${this.userName}/${this.repoName}@${this.version}/${this.fileName}/`
        console.log("222");
    },
    methods: {
        piecen() {
            if (this.input) {
                this.input1 = null
                this.input1 = this.text + this.input
            } else {
                this.input1 = '无'
            }
        },
        copy() {
            var input = document.getElementById("input");
            input.select(); // 选中文本
            var obj = document.execCommand("copy");
            if (this.input) {
                this.$notify({
                    title: '成功',
                    message: '复制成功',
                    type: 'success'
                });
            } else {
                this.$notify.error({
                    title: '错误',
                    message: '请输入图片名称'
                });
            }

        }
    }
})