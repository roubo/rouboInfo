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

const tool = {
    playLocalSound
}
export default tool
