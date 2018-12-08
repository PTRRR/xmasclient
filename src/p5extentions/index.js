import * as extentions from './extentions'

export async function gcodeExtentionForP5 (p5) {
  // Extend P5
  return new Promise(resolve => {
    console.log('EXTENDING P5')
    for (const [key, extention] of Object.entries(extentions)) {
      try {
        extention(p5)
        console.log(`- ${key} OK`)
      } catch (e) {
        console.error(e)
      }
    }
    resolve()
  })
}
