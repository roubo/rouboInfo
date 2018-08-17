import Storage from 'react-native-storage'
import {
    AsyncStorage,
} from 'react-native'

import Sync from './SyncStorage'

let storage = undefined

const createStorage = () => {
    storage = new Storage({
        // 最大容量，默认值1000条数据循环存储
        size: 1000,

        // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
        // 如果不指定则数据只会保存在内存中，重启后即丢失
        storageBackend: AsyncStorage,

        // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
        defaultExpires:  null,

        // 读写时在内存中缓存数据。默认启用。
        enableCache: true,

        // 如果storage中没有相应数据，或数据已过期，
        // 则会调用相应的sync方法，无缝返回最新数据。
        // sync方法的具体说明会在后文提到
        // 你可以在构造函数这里就写好sync的方法
        // 或是在任何时候，直接对storage.sync进行赋值修改
        // 或是写到另一个文件里，这里require引入
        sync: Sync
    })
}

const _initStorage = () => {
   if(!storage) {
       createStorage()
   }
}

/**
 * 永久保存 (key-value)
 * @param key
 * @param obj
 */
const save = (key, obj)  => {
    _initStorage()
    storage.save({
        key: key,
        data: obj,
    })
}

/**
 * 指定保存时间保存（key-value)
 * @param key
 * @param obj
 * @param exp
 */
const saveWithExpires = (key, obj, exp)  => {
    _initStorage()
    storage.save({
        key: key,
        data: obj,
        expires: exp
    })
}

/**
 * 无sync读取本地数据（key-value)
 * @param key
 * @param callback
 */
const load = (key, callback) => {
    _initStorage()
    storage.load({
        key: key,
        // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
        autoSync: false,
        // syncInBackground(默认为true)意味着如果数据过期，
        // 在调用sync方法的同时先返回已经过期的数据。
        // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
        syncInBackground: false,
        // 给sync方法传递额外的参数
        syncParams: {
            extraFetchOptions: {
            },
            someFlag: true,
        }
    }).then(res => {
       callback && callback.success && callback.success(res)
    }).catch(err => {
        callback && callback.fail && callback.fail(err)
    })
}


/**
 * 有sync读取本地数据（key-value)
 * @param key
 * @param extOpt
 * @param callback
 */
const loadWithSync = (key, extOpt, callback) => {
    _initStorage()
    storage.load({
        key: key,
        // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
        autoSync: true,
        // syncInBackground(默认为true)意味着如果数据过期，
        // 在调用sync方法的同时先返回已经过期的数据。
        // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
        syncInBackground: true,
        // 给sync方法传递额外的参数
        syncParams: {
            extraFetchOptions: extOpt,
            someFlag: true,
        }
    }).then(res => {
        callback && callback.success && callback.success(res)
    }).catch(err => {
        callback && callback.fail && callback.fail(err)
    })
}

/**
 * 移除数据（key-value)
 * @param key
 */
const remove = (key) => {
    _initStorage()
    storage.remove({
        key: key
    })
}

/**
 * 保存key-id-value数据
 * @param key
 * @param id
 * @param obj
 */
const saveWithId = (key, id, obj) => {
    _initStorage()
    storage.save({
        key: key,
        id: id,
        data: obj
    })
}

/**
 * 保存含过期时间的key-id-value数据
 * @param key
 * @param id
 * @param obj
 * @param exp
 */
const saveWithIdWithExpires = (key, id, obj, exp) => {
    _initStorage()
    storage.save({
        key: key,
        id: id,
        data: obj,
        expires: exp
    })
}

/**
 * 无sync读取本地数据（key-id-value)
 * @param key
 * @param id
 * @param callback
 */
const loadWithId = (key, id, callback) => {
    _initStorage()
    storage.load({
        key: key,
        id: id,
        // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
        autoSync: false,
        // syncInBackground(默认为true)意味着如果数据过期，
        // 在调用sync方法的同时先返回已经过期的数据。
        // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
        syncInBackground: false,
        // 给sync方法传递额外的参数
        syncParams: {
            extraFetchOptions: {
            },
            someFlag: true,
        }
    }).then(res => {
        callback && callback.success && callback.success(res)
    }).catch(err => {
        callback && callback.fail && callback.fail(err)
    })
}

/**
 * 无sync读取所有数据（key-id-value)
 * @param key
 * @param id
 * @param callback
 */
const loadAllWithId = (key, callback) => {
    _initStorage()
    storage.getAllDataForKey(key
    ).then(res => {
        callback && callback.success && callback.success(res)
    }).catch(err => {
        callback && callback.fail && callback.fail(err)
    })
}

/**
 * 有sync读取本地数据（key-id-value)
 * @param key
 * @param id
 * @param extOpt
 * @param callback
 */
const loadWithIdWithSync = (key, extOpt, callback) => {
    _initStorage()
    storage.load({
        key: key,
        id: id,
        // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
        autoSync: true,
        // syncInBackground(默认为true)意味着如果数据过期，
        // 在调用sync方法的同时先返回已经过期的数据。
        // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
        syncInBackground: true,
        // 给sync方法传递额外的参数
        syncParams: {
            extraFetchOptions: extOpt,
            someFlag: true,
        }
    }).then(res => {
        callback && callback.success && callback.success(res)
    }).catch(err => {
        callback && callback.fail && callback.fail(err)
    })
}


/**
 * 移除数据（key-id-value)
 * @param key
 * @param id
 */
const removeWithId = (key,id) => {
    _initStorage()
    storage.remove({
        key: key,
        id:id
    })
}

//TODO: key-id-value类型

const subAsyncStorage = {
    save,
    saveWithExpires,
    load,
    loadWithSync,
    remove,
    saveWithId,
    saveWithIdWithExpires,
    loadWithId,
    loadWithIdWithSync,
    removeWithId,
    loadAllWithId

}

export default subAsyncStorage

