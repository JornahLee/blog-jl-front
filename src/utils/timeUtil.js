export default {
    formatSeconds(seconds) {
        let minitues = 0;// 分
        let hours = 0;// 小时
        let days=0;
        if (seconds > 60) {
            minitues = parseInt(seconds / 60);
            seconds = parseInt(seconds % 60);
            if (minitues > 60) {
                hours = parseInt(minitues / 60);
                minitues = parseInt(minitues % 60);
                if (hours > 24) {
                    days=parseInt(hours / 24);
                }
            }
        }
        if (days > 0) {
            return `${days}天`
        }
        if (hours > 0) {
            return `${hours}小时`
        }
        if (minitues > 0) {
            return `${minitues}分钟`
        }
        return `${seconds}秒`
    }
}
