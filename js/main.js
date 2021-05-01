new Vue({
    el: '#app',
    data: function () {
        return {
            ImgName: null,  // 图片名称
            copyText: null, // 复制的文本
            userName: 'zhangsixiang', // 您的GitHub名字
            repoName: 'tqlFile', // 您的仓库名字
            version: "master", // 您的release版本
            fileName: "file1", // 您的文件夹
            text: null, // 最终拼合的字符串
            src: '' // 图片src
        }
    },
    watch: {
        // 如果 `question` 发生改变，这个函数就会运行
        ImgName: function (newQuestion, oldQuestion) {
            this.piecen()
        }
    },
    created() {
        this.text = `https://cdn.jsdelivr.net/gh/${this.userName}/${this.repoName}@${this.version}/${this.fileName}/`
    },
    updated() {
        this.text = `https://cdn.jsdelivr.net/gh/${this.userName}/${this.repoName}@${this.version}/${this.fileName}/`
    },
    methods: {
        piecen() {
            if (this.ImgName) {
                this.copyText = null
                this.copyText = this.text + this.ImgName
            } else {
                this.copyText = '无'
            }
        },
        copy() {
            var ImgName = document.getElementById("copyText");
            ImgName.select(); // 选中文本
            var obj = document.execCommand("copy");
            if (this.ImgName) {
                this.$notify({
                    title: '成功',
                    message: '复制成功',
                    type: 'success'
                });
                this.src = this.copyText
            } else {
                this.$notify.error({
                    title: '错误',
                    message: '请输入图片名称'
                });
            }

        }
    }
})