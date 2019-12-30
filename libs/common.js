/*
 * @Descripttion:公共类库 
 * @version: 
 * @Author: rufeike
 * @Date: 2019-12-30 14:42:40
 * @Email: rufeike@163.com
 */
const Crypto = require('crypto');


module.exports = {
    md5:(buffer)=>{
        let obj = Crypto.createHash('md5');
        obj.update(buffer);
        return obj.digest('hex');
    }
}