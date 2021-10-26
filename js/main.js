new Vue({
    el: '#app',
    data: function () {
        return {
            ImgName: null,  // 图片名称
            restaurants: [],// 带输入建议
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
                value: '123云盘',
                label: '123云盘'
            }, {
                value: '百度网盘',
                label: '百度网盘'
            }, {
                value: 'GitHub',
                label: 'GitHub'
            }, {
                value: '磁力链接',
                label: '磁力链接'
            }],
            panName: '蓝奏云', // 您的网盘名称
            linkName: null, // 您的资源链接 
            copyLink: null, // 复制的文本
            tiQuMa: "" // 提取码
        }
    },
    watch: {
        // 如果 `question` 发生改变，这个函数就会运行
        ImgName: function (newQuestion, oldQuestion) {
            this.piecen()
        },
        panName: function (newQuestion, oldQuestion) {
            this.piecenLink()
        },
        linkName: function (newQuestion, oldQuestion) {
            // 截取123云盘链接，直接赋值链接URL
            if (newQuestion.indexOf("链接:") != -1) {
                this.linkName = newQuestion.slice(3)
            }else if(newQuestion.indexOf("百度网盘") != -1 ){ 
                // 截取百度网盘链接，直接赋值链接URL 提取码
                console.log("触发");
                this.linkName = newQuestion.slice(1,newQuestion.indexOf(" 提"))
                this.tiQuMa = '提取码: ' + newQuestion.slice(newQuestion.indexOf(": ")+1,newQuestion.indexOf(" 复"))
            }
            this.piecenLink()
        },
    },
    created() {
        this.text = `https://cdn.jsdelivr.net/gh/${this.userName}/${this.repoName}@${this.version}/${this.fileName}/`
    },
    updated() {
        this.text = `https://cdn.jsdelivr.net/gh/${this.userName}/${this.repoName}@${this.version}/${this.fileName}/`
    },
    mounted() {
        this.restaurants = this.loadAll();
    },
    methods: {
        // 您的仓库名字——带输入建议 start
        querySearch(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            // cb(results);
            cb(restaurants);
        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        handleSelect(item) {
            console.log(item);
        },
        loadAll() {
            return [
                { "value": "tqlFile" },
                { "value": "tqlimg" },
                { "value": "imwmi" }
            ];
        },
        // 您的仓库名字——带输入建议 end
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
                this.copyLink = `<p class="has-text-align-center">${this.panName}：<a href="${this.linkName}" target="_blank" rel="noreferrer noopener">${this.linkName}</a> ${this.tiQuMa}</p>`
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