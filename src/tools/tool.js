import Sound from 'react-native-sound'


/**
 * 使用react-native-sound 播放本地音频文件
 * @param name
 */
const playLocalSound = (name) => {
    Sound.setCategory('Ambient', true)
    let whoosh = new Sound(name, Sound.MAIN_BUNDLE, (e) => {
       if(e) {
          console.log("play error: "  + e)
       } else {
          whoosh.play(() => whoosh.release())
       }
    })
}

/**
 * sub级别组件获取图标路径
 * @param name
 * @returns {any}
 */
const getImage = (name) => {
    switch (name) {
        case 'plancast':
            return require('../images/repo/plancast.png')
        case 'makecode':
            return require('../images/repo/makecode.png')
        case 'email':
            return require('../images/repo/email.png')
        case 'jira':
            return require('../images/repo/jira.png')
        case 'todo':
            return require('../images/repo/todo.png')
        case 'mubu':
            return require('../images/repo/mubu.png')
        case 'phone-call':
            return require('../images/repo/phone-call.png')
        case 'bath':
            return require('../images/repo/bath.png')
        case 'water':
            return require('../images/repo/water.png')
        case 'sleep30':
            return require('../images/repo/sleep30.png')
        case 'trainO30':
            return require('../images/repo/trainO30.png')
        case 'trainM60':
            return require('../images/repo/trainM60.png')
        case 'ebook':
            return require('../images/repo/ebook.png')
        case 'write':
            return require('../images/repo/write.png')
        case 'custom':
            return require('../images/repo/custom.png')
        case 'beforesleep':
            return require('../images/beforesleep.png')
        case 'wakeup':
            return require('../images/wakeup.png')
        case 'onway':
            return require('../images/onway.png')
        case 'noon':
            return require('../images/noon.png')
        case 'workout':
            return require('../images/workout.png')
        case 'anytime':
            return require('../images/anytime.png')
        case 'complete':
            return require('../images/complete.png')
        case 'idea':
            return require('../images/idea.png')
        case 'contact':
            return require('../images/contact.png')
        case 'ref':
            return require('../images/ref.png')
        case 'version':
            return require('../images/version.png')
        default:
            return require('../images/repo/plancast.png')
    }
}


const tool = {
    playLocalSound,
    getImage
}
export default tool
