export default {
    formatSeconds(seconds) {
        let minitues = 0;// 分
        let hours = 0;// 小时
        let days = 0;
        if (seconds > 60) {
            minitues = parseInt(seconds / 60);
            seconds = parseInt(seconds % 60);
            if (minitues > 60) {
                hours = parseInt(minitues / 60);
                minitues = parseInt(minitues % 60);
                if (hours > 24) {
                    days = parseInt(hours / 24);
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
            return `${minitues}分`
        }
        return `${seconds}秒`
    },
    dateTimeFormat(dt, fmt) {
        let date = new Date(dt)
        let ret;
        const opt = {
            "Y+": date.getFullYear().toString(),        // 年
            "m+": (date.getMonth() + 1).toString(),     // 月
            "d+": date.getDate().toString(),            // 日
            "H+": date.getHours().toString(),           // 时
            "M+": date.getMinutes().toString(),         // 分
            "S+": date.getSeconds().toString()          // 秒
        };
        for (let k in opt) {
            ret = new RegExp("(" + k + ")").exec(fmt);
            if (ret) {
                fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
            }
        }
        return fmt;
    },
    dateFormat(dt) {
        let date = new Date(dt)
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const strDate = date.getDate().toString().padStart(2, '0');
        // const starHours = date.getHours().toString().padStart(2, '0');
        // const starMinutes = date.getMinutes().toString().padStart(2, '0');
        // const starSeconds = date.getSeconds().toString().padStart(2, '0');
        return `${date.getFullYear()}-${month}-${strDate}`;
    }
}
