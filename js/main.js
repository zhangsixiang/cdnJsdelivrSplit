new Vue({
    el: '#app',
    data: function () {
        return {
            ImgName: null,  // 图片名称
            copyText: null, // 复制的文本
            userName: 'zhangsixiang', // 您的GitHub名字
            repoName: 'tqlFile', // 您的仓库名字
            version: "master", // 您的release版本
            fileName: "webp", // 您的文件夹
            text: null, // 最终拼合的字符串
            src: '', // 图片src
            options: [{
                value: '蓝奏云',
                label: '蓝奏云'
            }, {
                value: 'GitHub',
                label: 'GitHub'
            }, {
                value: '百度网盘',
                label: '百度网盘'
            }, {
                value: '磁力链接',
                label: '磁力链接'
            }],
            panName: '蓝奏云', // 您的网盘名称
            linkName: null, // 您的资源链接 
            copyLink: null // 复制的文本
        }
    },
    watch: {
        // 如果 `question` 发生改变，这个函数就会运行
        ImgName: function (newQuestion, oldQuestion) {
            this.piecen()
        },
        panName: function(newQuestion, oldQuestion){
            this.piecenLink()
        },
        linkName: function(newQuestion, oldQuestion){
            this.piecenLink()
        },
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
        piecenLink() {
            if (this.linkName) {
                this.copyLink = null
                this.copyLink = `<p class="has-text-align-center">${this.panName}：<a href="${this.linkName}" target="_blank" rel="noreferrer noopener">${this.linkName}</a></p>`
            } else {
                this.copyLink = '无'
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

        },
        copyLinkF() {
            var linkName = document.getElementById("copyLink");
            linkName.select(); // 选中文本
            var obj = document.execCommand("copy");
            if (this.linkName) {
                this.$notify({
                    title: '成功',
                    message: '复制成功',
                    type: 'success'
                });
                this.src = this.copyLink
            } else {
                this.$notify.error({
                    title: '错误',
                    message: '请输入资源链接'
                });
            }

        }
    }
})